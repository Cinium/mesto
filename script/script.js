// попапы
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-image');
const popups = [editPopup, addPopup, imagePopup];

const editPopupOverlay = document.querySelector('.popup-edit__overlay');
const addPopupOverlay = document.querySelector('.popup-add__overlay');
const imagePopupOverlay = document.querySelector('.popup-image__overlay');
const overlays = [editPopupOverlay, addPopupOverlay, imagePopupOverlay];

// формы
const editPopupForm = editPopup.querySelector('.popup__form');
const addPopupForm = addPopup.querySelector('.popup__form');

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

// //изменение профиля
// function editFormHandler (evt) {
//   evt.preventDefault();
 
//   profileName.textContent = inputName.value;
//   profileJob.textContent = inputJob.value;

//   closePopup(editPopup);
// }

// единый обработчик всех форм
function formsHandler(form) {
   if (form.getAttribute('name') == 'editForm') {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closePopup();
   }
   else {
    const userCard = {
      place: inputPlace.value,
      link: inputLink.value
    };
  
    elements.prepend(createCard(userCard));
    addPopupForm.reset();
    toggleButtonState(Array.from(form.querySelectorAll('.popup__input')), form.querySelector('.popup__submit'));
    closePopup();
   }
}

// обработчик формы создания карточек

// function addFormHandler (evt) {
//   evt.preventDefault();

//   const userCard = {
//     place: inputPlace.value,
//     link: inputLink.value
//   };

//   elements.prepend(createCard(userCard));
//   addPopupForm.reset();
//   closePopup(addPopup);
// }

// открытие/закрытие попапов
function openPopup(popup, overlay) {
  popup.classList.add('popup_opened');
  overlay.classList.add('overlay_opened');
  // закрытые попапов по нажатию на Esc
  document.body.addEventListener('keydown', closePopupWithEscHandler);
}

function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove('popup_opened');
  })
  overlays.forEach((overlay) => {
    overlay.classList.remove('overlay_opened');
  })
  document.body.removeEventListener('keydown', closePopupWithEscHandler);
}

function closePopupWithEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

// создание карточки
function createCard(item) {
  const elementTemplate = document.querySelector('.element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  const likeButton = element.querySelector('.element__like-button');
  const deleteButton = element.querySelector('.element__delete-button');

  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');

  elementImage.src = item.link;
  elementImage.alt = 'фото места';
  elementTitle.textContent = item.place;

  likeButton.addEventListener('click', function() { // лайк
    likeButton.classList.toggle('element__active-like-icon');
  })

  deleteButton.addEventListener('click', function() { // удаление карточки
    deleteButton.closest('.element').remove();
  })

  element.querySelector('.element__image').addEventListener('click', function () {// открытие попапа
    imagePopupTitle.textContent = item.place;
    imagePopupPic.src = item.link;
    openPopup(imagePopup, imagePopupOverlay);
  });

  return element;
}


// карточки из массива при загрузке страницы
initialCards.forEach((arrElement) => {
  elements.prepend(createCard(arrElement));
})


// ** СЛУШАТЕЛИ **

// кнопка редактирования
editButton.addEventListener('click', function () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;

    openPopup(editPopup, editPopupOverlay);
  });

// кнопка добавления карточки
addButton.addEventListener('click', () => {
    openPopup(addPopup, addPopupOverlay);
  });

// кнопки закрытия попапов
addPopupCloseButton.addEventListener('click', () => closePopup());
editPopupCloseButton.addEventListener('click', () => closePopup());
imagePopupCloseButton.addEventListener('click', () => closePopup());

// оверлеи
overlays.forEach((overlay) => {
  overlay.addEventListener('click', () => closePopup())
})



