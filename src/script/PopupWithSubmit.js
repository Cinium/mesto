import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor (popupSelector) {
        super(popupSelector)
        // this._submitHandler = submitHandler;
        this._form = this.popup.querySelector('.popup__form');
    }

    setEventListeners () {
        super.setEventListeners();
    }


    setConfirmFunction() {
        
    }
}