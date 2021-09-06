// funzione per creare il campo di gioco
function creaCampo(nCelle) {
    for ( let i = 1; i <= nCelle; i++) {
        document.getElementById(`campo`).innerHTML += `<div id="${i}" class="cella">${i}</div>`;
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

// variabili di base
var numBombe = 16;

// variabili in base alla difficoltà scelta dall'utente nella select e creazione campo da gioco
var difficoltà = ``;
var numCelle = 0;
var punti = 0;
var numCelleLibere = 0;
var posizioniBombe = [];

document.getElementById(`start`).addEventListener('click', 
    function() {
        difficoltà = document.getElementById(`scelta-difficoltà`).value;
        switch (difficoltà) {
        case "basso":
            numCelle = 100;
            punti = 1.195;
            break;
        case "medio":
            numCelle = 80;
            punti = 1.569;
            break;
        case "alto":
            numCelle = 50;
            punti = 2.949;
            break;
        }

        numCelleLibere = numCelle - numBombe;

        creaCampo(numCelle);
        document.getElementById(`campo`).classList.add(`mostra`);

        document.getElementById(`form-gioco`).classList.add(`nascondi`);
        
        while (posizioniBombe.length < 16) {
            var posizioneRandom = randomNumber(1, numCelle);

            if (inArray(posizioniBombe, posizioneRandom) == false) {
                posizioniBombe.push(posizioneRandom);
            }
        }
    }
);

// eventi al click delle celle
var numeriValidi = [];
var punteggio = 0;

// funzione da inserire nell'evento click
function gioco(event) {

    var numCliccato = event.target.innerHTML;

    // se viene cliccata una cella a cui corrisponde una bomba
    if ( inArray(posizioniBombe, numCliccato)) {
        for (var i = 0; i < numBombe; i++) {

            var idCelleBombe = posizioniBombe[i].toString();
            document.getElementById(idCelleBombe).classList.add(`bomba`);
            document.getElementById(idCelleBombe).innerHTML += `<i class="fas fa-bomb"></i>`;
        }

        // risultato fine gioco
        document.getElementById(`totale-punti`).innerHTML += `Hai totalizzato: <span class="numero">${parseInt(punteggio)}</span> punti.`;
        document.getElementById(`risultato`).classList.add(`mostra`);

        // rimuovo evento
        document.getElementById(`campo`).removeEventListener('click', gioco);
    // se viene cliccata una cella valida/vuota
    } else {
        event.target.classList.add(`clicked`);            
        numeriValidi.push(numCliccato);
        punteggio += punti;

        // se tutte le celle vuote/valide vengono cliccate
        if (numeriValidi.length == numCelleLibere) {

            document.getElementById(`risultato`).classList.add(`massimo`);
            document.getElementById(`totale-punti`).innerHTML += `Hai ottenuto il punteggio massimo di: <span class="numero">${parseInt(punteggio)}</span> punti. Complimenti!`;
        }
    }
}
// evento click
document.getElementById(`campo`).addEventListener('click', gioco);

// evento per far ricominciare il gioco
document.getElementById(`restart`).addEventListener('click', 
    function() {
        window.location.reload();
    } 
);

