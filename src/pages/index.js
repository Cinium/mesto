import './index.css';
import Card from '../script/Card.js';
import FormValidator from '../script/FormValidator.js';
import {initialCards} from '../script/utils/initialCards.js';
import Section from '../script/Section.js';
import UserInfo from '../script/UserInfo.js';
import PopupWithForm from '../script/PopupWithForm.js';
import PopupWithImage from '../script/PopupWithImage.js';
import {config,
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
  addButton} from '../script/utils/constants.js'


// *** КЛАССЫ ***

// попап с картинкой
const popupWithImage = new PopupWithImage(imagePopupSelector);
// попап с формой редактирования профиля
const popupWithEditForm = new PopupWithForm(editPopupSelector, editFormHandler);
// попап с формой добавления карточки
const popupWithAddForm = new PopupWithForm(addPopupSelector, addFormHandler);




// информация профиля
const userInfo = new UserInfo('.profile__user-name', '.profile__user-job');

// валидация формы добавления карточки
const addFormValidation = new FormValidator(config, addPopupForm)
// валидация формы редактирования
const editFormValidation = new FormValidator(config, editPopupForm)


// создание изначального набора карточек
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    renderCard(item)
    },
  },
  elementsSelector
);



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
  elementsSelector);

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
  const card = new Card(cards, elementTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}



// *** СЛУШАТЕЛИ ***

// слушатель нажатия на кнопку редактирования
editButton.addEventListener('click', () => {
  // получаем имеющуюся информацию о пользователе 
  const info = userInfo.getUserInfo();
  // вставляем ее в инпуты
  inputName.value = info.name;
  inputJob.value = info.job;

  editFormValidation.resetValidation();
  // открываем попыт
  popupWithEditForm.open();
});

// слушатель нажатия на кнопку добавления карточки
addButton.addEventListener('click', () => {
    popupWithAddForm.open();
});



// *** МАХИНАЦИИ С КЛАССАМИ ***

// добавить слушателей событий на попап с картинкой
popupWithImage.setEventListeners();
// добавить слушателей событий на попап с формой редактирования
popupWithEditForm.setEventListeners();
// добавить слушателей событий на попап с формой добавления карточки
popupWithAddForm.setEventListeners();

// ключить валидацию формы добавления карточки
addFormValidation.enableValidation();
// ключить валидацию формы редактирования
editFormValidation.enableValidation();

// рендеринг изначального набора карточек
cardList.renderItems();