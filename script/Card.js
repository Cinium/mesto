

export default class Card {
    constructor(data, templateSelector, openImagePopup) {
        this._text = data.place;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._titleElement = this._element.querySelector('.element__title');
        this._imageElement =this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this._setEventListeners();
      
        this._imageElement.src = this._link;
        this._imageElement.alt = 'фото места';
        this._titleElement.textContent = this._text;
      
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
          this._handleLikeButton();
        });
        // слушатель кнопки удаления карточки
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteButton();
        });
        // слшуатель нажатия на картинку 
        this._imageElement.addEventListener('click', () => {
          this._openImagePopup(this._text, this._link);
        })
      }
      
      // обработчик лайка
      _handleLikeButton() {
        this._likeButton.classList.toggle('element__active-like-icon');
      }
       // обработчик кнопки удаления
      _handleDeleteButton() {
        this._element.remove();
      }
}
