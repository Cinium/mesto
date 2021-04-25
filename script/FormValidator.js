
export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }
    
    // включаем валидацию
    enableValidation() {
        this.toggleButtonState();
        this._setEventListeners();
    }

    _setEventListeners() {
        // для каждого инпута из списка инпутов
        this._inputList.forEach((input) => {
            // повесить слушатель ввода, чекающий валидность инпута
            input.addEventListener('input', () => this._checkInputValidity(input));
            // слушатель ввода, переключающий состояние кнопки
            input.addEventListener('input', () => this.toggleButtonState());
        });
        
    }

    // проверка отдельного инпута на валидность 
    _checkInputValidity(input) {
        const errorElement = this._formElement.querySelector(`.${input.id}-error`);

        if (input.validity.valid) {
            this._hideInputError(input, errorElement);
        }
        else {
            this._showInputError(input, errorElement);
        }
    }

    // спрятать сообщение об ошибке
    _hideInputError(input, errorElement) {
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    }
    
    // показать сообщение об ошибке
    _showInputError(input, errorElement) {
        input.classList.add(this._config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }
    
    // переклюение состояния кнопки
    toggleButtonState() {
        const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
        // если НЕ все инпуты валидны, выключается кнопочка
        if (!this._checkFormValidity()) {
            submitButton.classList.add(this._config.inactiveButtonClass);
            submitButton.disabled = true;
          }
        // иначе включается
        else {
            submitButton.classList.remove(this._config.inactiveButtonClass);
            submitButton.disabled = false;
        }
    }
     // проверка ВСЕХ инпутов формы на валидность
    _checkFormValidity() {
        return this._inputList.every(input => input.validity.valid);
    }
}
