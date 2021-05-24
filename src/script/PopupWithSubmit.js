import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor (popupSelector, confirmHandler) {
        super(popupSelector)
        this._confirmHandler = confirmHandler;
        this._form = this.popup.querySelector('.popup__form');
    }

    setEventListeners () {
        super.setEventListeners();

        this._form.addEventListener('submit', evt => {
            evt.preventDefault();

            this._confirmHandler(this.cardId, this.cardElement)
        })
    }

    open(cardId, cardElement) {
        super.open();
        this.cardId = cardId
        this.cardElement = cardElement
    }
}