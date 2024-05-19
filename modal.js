// Creer array, 
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Récupération des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnNone = document.querySelector('.close');
const last = document.getElementById("last");
const first = document.getElementById("first");
const quantity = document.getElementById("quantity");
const email = document.getElementById("email");
const form = document.getElementById('form');
const birthdate = document.getElementById('birthdate');
const checkboxObligatoire = document.getElementById('checkbox1');
const modalBody =document.querySelector('.modal-body');


// Événement de lancement de la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction de lancement de la modale
function launchModal() {
  modalbg.style.display = "block";
}
// Fermeture de la modale lors du clic sur la croix 
modalBtnNone.addEventListener('click', function(){
modalbg.style.display = "none";
});
// Fermeture de la modale lors de l'appui sur la touche ESC
window.addEventListener('keydown', function(e){
  if(e.key === "Escape" || e.key =="esc"){
    modalbg.style.display = "none";
  }
});

// Fonction de validation d'une adresse email avec une expression régulière
// Si email correspond a regex renvoi true, sinon false
function validateEmail(email) {
  
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Fonction de validation d'un prénom ou d'un nom de famille
function validateFirstLast(value) {
// Suppression des espaces inutiles avec la fonction trim
  value = value.trim();
// Vérification avec une expression régulière
  return /^[a-z ,.'-]+$/i.test(value)
}

// Fonction de validation d'une date
function validateDate(date){
  
  return /[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}/.test(date);
};

// Objet pour stocker les erreurs de validation
let errors = {
  first: false,
  last: false, 
  birthdate: false,
  email: false,
  tournoi: false,
  location: false,
  conditions: false,
  newevents: false,
};

// Écouteurs d'événements pour tester la validité des valeurs saisies
first.addEventListener("change", testFirst);
last.addEventListener("change", testLast);
email.addEventListener("change", testEmail); 
birthdate.addEventListener("change", testBirthdate);
quantity.addEventListener("change", testTournoi);
checkboxObligatoire.addEventListener("change", testCheckboxObligatoire);

// Événements pour supprimer les erreurs lorsque les champs sont vides
first.addEventListener ("input", function(){
  if (first.value == ""){
    errors.first= true;
    first.closest('.formData').removeAttribute('data-error-visible');
    first.closest('.formData').removeAttribute('data-error');
  }
});

last.addEventListener ("input", function(){
  if (last.value == ""){
    last.closest('.formData').removeAttribute('data-error-visible');
    last.closest('.formData').removeAttribute('data-error');
  }
});
email.addEventListener ("input", function(){
  if (email.value == ""){
    email.closest('.formData').removeAttribute('data-error-visible');
    email.closest('.formData').removeAttribute('data-error');
  }
});

// Fonction de test du prénom
function testFirst() {
  const firstName = first.value.trim(); // Suppression des espaces inutiles avec methode trim
  if (firstName.length >= 2) { // Vérification de la longueur si supérieure ou égale à 2
    // Le prénom est valide
    errors.first = false;
    first.closest('.formData').removeAttribute('data-error-visible');
    first.closest('.formData').removeAttribute('data-error');
  } else {
    // Le prénom est invalide
    errors.first = true;
    first.closest('.formData').setAttribute('data-error', "Le champ prénom doit avoir au moins 2 caractères.");
    first.closest('.formData').setAttribute('data-error-visible', true);
  }
}

// Fonction de test du nom de famille
function testLast() {
  const lastName = last.value.trim(); // Suppression des espaces inutiles avec methode trim
  if (lastName.length >= 2) { // Vérification de la longueur si supérieure ou égale à 2
    // Le nom de famille est valide
    errors.last = false;
    last.closest('.formData').removeAttribute('data-error-visible');
    last.closest('.formData').removeAttribute('data-error');
  } else {
    // Le nom de famille est invalide
    errors.last = true;
    last.closest('.formData').setAttribute('data-error', "Le champ nom de famille doit avoir au moins 2 caractères.");
    last.closest('.formData').setAttribute('data-error-visible', true);
  }
}

// Fonction de test de l'adresse email
function testEmail() {
    if (validateEmail(email.value)) {
      email.closest('.formData').removeAttribute('data-error-visible');
      email.closest('.formData').removeAttribute('data-error');
      errors.email= false;
    } else {
      errors.email= true;
      email.closest('.formData').setAttribute('data-error', `Votre adresse mail est incorrecte`);
      email.closest('.formData').setAttribute('data-error-visible', true);
    }
}

// Fonction de test de la date de naissance
function testBirthdate() {
  if (validateDate(birthdate.value)) {
    birthdate.closest('.formData').removeAttribute('data-error-visible');
    birthdate.closest('.formData').removeAttribute('data-error');
    errors.birthdate = false;
  } else {
    errors.birthdate = true;
    birthdate.closest('.formData').setAttribute('data-error', `Vous devez entrer votre date de naissance`);
    birthdate.closest('.formData').setAttribute('data-error-visible', true);
  }
}

// Fonction de validation du nombre de tournois déja participé
function testTournoi(){
    if (!quantity.value || quantity.value > 99 || quantity.value < 0){
      quantity.closest('.formData').setAttribute('data-error', `Veuillez entrer un chiffre entre 0 et 99`);
      quantity.closest('.formData').setAttribute('data-error-visible', true);
      errors.quantity = true;
    }else {
      errors.quantity = false;
      quantity.closest('.formData').removeAttribute('data-error');
      quantity.closest('.formData').removeAttribute('data-error-visible');
    }
}

// Fonction de validation de la checkbox obligatoire
function testCheckboxObligatoire(){
    if(checkboxObligatoire.checked){
      errors.conditions = false;
      checkboxObligatoire.closest('.formData').removeAttribute('data-error-visible');
      checkboxObligatoire.closest('.formData').removeAttribute('data-error');
    }else{
      errors.conditions = true;
      checkboxObligatoire.closest('.formData').setAttribute('data-error', `Vous devez acceptez les conditions générales d'utilisations`);
      checkboxObligatoire.closest('.formData').setAttribute('data-error-visible', true);
    }
}

// Écouteur d'événement pour vérifier si l'utilisateur souhaite être prévenu des prochains événements 
// On teste si l'utilisateur souhaite être prévenu. 
// Si oui, alors errors.newevents passe à true, si non false;
const newsEvent = document.getElementById('checkbox2');
newsEvent.addEventListener("change", function(){
  if(newsEvent.checked){
   errors.newevents = true;
  }
  else {
    errors.newevents = false;
  }
});

// Fonction pour vérifier si une ville est sélectionnée
// On vérifie si un bouton de type radio est sélectionné.
// Si un bouton est sélectionné, alors locationValue prend la valeur de l'option sélectionnée.
// Si aucun bouton n'est sélectionné, alors locationValue est undefined, renvoi false.
// Si un bouton est sélectionné, la valeur de errors.location est inversée.
// errors.location = false si une option est sélectionnée, et true si aucune option n'est sélectionnée.
// errors.location = false pour valider le formulaire.
const formLocation = document.getElementById('formLocation');
let radioLocation = document.querySelectorAll('input[name="location"]');
  function testCheckBoxLocation(){
    for (let loc of radioLocation){
      if(loc.checked){
        errors.location = false;
        formLocation.removeAttribute('data-error-visible');
        formLocation.removeAttribute('data-error');
      }else {
        formLocation.setAttribute('data-error', `Vous devez choisir une ville`);
        formLocation.setAttribute('data-error-visible', true);
      }
    }
  }
  
// Écouteur d'événement pour la soumission du formulaire
// Dès submit du formulaire on appele toutes les fonctions qui vont infirmer ou confirmer la value des input qui ont été rentré
// Chaque fonction qui teste les inputs , va modifier l'objet errors. 
// Si l'objet errors a une de ses clés qui a la valeur false alors le submit est empéché , si tous les input sont bons, alors un message est écrit pour confirmer la validation du formulaire

form.addEventListener('submit', function(e){
  testCheckBoxLocation();
  testFirst();
  testLast();
  testEmail();
  testBirthdate();
  testTournoi();
  testCheckboxObligatoire();
  if (errors.first || errors.last || errors.birthdate || errors.email || errors.tournoi || errors.location || errors.conditions){
    e.preventDefault(); // Empêche la soumission du formulaire si des erreurs sont présentes
  }else {
    // Affichage d'un message de confirmation de l'inscription
    modalBody.innerHTML = `<div class="submitEnd"> Merci pour votre inscription</div>
    
    <div
    id="closeButton"
    class="btn-close">
    Fermer
    </div>
    
    `
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function(){
      modalbg.style.display = "none";
      });
  }

});