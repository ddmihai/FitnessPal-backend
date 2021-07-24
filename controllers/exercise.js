const db = require('../connection/connection.js');

exports.create = (req, res, next) => {
    const { dayID, exerciseName, comments } = req.body;
    const sql = `INSERT INTO exercise 
    (dayID, exerciseName, comments)
    VALUES ('${dayID}', '${exerciseName}', '${comments}');`

    db.query(sql, (err, response) => {
        if (err) throw err;

        res.send(response)
    })
}


exports.deleteEx = (req, res, next) => {
    const exerciseID = req.params.id;
    const sql = `DELETE FROM exercise WHERE exerciseID = '${exerciseID}'`;
    db.query(sql, (err, response) => {
        if (err) throw err;
        if (response.length == 0) return  res.sendStatus(500);
        else return res.send('Exercise deleted');  
    })
}


exports.update = (req, res, next) => {
    const exerciseID = req.params.id;
    const { exerciseName, comments } = req.body;
    const sqlGet = `SELECT * FROM exercise WHERE exerciseID = '${exerciseID}'`

    db.query(sqlGet, (err, result) => {
        if (err) throw err;
        if (result.length == 0) return  res.sendStatus(500);

        else {

            const sql = `UPDATE exercise SET 
            exerciseName = '${exerciseName  ? exerciseName : result[0].exerciseName }',
            comments     = '${comments      ? comments : result[0].comments }'
            WHERE exerciseID = '${exerciseID}'`
            
            db.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length == 0) return  res.sendStatus(500);
                else {
                    res.send('Exercise modified!');
                } 
            })
        } 
    })
}