const router = require('express').Router();
const { threadId } = require('../connection');
const conn = require('../connection');

router.route('/all').get((req, res) => {
    console.log('route : interview/all/');

    let sql = `
    SELECT I.id AS iid, P.id AS pid,
    I.company AS company, I.start_time, I.end_time, I.place, I.position,
    P.name, P.email, P.phone, P.company AS participant_company
    FROM interview_participant IP
    INNER JOIN participants P
    ON IP.participant_id = P.id
    INNER JOIN interviews I
    ON IP.interview_id = I.id
    `;

    let ret = [];

    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        result.forEach(record => {
            let indx = ret.findIndex((el) => el.iid == record.iid);
            if (indx === -1) {
                ret.push({
                    iid: record.iid,
                    company: record.company,
                    strt: record.start_time,
                    end: record.end_time,
                    place: record.place,
                    position: record.position,
                    participants: [{
                        pid: record.pid,
                        name: record.name,
                        email: record.email,
                        phone: record.phone,
                        company: record.participant_company,
                    }],
                });
            } else {
                ret[indx].participants.push({
                    pid: record.pid,
                    name: record.name,
                    email: record.email,
                    phone: record.phone,
                    company: record.participant_company,
                })
            }
        });
        res.send(ret);
    });
});

router.route('/add').post(async (req, res) => {
    console.log('route : interview/add/');
    checkValidInsertion(req.body).then(valid_response => {
        if (valid_response.status === true) {

            let interview = {
                company: req.body.company,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                place: req.body.place,
                position: req.body.position,
            };

            conn.query('INSERT INTO interviews SET ?', interview,
                function (err, result) {
                    if (err) throw err;

                    let interview_id = result.insertId;

                    let participants = req.body.participants.map((el) => {
                        return [
                            el.id,
                            interview_id,
                            el.role,
                        ];
                    });

                    conn.query('INSERT INTO interview_participant (participant_id, interview_id, role) VALUES ?', [participants],
                        function (err, result) {
                            console.log(result);
                            if (err) throw err;
                            res.status(201).send({ interview_id: interview_id });
                        });
                });
        } else {
            res.status(400).send('Invalid Request');
        }
    });
});

router.route('/edit/:id').post((req, res) => {
    console.log('route : interview/edit/' + req.params.id + '/');

    checkValidUpdate(req.body).then(valid_response => {
        if (valid_response.status === true) {

            let interview_detail = {
                id: req.params.id,
                company: req.body.company,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                place: req.body.place,
                position: req.body.position,
                participants: req.body.participants,
            };

            conn.query(`
            UPDATE interviews
            SET company = ?, start_time = ?, end_time = ?, place = ?, position = ?
            WHERE id = ?
            `, [interview_detail.company, interview_detail.start_time, interview_detail.end_time, interview_detail.place, interview_detail.position, interview_detail.id],
            function (err, result) {
                if (err) throw err;

                conn.query("DELETE FROM interview_participant WHERE interview_id = ?", [interview_detail.id],
                function (err, result) {
                    if (err) throw err;
                });
                conn.query('INSERT INTO interview_participant (participant_id, interview_id, role) VALUES ?', [interview_detail.participants.map(el => {return  [el.id, interview_detail.id, el.role] })],
                function (err, result) {
                    if (err) throw err;
                });
            });
        } else {
            res.status(400).send('Invalid Request');
        }
    });
});

async function checkValidInsertion(inp) {
    return new Promise(resolve => {
        let ret = { status: true };
        if (inp.participants.length < 2) {
            ret.status = false;
            ret.message = 'Insufficient participants';
            resolve(ret);
        } else {
            let sql = `
        SELECT P.id
        FROM participants P
        WHERE P.id IN (?) AND EXISTS(
            SELECT IP.participant_id 
            FROM interview_participant IP
            INNER JOIN interviews I
            ON I.id = IP.interview_id
            WHERE p.id = IP.participant_id AND ? >= I.start_time AND ? <= I.end_time
        )
        `;
            conn.query(sql, [inp.participants.map(el => el.id), inp.end_time, inp.start_time], function (err, result, fields) {
                if (err) throw err;
                if (result.length > 0) {
                    ret.status = false;
                    ret.message = 'Timing Overlap';
                }
                resolve(ret);
            });
        }
    });
}

async function checkValidUpdate(inp) {
    return new Promise(resolve => {
        let ret = { status: true };
        if (inp.participants.length < 2) {
            ret.status = false;
            ret.message = 'Insufficient participants';
            resolve(ret);
        } else {
            let sql = `
        SELECT P.id
        FROM participants P
        WHERE P.id IN (?) AND EXISTS(
            SELECT IP.participant_id 
            FROM interview_participant IP
            INNER JOIN interviews I
            ON I.id = IP.interview_id
            WHERE p.id = IP.participant_id AND I.id != ? AND ? >= I.start_time AND ? <= I.end_time
        )
        `;
            conn.query(sql, [inp.participants.map(el => el.id), inp.iid, inp.end_time, inp.start_time], function (err, result, fields) {
                if (err) throw err;
                if (result.length > 0) {
                    ret.status = false;
                    ret.message = 'Timing Overlap';
                }
                resolve(ret);
            });
        }
    });
}

module.exports = router;
