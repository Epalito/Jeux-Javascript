// Elements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fonds 
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)';
const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgBrulant = 'linear-gradient(to top, #f43b47 0%, #453a94 100%)';

const bgWin = 'linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)';
const bgLoose = 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)'; 

// PLAY : 
const play = () => {

    // nombre aléatoire 
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 5;
    let vies = totalVies;
    console.log(randomNumber);
    document.getElementById("totalVies").textContent = totalVies.toString();

    //Actualisation à chaque essai - TOUTE LA LOGIQUE
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value); // string -> number

        if(valeurInput < 0 || valeurInput > 100) return;

        if(valeurInput === randomNumber) {
            body.style.backgroundImage = bgWin; 
            message.textContent = `Bravo ! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled", "");
        }
        
        if(valeurInput !== randomNumber) {
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
                body.style.backgroundImage = bgBrulant; 
                message.textContent = "C'est brûlant !!! 🔥🔥🔥";
            } else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6) {
                body.style.backgroundImage = bgChaud; 
                message.textContent = "C'est chaud ! 🔥";
            } else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11) {
                body.style.backgroundImage = bgTiede; 
                message.textContent = "C'est tiède ! 😐";
            }  else {
                    body.style.backgroundImage = bgFroid; 
                    message.textContent = "C'est froid ❄️";
            }
            vies--;
            document.getElementById("totalVies").textContent = vies.toString();
            document.getElementById("number").value = ''; // Supprime le nombre jsute soumis
            verifyLoose();  
        } 
        actualiseCoeurs(vies);
    })

    const verifyLoose = () => {
        if(vies === 0) {
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu, la réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for (let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for (let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
    })
}

play();