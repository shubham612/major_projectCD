const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));

// setup our view engine
app.set('view engine','ejs');
app.set('views','./views');






app.listen(port,function(err){
    if(err){
        console.log(`Error in running Server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})