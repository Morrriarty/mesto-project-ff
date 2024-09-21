// Функция для скрытия ошибки валидации
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${config.inputErrorClass}_type_${inputElement.name}`);

  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
}

// Функция для отображения ошибки валидации
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${config.inputErrorClass}_type_${inputElement.name}`);

  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}

// Проверка валидности инпута
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

// Стилизация кнопки отправки
function applyButtonStyle(buttonElement, isFormEmpty, isFormValid, config) {
  if (isFormEmpty) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove(config.errorClass);
  } else if (!isFormValid) {
    buttonElement.classList.add(config.errorClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.remove(config.errorClass);
  }
}

// Тогглинг состояния кнопки отправки
export function toggleButtonState(formElement, buttonElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const isValidForm = inputList.every((input) => input.validity.valid);
  const isFormEmpty = inputList.every((input) => input.value.trim() === '');

  buttonElement.disabled = !isValidForm;
  applyButtonStyle(buttonElement, isFormEmpty, isValidForm, config);
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
  applyButtonStyle(buttonElement, true, false, config);
}
