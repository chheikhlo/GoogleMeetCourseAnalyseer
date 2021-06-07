--Création de la base de donnée
CREATE DATABASE googlemeet;
--utilisation de la base de donnée
USE googlemeet;
--Création des tables :
CREATE TABLE  CLASSE(
	nomClasse  VARCHAR(50) NOT NULL PRIMARY KEY 
);
CREATE TABLE SEANCE(
	idSeance varchar(50) PRIMARY KEY ,
	heureDebutFin VARCHAR(50)  ,
	NbPartageEcran integer
	);
CREATE TABLE  Matiere(
	IdProfesseur integer ,
	nomMatiere varchar(50) PRIMARY KEY ,
	constraint fk_matiere_seance foreign key (IdProfesseur) references PROFESSEUR(idProfesseur)
	);
CREATE TABLE  Evaluation(
	idParticipant integer NOT NULL ,
	idSeance integer ,
	noteSeance integer,
	constraint fk_evaluation_participant foreign key (idParticipant) references PARTICIPANT(idParticipant),
	constraint fk_evaluation_seance foreign key (idSeance) references SEANCE (idSeance),
	constraint pk_evalua_participant_seance PRIMARY KEY (idParticipant,idSeance)
	);
CREATE TABLE  PROFESSEUR(
	idProfesseur integer PRIMARY KEY ,
	NomClasse varchar(25),
	prenom VARCHAR(50),
	nom varchar(50),
	motDePass  varchar(50),
	adresseMail varchar(50),
	Constraint fk_professeur_classe foreign key (NomClasse) references Matiere(nomClasse)
	);
CREATE TABLE PARTICIPANT(
	idParticipant integer primary key NOT NULL AUTO_INCREMENT,
	IdProfessseur integer ,
	IdSeance integer ,
	nbConnDeconn integer ,
	dureeMoyPresence integer ,
	typeTerminalUse varchar(20) ,
	regionOrigine varchar(20) ,
	AdresseMail varchar(250) ,
	constraint fk_professeur_participant foreign key (IdProfessseur) references PROFESSEUR(idProfessseur),
	constraint fk_seance_participant foreign key (IdSeance) references SEANCE(idSeance)
	);
CREATE TABLE ETUDIANT(
	idEtudiant integer PRIMARY KEY NOT NULL,
	NameClasse varchar(25),
	prenom VARCHAR(50),
	nom varchar(50),
	numeroEtudiant varchar(50),
	adresseMail varchar(50),
	Constraint fk_classe_etudiant foreign key (NameClasse) references CLASSE(nomClasse)
	);