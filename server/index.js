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
const jwt = require("jsonwebtoken");
const env = require('dotenv').config().parsed;
const fs = require('fs')
const helmet = require('helmet');

const con = mysql.createConnection({
    host: "153.92.5.199",
    port: 3306,
    user: "evamgmt",
    password: "evamgmt2023"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
con.on('error', function(err) {
    console.log("[mysql error]",err);
  });

const app = express();
app.use(helmet());
app.use(helmet.xssFilter());

app.use(flash())
app.listen(5000, (req, res)=>{
  console.log("Server running")
})

console.log(__dirname)
app.use(cors(
	{
    origin : 'http://153.92.5.199:8081',
    credentials: true
}
))

app.use(bodyParser.json())
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized:  true
    }
))

app.use(cookieParser('secret'))
app.use(express.static('assets'))

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new localStrategy((username, password, done)=>{
        q = `SELECT * FROM evamgmt.registered WHERE username = '${username}'`
            con.query(q, (err,user)=>{
                console.log(user)
                if (!user || user == null || user === undefined || user[0] === undefined){


                    p = `SELECT * FROM evamgmt.employees WHERE first_name = '${username}'`
                    con.query(p, (err, user2)=>{
                      console.log(user2)
                      if (!user2 || user2 == null || user2 === undefined || user2[0] === undefined){

                        return done(null, false)
                      }

                      else{
                        bcrypt.compare(password, user2[0].password, (err, result)=>{
                          console.log(result)
                          if(result){ 
                            
                            
                            return done(null, user2[0])}
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
    res.locals.flash = null;
    next();
})










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
 console.log(req.user)
//res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

	res.send(req.user)

})
app.get('/testing', (req, res)=>{
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

	res.send('working')})

app.post('/register', (req, res, next)=>{
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

	if((req.body.username == null || req.body.password == null) || req.body.email == null ){
        req.flash('error', 'Fields missing')
             res.send({
            status: 500,
            message: 'Fields missing',
            flash: req.flash('error')
        })
    }
    else{
    con.query(`SELECT * FROM evamgmt.registered WHERE username = '${req.body.username}'`, async(err, data)=>{
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
            con.query(`INSERT INTO evamgmt.registered (user_id, username, email_id, password) VALUES ('${newUser.user_id}','${newUser.username}','${newUser.email}','${newUser.password}')`, (err)=>{if (err) { next(err); return; } })
            res.send({
              message: 'Success',
              status: true
            })
    }})
  }

})

app.post('/employee_reg', (req, res, next)=>{
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

	if((req.body.firstName == '' || req.body.lastName == '') || req.body.email == '' ||req.body.phone == null || ''||undefined ||req.body.address == ''||req.body.designation == ''||req.body.password == '' ){
      req.flash('error', 'Fields missing')
           res.send({
          status: false,
          message: 'Fields missing',
          flash: req.flash('error')
      })
  }
  else{
  con.query(`SELECT * FROM evamgmt.employees WHERE first_name = '${req.body.firstName}'`, async(err, data)=>{
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
          con.query(`INSERT INTO evamgmt.employees (employee_id, first_name, last_name, email, phone, address, designation, password, admin_status, client) VALUES ('${newUser.employee_id}','${newUser.firstName}','${newUser.lastName}','${newUser.email}', ${newUser.phone}, '${newUser.address}', '${newUser.designation}', '${newUser.password}', '${newUser.admin_status}', 'no')`, (err)=>{if (err) { next(err); return; } })
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

var images_id = null;

app.get('/images_id', (req, res, next)=>{
  images_id = req.query.id
  imgCount=0;
  res.send({status: true})
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
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');


    const query = `INSERT INTO evamgmt.appln_user (first_name, last_name, email, phone_number, city, state, pincode,appl_id, user_id)
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




  var imgCount =0;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const imgPath = `assets/images/appln/${images_id}`
      fs.mkdirSync(imgPath, { recursive: true } )
      cb(null, imgPath)
    },
    filename: (req, file, cb) => {
      console.log(file)
      imgCount = imgCount+1;
      cb(null, `${images_id}_${imgCount}.png`)
    },
  })

  const upload = multer({storage: storage})


app.post('/appl2', upload.array('file', 4), (req, res, next) => {


  console.log(req.files)
  console.log(req.body)
  console.log(true + true)


  
  
  // const multi_upload = multer({
  //   storage,
  //   fileFilter: (req, file, cb) => {
  //     if (
  //       file.mimetype == 'image/png' ||
  //       file.mimetype == 'image/jpeg' ||
  //       file.mimetype == 'image/jpg'
  //     ) {
  //       cb(null, true);
  //     } else {
  //       cb(null, false);
        
  //     }
  //   },
  // }).array('uploadImages', 5);



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
  

  const query = `INSERT INTO evamgmt.appln_details (event_, cus_event, description_, population, budget, cus_low_budget, appl_id, start_date, end_date)
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


app.post('/tasksubmission', upload.array('file', 4), (req, res, next)=>{
  console.log(req.files)
  console.log(req.body)

  const q = `INSERT INTO evamgmt.task_submission (task_submission_id, vendor_id, task_id, time, review, status) VALUES ('${images_id}', '${req.body.vendor_id}', '${req.body.task_id}', '${req.body.time}', '${req.body.review}', 'Incomplete')`;
  con.query(q, (err)=>{

    if (err) {
      next(err);
    }

    else{      
      res.json({
        status: true,        
      })
    }
    
  }
)
})




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

  con.query(`INSERT INTO evamgmt.sub_events (name, start_time, end_time, description, event_date, population, sub_event_id, main_event_id) VALUES ('${subEventBody[0]}', '${subEventBody[4]}', '${subEventBody[5]}', '${subEventBody[1]}','${subEventBody[6]}',${subEventBody[2]}, '${subEventBody[7]}', '${subEventBody[3]}' )`,
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
  
  con.query(`SELECT * FROM evamgmt.sub_events WHERE main_event_id = '${applid}' `,
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

  con.query(`SELECT * FROM evamgmt.sub_events WHERE sub_event_id = '${id}' `,
  async(err, data)=>{
    if (err) next(err);
    res.send({
      status: true,
      data: data
    })

  })
})

app.get('/planner/applications', (req, res, next)=>{

  const k = `SELECT * FROM evamgmt.assignments CROSS JOIN evamgmt.appln_details  ON evamgmt.assignments.appl_id = evamgmt.appln_details.appl_id`
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
  const q = `INSERT into evamgmt.assignments (appl_id, status, appln_date) VALUES ('${subBody[0]}', '${subBody[1]}', '${subBody[2]}')`;
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
    req.body.type,
    req.body.vendor
  ] 


  const w = `SELECT * FROM evamgmt.vendor  WHERE vendor_name = '${req.body.vendor}' `;
  con.query(w, (err, data)=>{
    if (err) next(err);
    else{
      console.log(data)
      const q = `INSERT INTO evamgmt.tasks (sub_event_id, task_id, task_name, description_, deadline,  type, vendor, vendor_id) VALUES ('${submitBody[0]}', '${submitBody[1]}', '${submitBody[2]}', '${submitBody[3]}', '${submitBody[4]}', '${submitBody[5]}', '${submitBody[6]}', '${data[0].vendor_id}' )`;
    con.query(q, (err)=>{
      if (err) next(err);
      else{
        res.send({
          status: true
        })
      }
  })
    }
  })

  
})

app.get('/tasks', (req, res, next)=>{
  const sub_event_id = req.query.id;
  con.query(`SELECT * FROM evamgmt.tasks WHERE sub_event_id = '${sub_event_id}'`, 
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


app.get('/venues', (req, res, next)=>{
  
  con.query(`SELECT * FROM evamgmt.venues;`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      res.send({
        status: true,
        data:data
      })

    }

  })
})

app.get('/venue', (req, res, next)=>{
  const venue_id =req.query.id;
  con.query(`SELECT * FROM evamgmt.venues WHERE venues_id = '${venue_id}';`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      res.send({
        status: true,
        data:data
      })

    }

  })
})

app.post('/add_venue', (req, res, next)=>{
  const {venue_id, appl_id} = req.body;
  con.query(`UPDATE evamgmt.appln_details SET venue_id = '${venue_id}' WHERE appl_id='${appl_id}';`, (err)=>{
    if (err) {
     
      next(err);
    }
    else{
      res.send({
        status: true,
      })

    }

  })
})


app.post('/applogin', (req, res, next)=> {
  console.log(req.body)
  var username = req.body.username;
  var password = req.body.password;
  try{

                p = `SELECT * FROM evamgmt.employees WHERE first_name = '${username}'`
                con.query(p, (err, user2)=>{
                  console.log(user2)
                  if (!user2 || user2 == null || user2 === undefined || user2[0] === undefined){

                    q = `SELECT * FROM evamgmt.vendor WHERE username = '${username}'`
                    con.query(q, (err, user3)=>{
                      console.log(user3 + "vendor")
                      if (!user3 || user3 == null || user3 === undefined || user3[0] === undefined){

                        res.status(404).json({ status: false, token: null });

                      }
                      else{

                        bcrypt.compare(password, user3[0].password, async (err, result)=>{
                          console.log(result)
                          if(result) {
                            
                            
                            let tokenData;
                            tokenData = { _id: user3[0].vendor_id, email: user3[0].email };
                            const token = await jwt.sign(tokenData, env.SECRET_KEY, {expiresIn: '60'} );
                            res.status(200).json({ status: true, success: "sendData", token: token, designation: 'vendor', user: JSON.stringify(user3[0])  });
                          }
                          else{
                            res.status(404).json({ status: false, token: null });
                              
                          }
                      })

                      }
                    })




                    


                  }else{
                    bcrypt.compare(password, user2[0].password, async (err, result)=>{
                      console.log(result)
                      if(result) {
                        if(user2[0].designation == 'osm')
                        {
                        let tokenData;
                        tokenData = { _id: user2[0].user_id, email: user2[0].email };
                        const token = await jwt.sign(tokenData, env.SECRET_KEY, {expiresIn: '60'} );
                        res.status(200).json({ status: true, success: "sendData", token: token, designation: user2[0].designation, user: JSON.stringify(user2[0])  });
                        }
                        else{
                          res.status(404).json({ status: false, token: null });
                        }
                      }
                      else{
                        res.status(404).json({ status: false, token: null });
                          
                      }
                  })
                  }

                })}
                catch(err){console.log(err)}
              }
      
)


app.post('/add_vendor', (req, res, next)=>{
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
    if((req.body.vendorName == '' || req.body.description == '') || req.body.email == '' ||req.body.phone == null || ''||undefined ||req.body.address == ''||req.body.username == ''||req.body.password == '' ){
        req.flash('error', 'Fields missing')
             res.send({
            status: false,
            message: 'Fields missing',
            flash: req.flash('error')
        })
    }
    else{
    con.query(`SELECT * FROM evamgmt.vendor WHERE vendor_name = '${req.body.vendorName}' OR email = '${req.body.email}' OR username = '${req.body.username}'`, async(err, data)=>{
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
                vendor_id: uuidv4(),
                vendorName: req.body.vendorName,
          description: req.body.description,
          pricing: req.body.pricing,
          email: req.body.email,
          phone: req.body.phone,
          phone_vendor: req.body.phone_vendor,
          address: req.body.address,
          username: req.body.username,
          type: req.body.type,
          password: hashedPassword,
          
            }
            con.query(`INSERT INTO evamgmt.vendor (vendor_id, vendor_name, type, description, pricing, email, phone, phone_vendor, address, username, password) VALUES ('${newUser.vendor_id}','${newUser.vendorName}', '${newUser.type}' ,'${newUser.description}','${newUser.pricing}' ,'${newUser.email}', ${newUser.phone}, ${newUser.phone_vendor}, '${newUser.address}', '${newUser.username}', '${newUser.password}')`, (err)=>{if (err) { next(err); return; } })
            res.send({
              message: 'Success',
              status: true
            })
    }})
  }
  
  })

app.get('/vendorlist', (req, res, next)=>{
 
  const {vend} = req.query;
  p = `SELECT * FROM evamgmt.vendor WHERE type = '${vend}'`;
  con.query(p, (err, data)=>{

    if (err) {
     
      next(err);
    }
    else{
      res.send({
        status: true,
        data:data
      })

    }

  })

});

app.get('/osm', (req, res, next)=>{
 
  
  p = `SELECT * FROM evamgmt.employees WHERE designation = 'osm'`;
  con.query(p, (err, data)=>{

    if (err) {
     
      next(err);
    }
    else{
      res.send({
        status: true,
        data:data
      })

    }

  })

});

app.get('/osmname', (req, res, next)=>{
 
  const {id} = req.query
  p = `SELECT * FROM evamgmt.employees WHERE employee_id = '${id}'`;
  con.query(p, (err, data)=>{

    if (err) {
     
      next(err);
    }
    else{
      console.log(data[0])
      res.send({
        status: true,
        data:data[0]
      })

    }

  })

});

app.post('/osm', (req, res, next)=>{

  
  const {appl_id} = req.query;
  con.query(`UPDATE evamgmt.assignments SET osm = '${req.body.osm}', status = 'assigned' WHERE appl_id='${appl_id}';`, (err)=>{
    if (err) {
     
      next(err);
    }
    else{
      res.send({
        status: true,
      })

    }

  })
})

app.get('/managerDash', (req, res, next)=>{

  const id = req.query.osm;
  con.query(`SELECT * FROM evamgmt.assignments CROSS JOIN evamgmt.appln_details  ON evamgmt.assignments.appl_id = evamgmt.appln_details.appl_id WHERE osm='${id}' ORDER BY appln_date DESC;`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      console.log(data)
      res.json({
        status: true,
        data: data
      })

    }
  }
  )



})


app.get('/tasklist', (req, res)=>{

  const id = req.query.id;
  
  con.query(`SELECT * FROM evamgmt.tasks CROSS JOIN evamgmt.sub_events  ON evamgmt.tasks.sub_event_id = evamgmt.sub_events.sub_event_id WHERE main_event_id='${id}' ORDER BY deadline DESC;`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      console.log(data)
      res.json({
        status: true,
        data: data
      })

    }
  }
  )



});

app.get('/vendorTask', (req, res, next)=>{

  const id = req.query.id;
  con.query(`SELECT * FROM evamgmt.tasks CROSS JOIN evamgmt.sub_events  ON evamgmt.tasks.sub_event_id = evamgmt.sub_events.sub_event_id WHERE vendor_id = '${id}' ORDER BY status DESC, deadline DESC`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      console.log(data)
      res.json({
        status: true,
        data: data
      })

    }
  }
  )

});




app.get('/tasksubview', (req, res, next)=>{

  const task_id = req.query.task_id;
  const vendor_id = req.query.vendor_id;
  console.log(req.query);
  con.query(`SELECT * FROM evamgmt.task_submission WHERE vendor_id='${vendor_id}' AND task_id = '${task_id}' ORDER BY time DESC;`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      console.log(data)
      res.json({
        status: true,
        data: data
      })

    }
  }
  )

});

