const express = require('express');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));


const con = mysql.createConnection({
    host: 'localhost', 
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'ProjectDB'
});
const server = app.listen(3003, function(){
    const host = server.address().address 
    const port = server.address().port
    console.log("Running on port 3003...");
});

con.connect(function(error) { 
    if(error) console.log(error); 
    else console.log("connected");
});

app.post('/insert', function(req, res) {
    
    const q1 = req.body.q1;
    const q2 = req.body.q2;
    const q3 = req.body.q3;
    const q4 = req.body.q4;
    const q5 = req.body.q5;
    const q6 = req.body.q6;
    const q7 = req.body.q7;
    const q8 = req.body.q8;
    const q9 = req.body.q9;
    const q10 = req.body.q10;
    const q11 = req.body.q11;
    const q12 = req.body.q12;
    const q13 = req.body.q13;
    const q14 = req.body.q14;
    const q15 = req.body.q15;
    const q16 = req.body.q16;
    const q17 = req.body.q17;


    const sqlInsert = 'INSERT INTO formulaire (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, Q16, q17) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    con.query(sqlInsert,[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17], function(error, result){
            console.log(error);
    });
});

app.get('/select', function(req, res) {
    const sqlSelect= 'SELECT * FROM formulaire ';
    con.query(sqlSelect, function (error, result) {
            console.log(result);
            res.send(result);
        });
});

//const router = express.Router();
app.get('/send', function sendmail (req,res){

    //récupération des emails
    
        let content = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><h1>Bienvenue !</h1><div><p>Voici ci-dessous le lien vers le formulaire à remplir :</p><a href="https://www.w3schools.com/jsref/met_win_settimeout.asp" target="_blank">formulaire d\'évaluation</a></div></body></html>'
    
        let students = [];
    
        con.query('SELECT adresseMailUse FROM participant', (err, result) => {
    
          if (err) throw err;
    
            if (result.length) {
            //console.log(result);    
                for(e in result){
                    students.push(result[e].email);
                }
            //console.log(students);       
            } else {
                console.log("ERREUR! "+err.message);
            }
            
        }); 
    
    //fonctions d'envoi mails
        let options = {
            host: 'smtp.gmail.com',
            port: 465,
            secureConnection: true,
            transportMethod: 'SMTP',
            auth: {
            user: 'elhadjimaguattelo@esp.sn',
            pass: '782929834'
            }
        }
    
        let mailOptions = {
          from: 'elhadjimaguattelo@esp.sn',
          to: students,
          subject: 'Formulaire d\'enquête! (avec recup mails bd) ',
          html: content
        };
    
    
        let transporter = nodemailer.createTransport(smtpTransport(options));
        
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("ECHEC D'ENVOI MAIL: " + error.message);
          } else {
            console.log('ENVOI MAIL RÉUSSI! ' + info.response);
        }
    
    });
    
    });

//module.exports = router;