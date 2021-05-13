import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this.popup.querySelector('.popup__image');
        this._popupTitle = this.popup.querySelector('.popup__image-title')
    }

    open(text, link) {
        this._popupImage.src = link;
        this._popupTitle.textContent = text;

        super.open();
    }
}