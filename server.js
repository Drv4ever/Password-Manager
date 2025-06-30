const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public'),{ index: false}));

// server the index.html


app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, "public" , "login.html"));

});

app.post('/login',(req,res) => {
    const {username,password } =req.body;


const masteruser = "dhruv";
const masterpass = "passcode123";

if (username === masteruser && password=== masterpass){
    res.redirect('/your-vault');
}
else{
    res.send(`<script> alert("Invalid Credentials"); window.location.href ="/"</script>`);
}

});


app.get('/your-vault',(req,res) =>{
    res.sendFile(path.join(__dirname, "public" , "index.html"));

});


app.listen(3000,()=>{
    console.log(`server running at localhodt:3000 `);
})