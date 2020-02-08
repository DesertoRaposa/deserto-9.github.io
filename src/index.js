import CardList from './CardList';
import APIClass from './Api';
import Popup from './Popup';

import './index.css';

const list = document.querySelector(".places-list");

let card_list = new CardList(list);

let serverURL = 'https://praktikum.tk/cohort6/';
if (process.env.NODE_ENV == 'developement') {
    serverURL = 'https://praktikum.tk/cohort6/';
}

const API = new APIClass("2374ea76-9940-4bf3-8811-73a7f8930642", serverURL);

API.loadProfile(function (data) {
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    const userInfoPhoto = document.querySelector('.user-info__photo');

    userInfoName.textContent = data.name;
    userInfoJob.textContent = data.about;
    userInfoPhoto.style.backgroundImage = 'url(' + "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg" + ')';

    card_list.setApi(API);
});

const button = document.querySelector(".user-info__button");
button.addEventListener('click', function (event) {
    let myPopup = new Popup(0, card_list, API);
    myPopup.open();
});

const editbutton = document.querySelector('.user-info__edit-button');
editbutton.addEventListener('click', toggleNewPopup);
function toggleNewPopup() {
    let myPopup = new Popup(1, card_list, API);
    myPopup.open();
}

const imgPopup = document.querySelector(".imgpopup");
const imgPopupContent = document.querySelector(".imgpopup__content");
const imgPopupClose = document.querySelector(".imgpopup__close");

const cardsContainer = document.querySelector(".places-list");

cardsContainer.addEventListener('click', setBackground);

function setBackground(event) {
    if (event.target.classList.contains('place-card__image')) { // проверяю, что кликнула на карточку
        const bgURL = event.target.style.backgroundImage; // беру у карточки свойство background-image
        imgPopupContent.style.backgroundImage = bgURL; // назначаю это свойство попапу

        imgPopup.classList.add('imgpopup_is-opened');
    }
}

imgPopupClose.addEventListener('click', function (event) {
    imgPopup.classList.remove('imgpopup_is-opened');
});

/**
* Здравствуйте.
* --------------------------------------------------------------------
* У вас очень хорошая работа, Вы молодец.
* Есть только один важный момент, на который вам стоит обратить внимание, это регистр.
* Класс написан с большими буквами API.js в файле index.html а сам файл Api.js


*
*/