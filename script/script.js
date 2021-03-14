let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupOverlay = document.querySelector('.popup__overlay');
let popupSaveButton = document.querySelector('.popup__submit');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
    openPopup()
});

popupCloseButton.addEventListener('click', function() {
    closePopup()
});

popupOverlay.addEventListener('click', function() {
    closePopup()
});



let popupForm = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameInput.getAttribute('value');
    jobInput.getAttribute('value');

    let profileJob = document.querySelector('.profile__user-job');
    let profileName = document.querySelector('.profile__user-name');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
} // БОЖЕЕЕ ОНО РАБОТАЕТ

popupForm.addEventListener('submit', formSubmitHandler);
popupSaveButton.addEventListener('click', closePopup);
