
export default class Card {
    constructor(data, templateSelector, currentUser, handleCardClick, deleteButtonHandler, likeButtonHandler) {
        this._text = data.name;
        this._link = data.link;
        this._id = data._id;
        this._data = data;
        this._currentUser = currentUser;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._deleteButtonHandler = deleteButtonHandler;
        this._likeButtonHandler = likeButtonHandler;
    }
    // генерация карточки
    generateCard() {
        // получить разметку карточки
        this._element = this._getTemplate();

        // элементы карточки
        this._titleElement = this._element.querySelector('.element__title');
        this._imageElement = this._element.querySelector('.element__image');
        this._likes = this._element.querySelector('.element__like-amount');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        // добавить слушателей на элементы карточки
        this._setEventListeners();

        // вписать значения элементов
        this._imageElement.src = this._link;
        this._imageElement.alt = 'фото';
        this._titleElement.textContent = this._text;

        // если текущий пользователь владелец карточки
        if (this._currentUser === this._data.owner._id) {
          // убрать класс скрывающий кнопку удаления
          this._deleteButton.classList.remove('element__delete-button_hidden');
        }
        // иначе скрыть кнопку
        else {
          this._deleteButton.classList.add('element__delete-button_hidden');
        }

        // если у карточки есть лайки
        if (this._data.likes){
          // отображаем их количество
          this._likes.textContent = this._data.likes.length;
        } else {
          // иначе пишем ноль
          this._likes.textContent = 0;
        }

        // если карточка уже лайкнута пользователем
        if (this.isLiked()) {
          // сделать иконку активной
          this._likeButton.classList.add('element__active-like-icon');
        }
      
        return this._element;
    } 

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
          
        return cardElement;
    }

    // добавить слушатели на карточку
    _setEventListeners() {
        // слушатель кнопки лайка
        this._likeButton.addEventListener('click', () => {
          this._likeButtonHandler(this._likeButton, this._data, this._likes, this.isLiked());
        });
        // слушатель кнопки удаления карточки
        this._deleteButton.addEventListener('click', () => {
          this._deleteButtonHandler(this._id, this._element)

        });
        // слшуатель нажатия на картинку 
        this._imageElement.addEventListener('click', () => {
          this._handleCardClick(this._text, this._link);
        })
    }

    // есть ли лайк пользователя на карточке
    isLiked() {
      let hasLike = false
      // проходимся по каждому лайкнувшему карточку
      this._data.likes.forEach(likedUser => {
        let valuesArr = Object.values(likedUser)
        // если содержит АйДи пользователя
        if (valuesArr.includes(this._currentUser)) {
          // значит карточка уже лайканая
          hasLike = true
        }
      })
      return hasLike;
    }
}
