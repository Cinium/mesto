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
const submitPopup = document.querySelector('.popup-submit');
const avatarPopup = document.querySelector('.popup-avatar');

// формы
const addPopupForm = addPopup.querySelector('.popup__form');
const editPopupForm = editPopup.querySelector('.popup__form');
const submitPopupForm = submitPopup.querySelector('.popup__form');
const avatarPopupForm = avatarPopup.querySelector('.popup__form');

// инпуты
const inputName = document.querySelector('.popup__input_type_name');  
const inputJob = document.querySelector('.popup__input_type_job');

// селекторы
const elementsSelector = '.elements';
const elementTemplateSelector = '.element-template';

const imagePopupSelector = '.popup-image';
const editPopupSelector = '.popup-edit';
const addPopupSelector = '.popup-add';
const submitPopupSelector = '.popup-submit';
const avatarPopupSelector = '.popup-avatar';

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__edit-avatar-button');

// аФФка
const profileAvatar = document.querySelector('.profile__user-pic')



export {config,
        editPopup,
        addPopup,
        submitPopup,
        avatarPopup,
        addPopupForm,
        editPopupForm,
        submitPopupForm,
        avatarPopupForm,
        inputName,
        inputJob,
        elementsSelector,
        elementTemplateSelector,
        submitPopupSelector,
        imagePopupSelector,
        editPopupSelector,
        addPopupSelector,
        avatarPopupSelector,
        editButton,
        addButton,
        avatarButton,
        profileAvatar}