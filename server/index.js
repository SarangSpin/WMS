const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const localStrategy = require('passport-local').Strategy
const mysql = require('mysql')
const flash = require('connect-flash')
const { v4: uuidv4 } = require('uuid');
const { stringify } = require("querystring");
const ReactError = require('./ReactError')
const multer = require("multer");




const con = mysql.createConnection({
    host: "wms-database.cwhe5uu2sq6p.ap-south-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "mzV4DZB57j3VPtTvCVS9"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
con.on('error', function(err) {
    console.log("[mysql error]",err);
  });

const app = express();
app.use(flash())
app.listen(5000, (req, res)=>{
  console.log("Server running")
})

app.use(cors({
    origin : 'http://localhost:3000',
    credentials: true
}))

app.use(bodyParser.json())
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized:  true
    }
))

app.use(cookieParser('secret'))

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new localStrategy((username, password, done)=>{
        q = `SELECT * FROM ewm_clients.registered WHERE username = '${username}'`
            con.query(q, (err,user)=>{
                console.log(user)
                if (!user || user == null || user === undefined || user[0] === undefined){


                    p = `SELECT * FROM ewm_operational.employees WHERE first_name = '${username}'`
                    con.query(p, (err, user2)=>{
                      console.log(user2)
                      if (!user2 || user2 == null || user2 === undefined || user2[0] === undefined){

                        return done(null, false)
                      }

                      else{
                        bcrypt.compare(password, user2[0].password, (err, result)=>{
                          console.log(result)
                          if(result) return done(null, user2[0])
                          else{
                              return done(null, false)
                          }
                      })
                      }

                    })
                }
                else{
                    bcrypt.compare(password, user[0].password, (err, result)=>{
                        console.log(result)
                        if(result) return done(null, user[0])
                        else{
                            return done(null, false)
                        }
                    })
    }
})
   
})
)

passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(user, done){
    done(null, user)
})

