'use strict';
function renderCards(posts) {
    let postsHtml = '';

    for (const post of posts) {
        postsHtml += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card rounded-0 h-100 max-dimensione mx-auto custom-card">
                    <div class="card-body">
                    <img class="position-absolute top-0 start-50 translate-middle pin-img" src="./imgs/pin.svg" alt="puntina che tiene l'immagine">
                        <div class="position-relative immagine-container" data-id="${post.id}">
                            <div class="img-dimensione"> 
                                <img class="immagine-card" src="${post.url}" alt="${post.title}">
                            </div>
                            <p class="card-title pt-1 titolo-immagine">${post.title}</p>
                            <p class="card-text pb-2 data">${post.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // se la variabile è diverso da null stampa con innerhtml
    
    if (cardHtmlElem !== null) {
        cardHtmlElem.innerHTML = postsHtml;

        // eventlistner dell'html iniettato con innerhtml

        const contenitoriImmagini = document.querySelectorAll('.immagine-container');
        contenitoriImmagini.forEach(container => {
            container.addEventListener('click', (event) => {
                event.preventDefault();

                const imgElement = container.querySelector('.immagine-card');
                if (!imgElement) return;

                const imageUrl = imgElement.src;
                const imageAlt = imgElement.alt;
                const titleElement = container.querySelector('.titolo-immagine');
                const captionText = titleElement ? titleElement.textContent : imageAlt;

                // Mostra il modale con l'immagine selezionata
                apriModale(imageUrl, imageAlt, captionText);
            });
        });
    }
}



function apriModale(src, alt, caption) {
    const modal = document.querySelector('#imageModal');
    const modalImg = document.querySelector('#modalImage');
    

    if (modal && modalImg) { // Controlla che modal, modalImg non siano null, undefined, false, 0 o stringa vuota
        modalImg.src = src;
        modalImg.alt = alt;
       

        modal.classList.remove('d-none'); // Rimuove la classe d-none per mostrare il modale
        document.body.classList.add('no-scroll'); // applica una classe al body per impedire lo scroll della pagina in modale
    }
}


function chiudiModale() {
    const modal = document.querySelector('#imageModal');
    if (modal) {
        modal.classList.add('d-none');
        document.body.classList.remove('no-scroll');
    }
}

document.addEventListener('DOMContentLoaded', () => {    // domcontentloaded lo interpreta il browser quando il dom è caricato
    const modal = document.querySelector('#imageModal');

    const closeBtn = modal.querySelector('.modal-close'); // Chiudi cliccando sulla X
    closeBtn.addEventListener('click', chiudiModale);
});


const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

const caricamentoMessaggio = document.querySelector('#caricamento');
const erroreMessaggio = document.querySelector('#errore');
const cardHtmlElem = document.querySelector('.card-html');

if (caricamentoMessaggio !== null && erroreMessaggio !== null) {
    caricamentoMessaggio.innerHTML = 'Caricamento';
    fetch(API_URL)
        .then((risposta) => {
        return risposta.json();
        })
        .then(json => {
            console.log(json);
            erroreMessaggio.classList.add('d-none');
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


const immagineInputElem = document.querySelector('#immagine-in');
const immagineThumbnailElem = document.querySelector('#immagine-thumbnail');
const inputNone = document.querySelector('.card-inpunt');

if (immagineInputElem !== null && immagineThumbnailElem !== null) {
    immagineInputElem.addEventListener('change', (event) => {
    if (immagineInputElem.files !== null &&
        immagineInputElem.files.length > 0) {
        const image = immagineInputElem.files[0];
        const imageUrl = URL.createObjectURL(image);
        immagineThumbnailElem.src = imageUrl;

        inputNone.classList.remove('d-none');
    }
    });
}