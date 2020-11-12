const router = require('express').Router();
const conn = require('../connection');

router.route('/all').get((req, res) => {
    console.log('route : participant/all/');

    let sql = `SELECT * FROM participants`;
    let ret = [];
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
