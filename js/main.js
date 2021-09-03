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

// variabili in base alla difficoltà scelta dall'utente nella select e creazione campo da gioco
var difficoltà = ``;

document.getElementById(`start`).addEventListener('click', 
    function() {
        difficoltà = document.getElementById(`scelta-difficoltà`).value;
        switch (difficoltà) {
        case "basso":
            var numCelle = 100;
            var punti = 1.195;
            break;
        case "medio":
            var numCelle = 80;
            var punti = 1.569;
            break;
        case "alto":
            var numCelle = 50;
            var punti = 2.949;
        }

        var possibilità = numCelle - numBombe;

        creaCampo(numCelle);

        document.getElementById(`campo`).classList.add(`mostra`);
        document.getElementById(`form-gioco`).classList.add(`nascondi`);
        document.getElementById(`start`).classList.add(`nascondi`);
    }
);

// variabili di base
var numBombe = 16;
var posizioniBombe = [];

while (posizioniBombe.length < 16) {
    var posizioneRandom = randomNumber(1, 100);

    if (inArray(posizioniBombe, posizioneRandom) == false) {
        posizioniBombe.push(posizioneRandom);
    }
} 

// eventi al click delle celle

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

