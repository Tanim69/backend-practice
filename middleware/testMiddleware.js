var jwt = require('jsonwebtoken');
const Userlist=require('../models/userSchema')

function testMiddleware(req, res, next) {

    // console.log('ami middleware');
    // next()
    // console.log(req.headers.authorization);

    // if (req.headers.authorization == 12345) {

    //     next()

    // } else {
    //     res.send({ error: "AUTHORIZATION NOT FOUND" })
    // }


    console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization, 'tators', async function(err, decoded) {
       if(err){
        res.json({error: "AUTHORIZATION NOT FOUND"})
       }else{
        console.log(decoded.id,'hrrrrrrrrrrrrrr');
        const users = await UserList.find({email:decoded.id})
        if(users){
            next()
        }else{
            res.json({error: "AUTHORIZATION NOT FOUND"})
        }
       }
      });
      

}




module.exports = testMiddleware