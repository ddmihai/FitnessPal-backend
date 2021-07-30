const db = require('../connection/connection.js');

exports.createSet = (req, res, next) => {
    const { exerciseID,	weight,	timeBetween, comments } = req.body;
    const sql = `INSERT INTO sets (	exerciseID,	weight,	timeBetween, comments )
    VALUES ('${exerciseID}', '${weight}', '${timeBetween}', '${comments}')`;

    db.query(sql, (error, result) => {
        if (error) throw error;
        return res.send('Set created!');
    });
}


exports.update = (req, res, next) => {
    const setID = req.params.id;
    const { exerciseID,	weight,	timeBetween, comments } = req.body;

    let oldValues   = `SELECT * FROM sets WHERE setID = '${setID}'`;

    const newValues = `UPDATE sets SET 
    weight      = '${weight         ? weight :          result[0].weight }' ,
    timeBetween = '${timeBetween    ? timeBetween :     result[0].timeBetween }' ,
    comments    = '${comments       ? comments :        result[0].comments }' `;

    db.query(oldValues, (error, result) => {
        if (error) throw error;
        
        db.query(newValues, (error, result) => {
            if (error) throw error;
            
            res.send('Set modified!')
        });
    });
}