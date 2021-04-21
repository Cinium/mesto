export {editFormHandler, addFormHandler};
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// массив стандартных карточек
const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// объект настроек для валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

// попапы
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-image');

// формы
const addPopupForm = addPopup.querySelector('.popup__form');
const formList = Array.from(document.querySelectorAll(config.formSelector));

// инпуты
const inputName = document.querySelector('.popup__input_type_name');  
const inputJob = document.querySelector('.popup__input_type_job');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');

// значения в профиле и карточки
const profileJob = document.querySelector('.profile__user-job');
const profileName = document.querySelector('.profile__user-name');
const elements = document.querySelector('.elements');

// изображение и заголовок в фигуре
const imagePopupTitle = document.querySelector('.popup__image-title');
const imagePopupPic = document.querySelector('.popup__image');

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')

const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');


// ** ФУНКЦИИ **

//изменение профиля
function editFormHandler () {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(editPopup);
}

// обработчик формы создания карточек
function addFormHandler () {
  const card = new Card(inputPlace.value, inputLink.value);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
  addPopupForm.reset();
  closePopup(addPopup);
}

// открытие попапов
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.overlay').classList.add('overlay_opened');

  // закрытые попапов по нажатию на Esc
  document.body.addEventListener('keydown', closePopupWithEscHandler);
  // закрытие по клику на оверлей
  popup.querySelector('.overlay').addEventListener('click', () => closePopup(popup));
}

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.querySelector('.overlay').classList.remove('overlay_opened');

  document.body.removeEventListener('keydown', closePopupWithEscHandler);
  popup.querySelector('.overlay').removeEventListener('click', () => closePopup(popup));
}

function closePopupWithEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(editPopup);
    closePopup(addPopup);
    closePopup(imagePopup);
  }
}


// ** СЛУШАТЕЛИ **

// кнопка редактирования
editButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;

    openPopup(editPopup);
  });

// кнопка добавления карточки
addButton.addEventListener('click', () => {
    openPopup(addPopup);
  });

// кнопки закрытия попапов
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

// валидация для каждой формы
formList.forEach((form) => {
  new FormValidator(config, form).enableValidation();
})

// создание изначального набора карточек
initialCards.forEach((item) => {
  const card = new Card(item.place, item.link);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
});