app.get('/managersubview', (req, res, next)=>{

  const task_id = req.query.task_id;
  
  console.log(req.query);
  con.query(`SELECT * FROM evamgmt.task_submission WHERE task_id = '${task_id}' ORDER BY time DESC;`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      console.log(data)
      res.json({
        status: true,
        data: data
      })

    }
  }
  )

});

app.get('/taskfinish', (req, res, next)=>{

  const task_id = req.query.task_id;
  
  
  console.log(req.query);
  con.query(`UPDATE evamgmt.tasks SET status = 'Completed' WHERE task_id = '${task_id}';`, (err, data)=>{
    if (err) {
     
      next(err);
    }
    else{
      console.log(data)
      res.json({
        status: true,
        data: data
      })

    }
  }
  )

});





app.get('/imagesubview', (req, res, next)=>{
  const {task_submission_id } = req.query
  const dir = `assets/images/appln/${task_submission_id}`;
  fs.readdir(dir, (err, files) => {

    if (err) {           
      next(err);
    }
    else{
    console.log(files.length);
    res.json(
      {
        status: true,
        data: files.length
      }
    )}
  });
  
})

app.post('/subreview', (req, res, next)=>{
  
  console.log(req.body);
  con.query(`UPDATE evamgmt.task_submission SET osm_changes = '${req.body.review}', status = '${req.body.status}' WHERE task_submission_id='${req.body.task_submission_id}' ORDER BY time DESC;`, (err)=>{
    if (err) {
     
      next(err);
    }
    else{      
      res.json({
        status: true,        
      })

    }
  }
  )

});

app.get('/managerView', (req, res)=>{

  const {appl_id } = req.query
  const dir = `assets/images/appln/${appl_id}`;
  fs.readdir(dir, (err, files) => {
    if (err) {
     
      next(err);
    }
    else{
    console.log(files.length);
    res.json(
      {
        status: true,
        data: files.length

      }
    )}
  });

})


app.get('/images', (req, res, next)=>{
  const id = req.query.id
  const dir = `assets/images/appln/${id}`
  fs.readdir(dir, (err, files) => {
    if (err) {
      next(err);
    }
    var FilesData = [] 
    files.forEach((value)=>{
      
    })
    res.send({status: true, data: files})
  })

})

app.use((err, req, res, next)=>{
  console.log(err)
  const error = ReactError(err, 'Internal server error')
  res.send(error)
})

