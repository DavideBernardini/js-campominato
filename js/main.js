// Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
// I numeri non possono essere duplicati.
// In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
// La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
// Al termine della partita il software deve comunicare il punteggio.
// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// funzione per creare il campo di gioco
function creaCampo(nCelle) {
    for ( let i = 1; i <= nCelle; i++) {
        document.getElementById(`campo`).innerHTML += `<div class="cella">${i}</div>`;
    }
}

// funzione che crea numeri random entro un range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// funzione che restituisce true se un elementro è contenuto in un array, altrimenti false
function inArray(arr, el) {
    let count = 0;
    while ( count < arr.length ) {
        if ( arr[count] == el ) {
            return true;
        }
        count++
    }
    return false;
}

// variabili in base alla difficoltà
var difficoltà = prompt("Scegli un livello di difficoltà tra bassa, media o alta");

switch (difficoltà) {
    case "bassa":
        var numCelle = 100;
        var punti = 1.195;
        break;
    case "media":
        var numCelle = 80;
        var punti = 1.569;
        break;
    case "alta":
        var numCelle = 50;
        var punti = 2.949;
}

// variabili di base
var numBombe = 16;
var possibilità = numCelle - numBombe;
var posizioniBombe = [];

while (posizioniBombe.length < 16) {
    var posizioneRandom = randomNumber(1, 100);

    if (inArray(posizioniBombe, posizioneRandom) == false) {
        posizioniBombe.push(posizioneRandom);
    }
} 

creaCampo(numCelle);

// eventi al click delle celle (cliccabili una sola volta)

var numeriValidi = [];
var punteggio = 0;

document.getElementById(`campo`).addEventListener('click', 
    function(event) {

        var numCliccato = event.target.innerHTML;

        if ( inArray(posizioniBombe, numCliccato)) {

            alert("Partita terminata. Hai totalizzato: " + parseInt(punteggio) + " punti.");
            window.location.reload();

        } else if ( inArray(numeriValidi, numCliccato) ) {

            alert("Hai già cliccato");

        } else {

            event.target.classList.add(`clicked`);
            numeriValidi.push(numCliccato);
            punteggio += 1.195;

            if (numeriValidi.length == possibilità) {
                alert("Hai ottenuto il punteggio massimo di " + parseInt(punteggio) + ". Bravo!");
            }
        }
    }
);

