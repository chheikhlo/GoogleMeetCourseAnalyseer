
function unblock(e) {
	document.querySelector('#Validation').removeEventListener('click', unblock, false);
	document.querySelector('#Validation').addEventListener('click', Verification);
	
}

//fonction de vérification des valeurs saisies
function Verification(e) {
	if(document.querySelector('#identifiant').value == '' || document.querySelector('#password').value == '') {
		alert('Veuillez renseigner tous les champs...');
		return;
	}
	if(document.querySelector('#identifiant').value == 'professeur' && document.querySelector('#password').value=='pres@Etudiants') {
        document.location.href="choixClasseMatiere.html";
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