const bcrypt            = require('bcrypt');
const db                = require('../connection/connection');
const jwt               = require('jsonwebtoken');
require('dotenv').config();


exports.signup = (req, res) => {
    /* Get the req.body */
const { firstName,  lastName,  age,  currentWeight,  targetWeight,  username } = req.body;

/* Create a hash password */
const salt = 10;
bcrypt.hash(req.body.password, salt).then(function(hash) {
    const sql = `INSERT INTO users ( firstName,  lastName,  age,  currentWeight,  targetWeight,  username,  password)
    VALUES ('${firstName}', '${lastName}', '${age}', '${currentWeight}', '${targetWeight}', '${username}', '${hash}')`;

    db.query(sql, (error, result) => {
        if (error) throw error;

        res.send(result)
    })
});

};



/* Login */
exports.login = (req, res, next) => {
   let sqlGet = `SELECT * FROM users WHERE username = '${req.body.username}'`;

   db.query(sqlGet, (error, result) => {
       if (error) throw error;

       if (result.length == 0)  
       return res.send('Wrong username!');
     
       if (result) {

        const token = jwt.sign(
            { userId: result[0].userID },
              process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' });        

        bcrypt.compare(req.body.password, result[0].password, function(err, results) {
            if (err)         return res.sendStatus(500);
            if (results)     return res.send({user: result, token: token});
            if (!results)    return res.sendStatus(404);
        });
       }
   })

}

