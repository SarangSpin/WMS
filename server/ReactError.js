
function ReactError(error, message) {
    const err = {
        
        status: 500,
        stack: error,
        message: message
        
    }
    return err
}

module.exports = ReactError


