// @ts-check
'use strict';

const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

const caricamentoMessaggio = document.querySelector('#caricamento');
const erroreMessaggio = document.querySelector('#errore');

if (caricamentoMessaggio !== null && erroreMessaggio !== null) {

    caricamentoMessaggio.innerHTML = 'Caricamento';
    fetch(API_URL)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            erroreMessaggio.classList.add('d-none'); // aggiunto d-none leggi "README.md 1)" per capire
        })
        .catch(error => {
            console.error(error);
            erroreMessaggio.innerHTML = 'Si è verificato un errore';
        })
        .finally(() => {
            caricamentoMessaggio.innerHTML = '';
            caricamentoMessaggio.classList.add('d-none');
        });
}



