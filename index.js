
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const Userlist=require('./models/userSchema')
const bcrypt = require('bcrypt');
const emailVerification = require('./helpers/emailVerification');
const testMiddleware = require('./middleware/testMiddleware');
var jwt = require('jsonwebtoken');

const port = 3000
app.use(cors())
app.use(express.json())

// mongodb+srv://tanim17203099:<password>@cluster0.lltkjt2.mongodb.net/?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://tanim17203099:tanim17203099@cluster0.lltkjt2.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));

// const users = [
//     {
//         firstname: "Tanim", lastname: "Khan", email: "tanim11@gmail.com", password: "123"
//     },
//     {
//         firstname: "Rahim", lastname: "Khan", email: "rahim11@gmail.com", password: "123"
//     },
//     {
//         firstname: "Karim", lastname: "Khan", email: "karim11@gmail.com", password: "123"
//     },
// ]


app.get('/users', testMiddleware, async (req, res) => {
    // res.send(users)
    const user = await Userlist.find({})
    res.send(user)
})

app.post('/users', (req, res) => {
  
    console.log(req.body);
    let { firstname, lastname, email, password } = req.body;

    var token = jwt.sign({ id: email }, 'tators');

    // console.log("token :",token);
   
    
    if (!firstname) {
        res.send('please give firstname')
    } if (!lastname) {
        res.send('please give lastname')
    } if (!email) {
        res.send('please give email')
    } if (!password) {
        res.send('please give password')
    }

    bcrypt.hash(password, 10, function(err, hash) {

        const users=new Userlist({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hash,
            token:token
        })
    

        users.save()
        emailVerification(email)
    });


    res.send(req.body)

})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})