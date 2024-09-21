// Показать сообщение об ошибке валидации
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Скрыть сообщение об ошибке валидации
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// Проверка валидности ввода
function isValid(formElement, inputElement, config) {
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (inputElement.value.trim() === '') {
    showInputError(formElement, inputElement, 'Заполните это поле.', config);
    return false;
  }

  if (inputElement.name === 'place-name' && !namePattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, 'Разрешены только буквы, дефисы и пробелы', config);
    return false;
  }

  if ((inputElement.name === 'name' || inputElement.name === 'description') && !namePattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, 'Разрешены только буквы, дефисы и пробелы', config);
    return false;
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return false;
  }

  hideInputError(formElement, inputElement, config);
  return true;
}

// Стилизация кнопки отправки формы
function applyButtonStyle(buttonElement, isFormEmpty, isFormValid) {
  if (isFormEmpty) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.classList.remove('popup__button_invalid');
  } else if (!isFormValid) {
    buttonElement.classList.add('popup__button_invalid');
    buttonElement.classList.remove('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.classList.remove('popup__button_invalid');
  }
}

// Включение/выключение состояния кнопки отправки
export function toggleButtonState(formElement, buttonElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const isValidForm = inputList.every((input) => input.validity.valid);
  const isFormEmpty = inputList.every((input) => input.value.trim() === '');

  buttonElement.disabled = !isValidForm;
  applyButtonStyle(buttonElement, isFormEmpty, isValidForm);
}

// Установка слушателей событий на форму
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(formElement, input, config);
      toggleButtonState(formElement, buttonElement, config);
    });
  });
}

// Включение валидации для всех форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Очистка состояния валидации формы
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = true;
  applyButtonStyle(buttonElement, true, false);
}
