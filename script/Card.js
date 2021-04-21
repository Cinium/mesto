import openPopup from './script.js'

export default class Card {
    constructor(text, link) {
        this._text = text;
        this._link = link;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
      
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = 'фото места';
        this._element.querySelector('.element__title').textContent = this._text;
      
        return this._element;
      } 

    _getTemplate() {
        // забираем размеку из HTML и клонируем элемент
          const cardElement = document
          .querySelector('.element-template')
          .content
          .querySelector('.element')
          .cloneNode(true);
          
          return cardElement;
      }

      // добавить слушатели на карточку
      _setEventListeners() {
          // слушатель кнопки лайка
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
          this._handleLikeButton();
        });
        // слушатель кнопки удаления карточки
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteButton();
        });
        // слшуатель нажатия на картинку 
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openImagePopupHandler();
        })
      }
      
      // обработчик лайка
      _handleLikeButton() {
        this._element.querySelector('.element__like-button').classList.toggle('element__active-like-icon');
      }
       // обработчик кнопки удаления
      _handleDeleteButton() {
        this._element.querySelector('.element__delete-button').closest('.element').remove();
      }
      // обработчик открытия попапа по нажатию на картинку
      _openImagePopupHandler() {
        document.querySelector('.popup__image-title').textContent = this._text;
        document.querySelector('.popup__image').src = this._link;
        
        openPopup(document.querySelector('.popup-image'));
      }
}
