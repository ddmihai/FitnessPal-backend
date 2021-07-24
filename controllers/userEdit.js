const db        = require('../connection/connection');

/* Take the user with a SQL statemtnt and after compare with ? operator */
exports.update = (req, res, next) => {

    const { firstName ,lastName ,age ,currentWeight ,targetWeight ,username ,password } = req.body;
    const userID    = req.params.id;
    let oldValues   = `SELECT * FROM users WHERE userID = '${userID}'`;

    let newValues   = `UPDATE users
                    SET 
                    firstName       = '${req.body.firstName      ? firstName      : res[0].firstName  }'  ,
                    lastName        = '${req.body.lastName       ? lastName       : res[0].lastName  }' ,
                    age             = '${req.body.age            ? age            : res[0].age  }' ,
                    currentWeight   = '${req.body.currentWeight  ? currentWeight  : res[0].currentWeight  }' ,
                    targetWeight    = '${req.body.targetWeight   ? targetWeight   : res[0].targetWeight }',
                    username        = '${req.body.username       ? username       : res[0].username }'
                    WHERE userID    = '${userID}' ;`

    db.query(oldValues, (error, result) => {
        if (error)      throw error;
        if (result)     {
            db.query(newValues, (error, result) => {
                if (error)      throw error;
                if (result)     return res.send('User modified!');
            })
        }
    })
}

/* 
                ---***--- 
    To be created password update with bcrypt
                ---***---
*/