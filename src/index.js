import './pages/index.css';
import Card from './script/Card.js';
import FormValidator from './script/FormValidator.js';
import {initialCards} from './script/initialCards.js';
import Section from './script/Section.js';
import UserInfo from './script/UserInfo.js';
import PopupWithForm from './script/PopupWithForm.js';
import PopupWithImage from './script/PopupWithImage.js';

// объект настроек для валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

// создание изначального набора карточек
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    renderCard(item)
    },
  },
  '.elements'
);
cardList.renderItems();

// попапы
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');

// формы
const addPopupForm = addPopup.querySelector('.popup__form');
const editPopupForm = editPopup.querySelector('.popup__form');

// инпуты
const inputName = document.querySelector('.popup__input_type_name');  
const inputJob = document.querySelector('.popup__input_type_job');


const elements = document.querySelector('.elements');

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')



// *** ФУНКЦИИ ***

// обработчик формы изменения профиля
function editFormHandler (data) {
  userInfo.setUserInfo(data);
  popupWithEditForm.close();
}

// обработчик формы создания карточек
function addFormHandler (cardData) {
  const section = new Section({
    data: [cardData],
    renderer: (cardData) => {
      renderCard(cardData)
    }
  }, 
  '.elements');

  section.renderItems();
  addPopupForm.reset();
  addFormValidation.toggleButtonState();
  popupWithAddForm.close();
}

// обработчик нажатия на картинку
function handleCardClick(text, link) {
  popupWithImage.open(text, link)
}

// рендерер карточек
function renderCard (cards) {
  const card = new Card(cards, '.element-template', handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}



// *** СЛУШАТЕЛИ КНОПОК ОТКРЫТИЯ ПОПАПОВ ***

// слушатель нажатия на кнопку редактирования
editButton.addEventListener('click', () => {
  // получаем имеющуюся информацию о пользователе 
  const info = userInfo.getUserInfo();
  // вставляем ее в инпуты
  inputName.value = info.name;
  inputJob.value = info.job;
  // открываем попыт
  popupWithEditForm.open();
});

// слушатель нажатия на кнопку добавления карточки
addButton.addEventListener('click', () => {
    popupWithAddForm.open();
});



// *** КЛАССЫ ***

// попап с картинкой
const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

// попап с формой редактирования профиля
const popupWithEditForm = new PopupWithForm('.popup-edit', editFormHandler);
popupWithEditForm.setEventListeners();

// попап с формой добавления карточки
const popupWithAddForm = new PopupWithForm('.popup-add', addFormHandler);
popupWithAddForm.setEventListeners();


// информация профиля
const userInfo = new UserInfo('.profile__user-name', '.profile__user-job');



// ** ВАЛИДАЦИЯ ФОРМ **

// валидация формы добавления карточки
const addFormValidation = new FormValidator(config, addPopupForm)
addFormValidation.enableValidation();

// валидация формы редактирования
const editFormValidation = new FormValidator(config, editPopupForm)
editFormValidation.enableValidation();




