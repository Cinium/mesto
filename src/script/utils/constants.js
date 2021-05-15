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

// формы
const addPopupForm = addPopup.querySelector('.popup__form');
const editPopupForm = editPopup.querySelector('.popup__form');

// инпуты
const inputName = document.querySelector('.popup__input_type_name');  
const inputJob = document.querySelector('.popup__input_type_job');

// селекторы
const elementsSelector = '.elements';
const elementTemplateSelector = '.element-template';

const imagePopupSelector = '.popup-image';
const editPopupSelector = '.popup-edit';
const addPopupSelector = '.popup-add';

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')

export {config,
        editPopup,
        addPopup,
        addPopupForm,
        editPopupForm,
        inputName,
        inputJob,
        elementsSelector,
        elementTemplateSelector,
        imagePopupSelector,
        editPopupSelector,
        addPopupSelector,
        editButton,
        addButton}