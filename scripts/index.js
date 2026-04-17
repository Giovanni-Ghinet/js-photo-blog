// @ts-check
'use strict';

/**
* @param {{id: number, title: string, date: number, url: string }[]} posts
*/

function renderCards(posts) {
    let postsHtml = ''; 

    for (const post of posts) {
        
        postsHtml += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card rounded-0 h-100 max-dimensione mx-auto custom-card">
                    <div class="card-body">
                        <img class="position-absolute top-0 start-50 translate-middle" src="./imgs/pin.svg" alt="puntina che tiene l'immagine">
                        <div class="img-dimensione"> 
                            <img src="${post.url}" alt="${post.title}">
                        </div>
                        
                        <p class="card-title pt-1 titolo-immagine">${post.title}</p>
                        <p class="card-text pb-2 data">${post.date}</p>
                    </div>
                </div>
            </div>
        `;
    }

    
    if (cardHtmlElem !== null) {
        cardHtmlElem.innerHTML = postsHtml;
    }
}

const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

const caricamentoMessaggio = document.querySelector('#caricamento');
const erroreMessaggio = document.querySelector('#errore');
const cardHtmlElem = document.querySelector('.card-html');

if (caricamentoMessaggio !== null && erroreMessaggio !== null) {

    caricamentoMessaggio.innerHTML = 'Caricamento';
    fetch(API_URL)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            erroreMessaggio.classList.add('d-none'); // aggiunto d-none leggi "README.md 1)" per capire
            renderCards(json);
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



