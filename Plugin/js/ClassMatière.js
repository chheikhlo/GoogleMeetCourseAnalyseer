
function unblock(e) {
	document.querySelector('#Validation').removeEventListener('click', unblock, false);
	document.querySelector('#Validation').addEventListener('click', Verification);
	
}
//fonction de vérification des valeurs saisies
function Verification(e) {
	if(document.querySelector('#Classe').value == '' || document.querySelector('#Matiere').value == '') {
		alert('Veuillez choisir une classe et une matière ...');
		return;
	}
	if((document.querySelector('#Classe').value == 'GLSIA' || document.querySelector('#Classe').value == 'GLSIB') && (document.querySelector('#Matiere').value=='Mathématique' || document.querySelector('#Matiere').value=='SGBDA' || document.querySelector('#Matiere').value=='Programmation' || document.querySelector('#Matiere').value=='UML' || document.querySelector('#Matiere').value=='Génie Logiciel' || document.querySelector('#Matiere').value=='Droit')) {
		document.location.href="popup.html";
        
	} else {
		alert('Veuillez revérifier les informations saisis !');
		return;
	}
	document.querySelector('#Validation').removeEventListener('click', Verification, false);
	document.querySelector('#Validation').addEventListener('click', unblock);
	
	
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#Validation').addEventListener('click', Verification);
    
});