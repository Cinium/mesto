import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this.popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputsValues = {};
        const inputs = Array.from(this._form.querySelectorAll('.popup__input'));

        inputs.forEach(input => {
            inputsValues[input.name] = input.value;
        });
        return inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (event) => {
            event.preventDefault()

            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}

