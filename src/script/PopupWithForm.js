import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler, isLoading) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this.popup.querySelector('.popup__form');
        this._isLoading = isLoading;
    }

    // получить значения инпутов
    _getInputValues() {
        // объект значений инпутов
        const inputsValues = {};
        // создаем массив всех инпутов формы
        const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        // каждый инпут из массива
        inputs.forEach(input => {
            // записываем значение инпута в объект
            inputsValues[input.name] = input.value;
        });
        //возвращаем итоговый объект
        return inputsValues;
    }

    // установить слушатели
    setEventListeners() {
        // слушатели из материнского класса 
        super.setEventListeners();
        // + при сабмите формы
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            // включаем загрузку
            this._isLoading(true, this.popup)
            // обрабатываем сабмит
            this._submitHandler(this._getInputValues());
        })
    }

    // закрыть попап
    close() {
        this._form.reset();
        super.close();
    }
}

