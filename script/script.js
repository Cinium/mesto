// попапы
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-image');

// формы
const editPopupForm = editPopup.querySelector('.popup__container');
const addPopupForm = addPopup.querySelector('.popup__container');

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

// массив стандартных карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// карточки из массива при загрузке страницы
  const cardList = initialCards.forEach(function (item) {
      const elementTemplate = document.querySelector('.element-template').content;
      const element = elementTemplate.querySelector('.element').cloneNode(true);
      const likeButton = element.querySelector('.element__like-button');
      const deleteButton = element.querySelector('.element__delete-button');

      
      element.querySelector('.element__image').src = item.link;
      element.querySelector('.element__title').textContent = item.name;

      elements.prepend(element);

      likeButton.addEventListener('click', function() { // тоггл лайка
        likeButton.classList.toggle('element__active-like-icon');
      })

      deleteButton.addEventListener('click', function() { // удаление карточки
        deleteButton.closest('.element').remove();
      })

      element.querySelector('.element__image').addEventListener('click', function () {  // открытие попапа стандартной карточки
        imagePopupTitle.textContent = item.name;
        imagePopupPic.src = item.link;
        return togglePopup(imagePopup);
      });
    });

// функции
function editFormHandler (evt) {  //изменение профиля
    evt.preventDefault();

    profileName.textContent = userName.value;
    profileJob.textContent = userJob.value;

    togglePopup(editPopup);
}

//добавление карточки
function addFormHandler (evt) {
  evt.preventDefault();
  
  const elementTemplate = document.querySelector('.element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const likeButton = element.querySelector('.element__like-button');
  const deleteButton = element.querySelector('.element__delete-button');


  element.querySelector('.element__image').src = userLink.value;
  element.querySelector('.element__title').textContent = userPlace.value;
  elements.prepend(element);
  
  togglePopup(addPopup);

  likeButton.addEventListener('click', function() { // тоггл лайка
    likeButton.classList.toggle('element__active-like-icon');
  })

  deleteButton.addEventListener('click', function() { // удаление карточки
    deleteButton.closest('.element').remove();
  })

  element.querySelector('.element__image').addEventListener('click', function () {
      imagePopupTitle.textContent = element.textContent;  // открытие попапа добавленной карточки
      imagePopupPic.src = userLink.value;
      return togglePopup(imagePopup);
    });
}


function togglePopup(popupType) {  // открытие/закрытие попапов
  popupType.classList.toggle('popup_opened');
}

function toggleLike(like) {
  like.classList.toggle('popup__like-button_active');
}

// слушатели
editButton.addEventListener('click', function () {  // кнопка редактирования
    userName.value = profileName.textContent;
    userJob.value = profileJob.textContent;

    return togglePopup(editPopup);
  });

addButton.addEventListener('click', function () {  //  кнопка добавления карточки
    userLink.value = '';
    userPlace.value = '';

    return togglePopup(addPopup);
  });


addPopupCloseButton.addEventListener('click', () => togglePopup(addPopup));
editPopupCloseButton.addEventListener('click', () => togglePopup(editPopup));
imagePopupCloseButton.addEventListener('click', () => togglePopup(imagePopup));

editPopupForm.addEventListener('submit', editFormHandler);
addPopupForm.addEventListener('submit', addFormHandler);

