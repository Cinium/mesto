// попапы
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-image');

// формы
const editPopupForm = editPopup.querySelector('.popup__form');
const addPopupForm = addPopup.querySelector('.popup__form');

// инпуты
const userName = document.querySelector('.popup__input_type_name');  
const userJob = document.querySelector('.popup__input_type_job');
const userPlace = document.querySelector('.popup__input_type_place');
const userLink = document.querySelector('.popup__input_type_link');

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
function editFormHandler (evt) {
  evt.preventDefault();

  profileName.textContent = userName.value;
  profileJob.textContent = userJob.value;

  closePopup(editPopup);
}

// открытие/закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
    openPopup(imagePopup);
  });

  return element;
}

// обработчик формы создания карточек
function addFormHandler (evt) {
  evt.preventDefault();

  const userCard = {
    place: userPlace.value,
    link: userLink.value
  };

  elements.prepend(createCard(userCard));
  addPopupForm.reset();
  closePopup(addPopup);
}


// ** СЛУШАТЕЛИ **

// кнопка редактирования
editButton.addEventListener('click', function () {
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;

    openPopup(editPopup);
  });

// кнопка добавления карточки
addButton.addEventListener('click', function () {
    openPopup(addPopup);
  });

// кнопки закрытия попапов
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

// подтверждение
editPopupForm.addEventListener('submit', editFormHandler);
addPopupForm.addEventListener('submit', addFormHandler);
