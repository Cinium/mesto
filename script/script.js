let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__container');
let userName = document.querySelector('.popup__input_type_name');
let userJob = document.querySelector('.popup__input_type_job');
let profileJob = document.querySelector('.profile__user-job');
let profileName = document.querySelector('.profile__user-name');

function openPopup() {
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;

    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = userName.value;
    profileJob.textContent = userJob.value;

    closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