app.use((req,res, next)=>{
  console.log(req.url)
  console.log()
    res.locals.flash = null
    next();
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({ storage: storage })

app.post('/login', (req,res,next)=>{
    
    if(req.body.username == null || req.body.password == null){
        req.flash('error', 'Fields missing')
             res.send({
            status: 404,
            message: 'Fields missing',
            flash: req.flash('error')
        })
    }
    else{
        console.log(req.body)
    passport.authenticate('local', (err, user)=>{
      if (err) {next(err)}
        console.log(user)
        if (user == false){
            req.flash('error', 'User not found')
             res.send({
            status: 404,
            message: 'User not found',
            flash: req.flash('error')
        })
    }
        else{
            req.logIn(user, (err)=>{
                if (err) next(err)
            req.flash('success', 'Login Successful')
            res.send({
                result: req.user,
                flash: req.flash('success')
            })
            })
            
        }
    
    
    })(req, res, next);
   }
})
app.get('/user',(req, res)=>{
    
    res.send(req.user)

})

app.post('/register', (req, res, next)=>{
    if((req.body.username == null || req.body.password == null) || req.body.email == null ){
        req.flash('error', 'Fields missing')
             res.send({
            status: 500,
            message: 'Fields missing',
            flash: req.flash('error')
        })
    }
    else{
    con.query(`SELECT * FROM ewm_clients.registered WHERE username = '${req.body.username}'`, async(err, data)=>{
      if (err) { next(err); return; }
        if(data.length >=1){
            req.flash('error', 'User already exists')
            res.send({
                message: 'User already exists',
                status: false,
                flash: req.flash('error')
            })
        } 
        if(data.length == 0){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10, (err)=>{if (err) next(err)})
            const newUser ={
                user_id: uuidv4(),
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }
            con.query(`INSERT INTO ewm_clients.registered (user_id, username, email_id, password) VALUES ('${newUser.user_id}','${newUser.username}','${newUser.email}','${newUser.password}')`, (err)=>{if (err) { next(err); return; } })
            res.send({
              message: 'Success',
              status: true
            })
    }})
  }

})

app.post('/employee_reg', (req, res, next)=>{
  if((req.body.firstName == '' || req.body.lastName == '') || req.body.email == '' ||req.body.phone == null || ''||undefined ||req.body.address == ''||req.body.designation == ''||req.body.password == '' ){
      req.flash('error', 'Fields missing')
           res.send({
          status: false,
          message: 'Fields missing',
          flash: req.flash('error')
      })
  }
  else{
  con.query(`SELECT * FROM ewm_operational.employees WHERE first_name = '${req.body.firstName}'`, async(err, data)=>{
    if (err) { next(err); return; }
      if(data.length >=1){
          req.flash('error', 'User already exists')
          res.send({
              message: 'User already exists',
              status: false,
              flash: req.flash('error')
          })
      } 
      if(data.length == 0){
        
          const hashedPassword = bcrypt.hashSync(req.body.password, 10, (err)=>{if (err) next(err)})
          const newUser ={
              employee_id: uuidv4(),
              firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        designation: req.body.designation,
        password: hashedPassword,
        admin_status: req.body.admin_status
          }
          con.query(`INSERT INTO ewm_operational.employees (employee_id, first_name, last_name, email, phone, address, designation, password, admin_status, client) VALUES ('${newUser.employee_id}','${newUser.firstName}','${newUser.lastName}','${newUser.email}', ${newUser.phone}, '${newUser.address}', '${newUser.designation}', '${newUser.password}', '${newUser.admin_status}', 'no')`, (err)=>{if (err) { next(err); return; } })
          res.send({
            message: 'Success',
            status: true
          })
  }})
}

})


app.post('/logout', (req,res, next)=>{
  if(req.isAuthenticated()){
    req.logOut((err)=>{if (err) { next(err); return; }})
    req.flash('success', 'You have successfully logged out')
    res.send({
        message: 'Logged out',
    flash: req.flash('success')})
  }
  else{
    res.send("Already logged out")
  }
})



app.post('/appl1', (req, res, next) => {
    const data2 = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      req.body.city,
      req.body.state,
      req.body.pincode,
      appl_id = uuidv4(),
      user_id= req.user.user_id
    ];
  
    const query = `INSERT INTO ewm_clients.appln_user (first_name, last_name, email, phone_number, city, state, pincode,appl_id, user_id)
      VALUES ('${data2[0]}', '${data2[1]}', '${data2[2]}', '${data2[3]}', '${data2[4]}', '${data2[5]}', '${data2[6]}', '${data2[7]}', '${data2[8]}')`;
  
    con.query(query, (err) => {
      if (err) { next(err); return; }
    });
  
    req.flash('success', 'Application part 1 successfully registered');
    res.send({
      result: data2,
      status: true,
      application_id: appl_id,
      flash: req.flash('success')
    });
  });

app.post('/appl2', (req, res, next) => {
  const data2 = [
    req.body.event_,
    req.body.cusEvent,
    req.body.description_,
    req.body.population,
    req.body.budget,
    req.body.cusLowBudget,
    appl_id = req.body.applid,
    req.body.startDate,
    req.body.endDate
  ];
  console.log(data2)

  const query = `INSERT INTO ewm_clients.appln_details (event_, cus_event, description_, population, budget, cus_low_budget, appl_id, start_date, end_date)
    VALUES ('${data2[0]}', '${data2[1]}', '${data2[2]}', ${data2[3]}, ${data2[4]}, ${data2[5]}, '${data2[6]}', '${data2[7]}', '${data2[8]}')`;

  con.query(query, (err) => {
    if (err) next(err);
  });

  req.flash('success', 'Application part 2 successfully registered');
  res.send({
    result: data2,
    status: true,
    application_id: appl_id,
    flash: req.flash('success')
  });
});

