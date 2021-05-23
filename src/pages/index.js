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
        profileAvatar} from '../script/utils/constants.js'




// *** КЛАССЫ ***

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '4a0fd5ed-f833-4b54-9a45-07d1e986c1d5'
});

// попап с картинкой
const popupWithImage = new PopupWithImage(imagePopupSelector);
// попап с формой редактирования профиля
const popupWithEditForm = new PopupWithForm(editPopupSelector, editFormHandler, isLoading);
// попап с формой добавления карточки
const popupWithAddForm = new PopupWithForm(addPopupSelector, addFormHandler, isLoading);
// попап с формой обновления аватарки
const popupWithAvatarForm = new PopupWithForm(avatarPopupSelector, changeAvatarFormHandler, isLoading);
// попап с подтверждением
const popupWithSubmit = new PopupWithSubmit(submitPopupSelector);

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
    .catch(err => console.log(err))
  // изменить значения на странице
  userInfo.setUserInfo(inputsValues);
  // закрыть попап
  popupWithEditForm.close();
  // остановить загрузку
  isLoading(false, editPopup);
}


// обработчик формы создания карточек
function addFormHandler (inputsValues) {
  // запостить карточку на сервер
  api.postCard(inputsValues)
    .then(res => res.json())
    .then(data => {
      // отрендерить с полученными данными
      renderCard ({
        name: data.name,
        link: data.link,
        _id: data._id,
        owner: data.owner,
        likes: data.likes
      })
    })
    .catch(err => console.log(err))
  // сбросить поля формы
  addPopupForm.reset();
  // кнопочку выключить, ошибки убрать
  addFormValidation.toggleButtonState();
  // закрыть попап
  popupWithAddForm.close();
  // остановить загрузку
  isLoading(false, addPopup);
}


// рендерер карточек
function renderCard (cardData) {
  // новый экземпляр карточки
  const card = new Card(cardData, // данные карточки
                        elementTemplateSelector, // темплейт селектор
                        userInfo.getUserId(), // АйДи текущего пользователя
                        handleCardClick, // обработчик клика на пикчу
                        handleDeleteButton, // обработчик удаления
                        handleLikeButton, // обработчик лайка
                        isLiked); // проверка на лайк

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
  // отправить запрос на сервер
  api.patchUserPic(inputValue.link)
    .catch(err => console.log(err))
  // изменить аватарку на странице
  profileAvatar.src = inputValue.link;
  // закрыть попап
  popupWithAvatarForm.close()
  // остановить загрузку
  isLoading(false, avatarPopup);
}


// обработчик кнопки удаления карточки
function handleDeleteButton(cardId, cardElement) {
  // открыть попап подтверждения действия
  popupWithSubmit.open();
  // при нажатии на кнопку подтверждения
  submitPopupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // удалить карточку
    confirmCardDeletion(cardId, cardElement);
  })
}


// обработчик кнопки лайка
function handleLikeButton(likeButton, cardData, likesAmount) {
  //если карточка уже лайкнута
  if (isLiked(cardData)) {
    // удаляем класс "активной кнопки" лайка
    likeButton.classList.remove('element__active-like-icon');
    // отправляем запрос снятия лайка на сервер
    api.deleteLikeFromCard(cardData._id)
      .then(res => res.json())
      .then(data => {
        // ставим обновленное количество лайков из пришедшей даты
        likesAmount.textContent = data.likes.length;
      })
      .catch(err => console.log(err))
  // если лайка еще нет
  } else {
    // активируем активную иконку
    likeButton.classList.add('element__active-like-icon');
    // отправляем лайк на сервер
    api.putLikeOnCard(cardData._id)
      .then(res => res.json())
      .then(data => {
        // ставим обновленное количество лайков из пришедшей даты
        likesAmount.textContent = data.likes.length;
      })
      .catch(err => console.log(err))
  }
}




// *** ФУНКЦИИ ***

// подтвердить удаление карточки
function confirmCardDeletion(cardId, cardElement) {
  // сообщить серверу о своем решении
  api.deleteCard(cardId)
    .catch(err => console.log(err))
  // удалить карточку из разметки
  cardElement.remove()
  // закрыть попап подтверждения
  popupWithSubmit.close();
}


// есть ли лайк пользователя на карточке
function isLiked(cardData) {
  // АйДи текущего пользователя
  const userId = userInfo.getUserId()
  let hasLike = false
  // проходимся по каждому лайкнувшему карточку
  cardData.likes.forEach(likedUser => {
    let valuesArr = Object.values(likedUser)
    // если содержит АйДи пользователя
    if (valuesArr.includes(userId)) {
      // значит карточка уже лайканая
      hasLike = true
    }
  })
  return hasLike;
}


// загружается?
function isLoading(loading, popup) {
  if (loading) {
    popup.querySelector('.popup__submit').textContent = 'Сохранение...';
  } else {
    if (popup.classList.contains('popup-edit') || (popup.classList.contains('popup-avatar'))) {
      popup.querySelector('.popup__submit').textContent = 'Сохранить';
    } else {
      popup.querySelector('.popup__submit').textContent = 'Создать';
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


// рендеринг набора карточек
api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data)
  })
  .catch((err) => console.log(`Ошибка получения карточек: ${err}`))


// получить информацию о пользователе
api.getUserData()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      id: data._id
    })
    userInfo.setUserAvatar(data.avatar)
  })
  .catch((err) => console.log(`Ошибка получения данных пользователя: ${err}`))