const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

function enableValidation(config) {
    // список всех форм в документе
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // на каждую форму повесим слушатель сабмита
    formList.forEach(form => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (form.getAttribute('name') == 'editForm') { 
          editFormHandler(form, config);
         } 
         else {
          addFormHandler(form, config);
         }
      });
      inputsEventListeners(form, config);
    });
}

// создание слушателей инпутов
function inputsEventListeners(form, config) {
    // кнопка сабмита
    const submitButton = form.querySelector(config.submitButtonSelector);
    // список всех инпутов в форме
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    toggleButtonState(inputList, submitButton, config)

    // // на каждый инпут повесим слушателя ввода
    inputList.forEach(input => {
        input.addEventListener('input', e => {
            // проверяем валидность поля ввода
            checkInputValidity(form, input, config);
            // активируем/деактивируем кнопку
            toggleButtonState(inputList, submitButton, config)
        });
    })
}

// проверка инпута на валидность
function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
        hideInputError(form, input, config);
    }
    else {
        showInputError(form, input, input.validationMessage, config);
    }
}


// показать ошибку инпута
function showInputError(form, input, errorMessage, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
  
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  
  //скрыть ошибку инпута
  function hideInputError(form, input, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
  
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  }

// изменение состояния кнопки сабмита
function toggleButtonState(inputList, button, config) {
  
    if (!checkFormValidity(inputList)) {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
    }
    else {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    }
  }

  // проверка формы на валидность
function checkFormValidity(inputList) {
    return inputList.every(input => input.validity.valid);
  }



enableValidation(config);