app.post('/sub_event', (req, res, next)=>{
  const subEventBody = [
    req.body.subEvent_,
    req.body.description_,
    req.body.population,
    req.body.applid,
    req.body.startTime,
    req.body.endTime,
    req.body.eventDate,
    sub_event_id = uuidv4()
  ];

  console.log(subEventBody);

  con.query(`INSERT INTO ewm_clients.sub_events (name, start_time, end_time, description, event_date, population, sub_event_id, main_event_id) VALUES ('${subEventBody[0]}', '${subEventBody[4]}', '${subEventBody[5]}', '${subEventBody[1]}','${subEventBody[6]}',${subEventBody[2]}, '${subEventBody[7]}', '${subEventBody[3]}' )`,
  (err)=>{
    if (err) next(err);
  } )
  req.flash('success', 'Sub-Event Registered Succesfully!');
  res.send({
    status: true,
    flash: req.flash('success')
  });

})

app.get('/sub_event', (req, res, next) =>{
  const applid = req.query.applid;
  console.log(applid)
  console.log(req.query)
  
  con.query(`SELECT * FROM ewm_clients.sub_events WHERE main_event_id = '${applid}' `,
  async(err, data)=>{
    if (err) next(err);
    res.send({
      status: true,
      data: data
    })

  })
})

app.get('/sub_event/:id', (req, res, next) =>{
  const id = req.params.id;
  console.log(id)

  con.query(`SELECT * FROM ewm_clients.sub_events WHERE sub_event_id = '${id}' `,
  async(err, data)=>{
    if (err) next(err);
    res.send({
      status: true,
      data: data
    })

  })
})

app.get('/planner/applications', (req, res, next)=>{

  const k = `SELECT * FROM ewm_operational.assignments CROSS JOIN ewm_clients.appln_details  ON ewm_operational.assignments.appl_id = ewm_clients.appln_details.appl_id`
  con.query(k, async(err,data)=>{
    if (err) next(err);
    else{
      res.send({
        status: true,
        data:data
      })
      
}
})
})

  
  

  

app.post('/appln_submit', (req,res, next)=>{
  const timestamp = Date.now();

// Convert the timestamp to a Date object
const currentDate = new Date(timestamp);

// Extract components from the Date object
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Format into MySQL DATETIME format: 'YYYY-MM-DD HH:MM:SS'
const mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


  const subBody = [
    req.body.assignment_id,
    'unassigned',
    mysqlDatetime,

  ]
  const q = `INSERT into ewm_operational.assignments (appl_id, status, appln_date) VALUES ('${subBody[0]}', '${subBody[1]}', '${subBody[2]}')`;
  con.query(q, (err)=>{
    if (err) next(err);
    else{
      res.send({
        status: true
      })
    }

  })
})

app.post('/add_task', (req, res, next)=>{
 
  const submitBody = [
    req.body.sub_event_id,
    task_id = uuidv4(),
    req.body.task_name,
    req.body.description,
    req.body.deadline,
    req.body.task_status
  ] 

  const q = `INSERT INTO ewm_clients.tasks (sub_event_id, task_id, task_name, description, deadline, task_status) VALUES ('${submitBody[0]}', '${submitBody[1]}', '${submitBody[2]}', '${submitBody[3]}', '${submitBody[4]}', '${submitBody[5]}')`;
  con.query(q, (err)=>{
    if (err) next(err);
    else{
      res.send({
        status: true
      })
    }
  })
})

app.get('/tasks', (req, res, next)=>{
  const sub_event_id = req.query.id;
  con.query(`SELECT * FROM ewm_clients.tasks WHERE sub_event_id = '${sub_event_id}'`, 
  (err, data)=>{
    if (err) next(err);
    else{
      res.send({
        status: true,
        data:data
      })
    }
  })
})


app.use((err, req, res, next)=>{
  console.log(err)
  const error = ReactError(err, 'Internal server error')
  res.send(error)
})

