//Controller mailing
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const db = require('index');
const controller = db.con;


exports.sendMail = (req,res) => {

//récupération des emails

    let content = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><h1>Bienvenue !</h1><div><p>Voici ci-dessous le lien vers le formulaire à remplir :</p><a href="https://www.w3schools.com/jsref/met_win_settimeout.asp" target="_blank">formulaire d\'évaluation</a></div></body></html>'

    let students = [];

    controller.query('SELECT adresseMailUse FROM participant', (err, result) => {

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
        host: 'smtp.mailtrap.io',
        port: 465,
        secureConnection: true,
        transportMethod: 'SMTP',
        auth: {
        user: f1c0ebc7a124e8,
        pass: ce7615505c0f0b
        }
    }

    let mailOptions = {
      from: 'maguattelo27@gmail.com',
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

}
