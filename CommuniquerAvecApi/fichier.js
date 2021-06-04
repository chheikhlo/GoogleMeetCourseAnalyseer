const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
let mysql = require('mysql');
let seance = Object();
let participant = Object();
let participants = [];
let seances = [];
let events;
let trouve = false;
let seanceExiste = false;
let credentials;
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fatou488",
  database: 'googlemeet'
});
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/admin.reports.audit.readonly', 'https://www.googleapis.com/auth/admin.reports.usage.readonly'];
// The file token.json stores the user's access and refresh tokens, and is];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.error('Error loading client secret file', err);

  // Authorize a client with the loaded credentials, then call the
  // Reports API.
  authorize(JSON.parse(content), listLoginEvents);
  credentials = JSON.parse(content);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oauth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[1]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oauth2Client, callback);
    oauth2Client.credentials = JSON.parse(token);
    callback(oauth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.warn(`Token not stored to ${TOKEN_PATH}`, err);
    console.log(`Token stored to ${TOKEN_PATH}`);
  });
}

/**
 * Lists the last 10 login events for the domain.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLoginEvents(auth) {
  const service = google.admin({version: 'reports_v1', auth});
  service.activities.list({
    userKey: 'all',
    applicationName: 'meet',
    eventName: 'call_ended'
   //maxResults: 10,

  }, (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);

    const activities = res.data.items;
    if (activities.length) {
     // console.log('Logins:');
      activities.forEach((activity) => {
       events = activity.events[0];
        participant.nbConnexion = 1;
        //console.log(events);
        participant.duree = 0;
        for(let i = 0; i<events.parameters.length; i++){
          //conference
          if(events.parameters[i].name ==='conference_id'){
            seance.id = events.parameters[i].value;
            participant.conference = events.parameters[i].value;
          }
          if(events.parameters[i].name === 'calendar_event_id'){
            seance.calendrier=events.parameters[i].value;
          }
          if(events.parameters[i].name ==='video_send_seconds'){
            seance.partage = parseInt(events.parameters[i].intValue);
          }
          //participant
          if(events.parameters[i].name === 'endpoint_id'){
            participant.IdConnexion = events.parameters[i].value;
          }
          if(events.parameters[i].name ==='duration_seconds'){
            participant.duree += parseInt(events.parameters[i].intValue);
          }
          if(events.parameters[i].name === 'device_type'){
            participant.terminal = events.parameters[i].value;
          }
          if(events.parameters[i].name ==='identifier'){
            participant.email = events.parameters[i].value;
          }
          if(events.parameters[i].name === 'location_region'){
            participant.region = events.parameters[i].value;
          }
        }
        for(let j = 0; j<participants.length; j++){
          if(participants[j].conference === participant.conference && participants[j].email ===participant.email){
            trouve = true;
            participants[j].nbConnexion++;
            participants[j].duree+=participant.duree;
          }
        }
        for(let k = 0; k < seances.length; k++){
          if(seances[k].id === seance.id){
            seanceExiste = true;
            seances[k] += seance.partage;
          }
        }
        if(!trouve){
          ajoutParticipant(participant.conference ,participant.nbConnexion, participant.IdConnexion, participant.duree, participant.terminal, participant.email, participant.region);
        }
        if(!seanceExiste){
          ajoutConference(seance.id, seance.calendrier, seance.partage);
        }
        trouve = false;
        seanceExiste = false;
      });
      
    } else {
      console.log('No logins found.');
    }
    //console.log(participants)
    console.log (seances);
  // for(let i=0;i<participants.length;i++){
  //let contenu = "INSERT INTO participant (nbConnDeconn,dureeMoyPresence,typeTerminalUse,regionOrigine, AdresseMail) VALUES (?)";
 //let contenu1 =  "INSERT INTO seance (idSeance,heureDebutFin, NbpartageEcran) VALUES (?)";
  //let data1 = [seances[i].id,seances[i].calendrier,seances[i].partage];
  /*let data = [participants[i].nbConnexion,participants[i].duree,participants[i].terminal,participants[i].region ,participants[i].email];
  con.query(contenu,[data],(err,results) => {
    if(err)
    throw err;
 });*/
/* con.query(contenu1,[data1],(err,results) => {
  if(err)
  throw err;
});
}*/
 /*for(let i=2;i<seances.length;i++){
  let contenu = "INSERT INTO seance (idSeance,heureDebutFin, NbpartageEcran) VALUES (?)";
  let data = [seances[i].id,seances[i].calendrier,seances[i].partage];
  con.query(contenu,[data],(err,results) => {
    if(err)
    throw err;
 });}*/
   });
  
}
/**
 * Fonction pour recuperer les participants
 * @param {chaine} conference identifiant de la connexion
 * @param {entier} nbConnexion nombre de connexion deconnexion sur le meme meet
 * @param {chaine} IdConnexion identifiant de la connexion
 * @param {entier} duree le temps total passee sur le meet (en seconde)
 * @param {chaine} terminal le type de terminal utilise
 * @param {chaine} email adresse email utilise
 * @param {chaine} region la region de connexion
 */
 function ajoutParticipant(conference, nbConnexion, IdConnexion, duree, terminal, email, region){
participants.push({conference, nbConnexion, IdConnexion, duree, terminal, email, region});
}

/**
 * Fonction pour recuperer les seances
 * @param {chaine} id identifiant de la conference
 * @param {chaine} calendrier identifiant du google calendar
 * @param {entier} partage le temps de partage d'ecran (Vrai si > 0 Faux si = 0)
 */
/*function ajoutParticipant(conference, nbConnexion, IdConnexion, duree, terminal, email, region){
  participants.push({conference, nbConnexion,IdConnexion, duree, terminal, email, region});
}*/
function ajoutConference(id, calendrier,partage){
  seances.push({id,calendrier,partage});
}
/*
//let contenu = "INSERT INTO participant (idParticipant,nbConnDeconn,typeTerminalUse,adresseMailUse) VALUES ?";
  //let data = [2,(participants[0]).nbConnexion,participants[0].terminal,participants[0].email];
  //con.query(contenu,[data],(err,results, fields)=>{
    /*if(err){
      return console.error(err.message);
    }
 // });*/
module.exports = {
  SCOPES,
  listLoginEvents,
  authorize,
  participants,
  seances,
  credentials
};
//exports.participants = participants