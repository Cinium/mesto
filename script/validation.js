// да начнется валидация!
function enableValidation() {
    // список всех форм в документе
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // на каждую форму повесим слушатель сабмита
    formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        // обработчик форм
        formsHandler(form);
      });
      inputsEventListeners(form);
    });
}

// создание слушателей инпутов
function inputsEventListeners(form) {
    // кнопка сабмита
    const submitButton = form.querySelector('.popup__submit');
    // список всех инпутов в форме
    const inputList = Array.from(form.querySelectorAll('.popup__input'));

    toggleButtonState(inputList, submitButton)

    // на каждый инпут повесим слушателя ввода
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            // проверяем валидность поля ввода
            checkInputValidity(form, input);
            // активируем/деактивируем кнопку
            toggleButtonState(inputList, submitButton)
        });
    })
}

// проверка инпута на валидность
function checkInputValidity(form, input) {
    if (input.validity.valid) {
        hideInputError(form, input, input.validationMessage);
    }
    else {
        showInputError(form, input, input.validationMessage);
    }
}


// показать ошибку инпута
function showInputError(form, input, errorMessage) {
    const errorElement = form.querySelector(`.${input.id}-error`);
  
    input.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
  }
  
  //скрыть ошибку инпута
  function hideInputError(form, input) {
    const errorElement = form.querySelector(`.${input.id}-error`);
  
    input.classList.remove('popup__input_error');
    errorElement.textContent = '';
  }

// изменение состояния кнопки сабмита
function toggleButtonState(inputList, button) {
    if (!checkFormValidity(inputList)) {
      button.classList.add('popup__submit_inactive');
      button.disabled = true;
    }
    else {
      button.classList.remove('popup__submit_inactive');
      button.disabled = false;
    }
  }

  // проверка формы на валидность
function checkFormValidity(inputList) {
    return inputList.every(input => input.validity.valid);
  }



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
});