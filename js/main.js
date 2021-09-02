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

for ( var i = 1; i <= 20; i++) {
    document.getElementById(`campo`).innerHTML += `<div class="cella">${i}</div>`;
}

//* genero 16 numeri casuali tra 1 e 100 (bombe), senza duplicati.
// funzione che crea numeri random entro un range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// funzione che restituisce true se un elementro è contenuto in un array, altrimenti false
function inArray(arr, el) {
    var count = 0;
    while ( count < arr.length ) {
        if ( arr[count] == el ) {
            return true;
        }
        count++
    }
    return false;
}

var posizioniBombe = [];

do {
    var posizioneRandom = randomNumber(1, 20);

    if (!inArray(posizioniBombe, posizioneRandom)) {
        posizioniBombe.push(posizioneRandom);
    }
} while (posizioniBombe.length < 5)

console.log(posizioniBombe);