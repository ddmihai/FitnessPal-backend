const db            = require('../connection/connection.js');


exports.create = (req, res, next) => {
    const { userID, dateDay, dayOfWeek } = req.body;
    const sqlQuery = `INSERT INTO DAY (userID, dateDay, dayOfWeek) VALUES('${userID}', '${dateDay}', '${dayOfWeek}')`;

    db.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
}


exports.edit = (req, res, next) => {
    const dayID = req.params.id;
    const { userID, dateDay, dayOfWeek } = req.body;

    let oldValues   = `SELECT * FROM day WHERE dayID = '${dayID}'`;
    let newValues   = `UPDATE day
    SET 
    dateDay         = '${req.body.dateDay      ?    dateDay      : res[0].dateDay  }'  ,
    dayOfWeek       = '${req.body.dayOfWeek    ?    dayOfWeek    : res[0].dayOfWeek  }' 
    WHERE dayID     = '${dayID}' ;`

    db.query(oldValues, (error, result) => {
        if (error) throw error;
        if (result.length == 0) return res.send('Something went wrong!');
        
        else {
            db.query(newValues, (error, result) => {
                if (error) throw error;
                return res.send('Day modified!');
            })
        } 
    })
}

exports.delete = (req, res, next) => {
    const dayID = req.params.id;
    let sql   = `DELETE FROM day WHERE dayID = '${dayID}'`;

    db.query(sql, (error, result) => {
        if (error) throw error;
        return res.send('Day deleted!');
    })

}