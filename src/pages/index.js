import './index.css';
import Api from '../script/Api.js'
import Card from '../script/Card.js';
import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import UserInfo from '../script/UserInfo.js';
import PopupWithForm from '../script/PopupWithForm.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithSubmit from '../script/PopupWithSubmit';
import {config,
        editPopup,
        addPopup,
        submitPopup,
        avatarPopup,
        addPopupForm,
        editPopupForm,
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
        avatarButton} from '../script/utils/constants.js'




// *** КЛАССЫ ***

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '4a0fd5ed-f833-4b54-9a45-07d1e986c1d5'
});

// попап с картинкой
const popupWithImage = new PopupWithImage(imagePopupSelector);
// попап с формой редактирования профиля
const popupWithEditForm = new PopupWithForm(editPopupSelector, editFormHandler);
// попап с формой добавления карточки
const popupWithAddForm = new PopupWithForm(addPopupSelector, addFormHandler);
// попап с формой обновления аватарки
const popupWithAvatarForm = new PopupWithForm(avatarPopupSelector, changeAvatarFormHandler);
// попап с подтверждением
const popupWithSubmit = new PopupWithSubmit(submitPopupSelector, confirmCardDeletion);

// информация профиля
const userInfo = new UserInfo('.profile__user-name', '.profile__user-job', '.profile__user-pic');

// валидация формы добавления карточки
const addFormValidation = new FormValidator(config, addPopupForm);
// валидация формы редактирования
const editFormValidation = new FormValidator(config, editPopupForm);
// валидация формы обновления аватаро4ки
const avatarFormValidation = new FormValidator(config, avatarPopupForm);

// карточки на странице
const cardList = new Section({
renderer: (item) => {
    renderCard(item)
    },
  },
  elementsSelector
);




// *** ОБРАБОТЧИКИ ***

// обработчик формы изменения профиля
function editFormHandler (inputsValues) {
  // отправить новые значения на сервер
  api.patchUserInfo(inputsValues)
    .then(() => {
      // изменить значения на странице
      userInfo.setUserInfo(inputsValues);
      // закрыть попап
      popupWithEditForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      // остановить загрузку
      isLoading(false, editPopup);
    })
}


// обработчик формы создания карточек
function addFormHandler (inputsValues) {
  isLoading(true, addPopup)
  // запостить карточку на сервер
  api.postCard(inputsValues)
    .then(data => {
      // отрендерить с полученными данными
      renderCard ({
        name: data.name,
        link: data.link,
        _id: data._id,
        owner: data.owner,
        likes: data.likes
      })
      // сбросить поля формы
      addPopupForm.reset();
      // кнопочку выключить, ошибки убрать
      addFormValidation.toggleButtonState();
      // закрыть попап
      popupWithAddForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      // остановить загрузку
      isLoading(false, addPopup);
    })
}


// рендерер карточек
function renderCard (cardData) {
  // новый экземпляр карточки
  const card = new Card(cardData, // данные карточки
                        elementTemplateSelector, // темплейт селектор
                        userInfo.getUserId(), // АйДи текущего пользователя
                        handleCardClick, // обработчик клика на пикчу
                        handleDeleteButton, // обработчик удаления
                        api)

  // сгенерировать то, что получилось выше
  const cardElement = card.generateCard();
  // вствить карточку в разметку
  cardList.addItem(cardElement);
}


// обработчик нажатия на картинку
function handleCardClick(text, link) {
  popupWithImage.open(text, link)
}


// обработчик изменения аватарки
function changeAvatarFormHandler (inputValue) {
  isLoading(true, avatarPopup)
  // отправить запрос на сервер
  api.patchUserPic(inputValue.link)
    .then(() => {
      // изменить аватарку на странице
      userInfo.setUserAvatar(inputValue.link);
      // закрыть попап
      popupWithAvatarForm.close()
      // остановить загрузку
      isLoading(false, avatarPopup);
    })
    .catch(err => console.log(err))
}


// обработчик кнопки удаления карточки
function handleDeleteButton(cardId, cardElement) {
  // открыть попап подтверждения действия
  popupWithSubmit.open(cardId, cardElement);
}




// *** ФУНКЦИИ ***

// подтвердить удаление карточки
function confirmCardDeletion(cardId, cardElement) {
  isLoading(true, submitPopup)
  // сообщить серверу о своем решении
  api.deleteCard(cardId)
    .then(() => {
      // удалить карточку из разметки
      cardElement.remove()
      // закрыть попап подтверждения
      popupWithSubmit.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      isLoading(false, submitPopup)
    })
}


// загружается?
function isLoading(loading, popup) {
  if (loading) {
    popup.querySelector('.popup__submit').textContent = 'Сохранение...';
  } else {
    if (popup.classList.contains('popup-add')) {
      popup.querySelector('.popup__submit').textContent = 'Создать';
    } 
    else if (popup.classList.contains('popup-submit')) {
      popup.querySelector('.popup__submit').textContent = 'Да';
    }
    else {
      popup.querySelector('.popup__submit').textContent = 'Сохранить';
    }
  }
}




// *** СЛУШАТЕЛИ ***

// слушатель нажатия на кнопку редактирования
editButton.addEventListener('click', () => {
  // получаем имеющуюся информацию о пользователе 
  const info = userInfo.getUserInfo();
  // вставляем ее в инпуты
  inputName.value = info.name;
  inputJob.value = info.about;
  // сбросить ошибки
  editFormValidation.resetValidation();
  // открываем попыт
  popupWithEditForm.open();
});

// слушатель нажатия на кнопку добавления карточки
addButton.addEventListener('click', () => popupWithAddForm.open());

// слушатель нажатия на кнопку изменения аватарки
avatarButton.addEventListener('click', () => popupWithAvatarForm.open())



// *** МАХИНАЦИИ С МЕТОДАМИ КЛАССОВ ***

// добавить слушателей событий на попап с картинкой
popupWithImage.setEventListeners();
// добавить слушателей событий на попап с формой редактирования
popupWithEditForm.setEventListeners();
// добавить слушателей событий на попап с формой добавления карточки
popupWithAddForm.setEventListeners();
// добавить слушателей событий на попап с формой подтверждения
popupWithSubmit.setEventListeners()
// добавить слушателей событий на попап с формой обновления аватарки
popupWithAvatarForm.setEventListeners();


// включить валидацию формы добавления карточки
addFormValidation.enableValidation();
// включить валидацию формы редактирования
editFormValidation.enableValidation();
// включить валидацию формы обновления аватарки
avatarFormValidation.enableValidation();



Promise.all([api.getUserData(), api.getInitialCards()])
  .then(values => {
    // получить информацию о пользователе
    const userData = values[0]
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      id: userData._id
    })
    userInfo.setUserAvatar(userData.avatar)

    // рендеринг набора карточек
    cardList.renderItems(values[1])
  })
  .catch(err => console.log(err))