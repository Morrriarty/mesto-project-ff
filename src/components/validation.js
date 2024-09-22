// Функция для отображения ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  
  // Проверка, что элемент ошибки существует
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  } else {
    console.error(`Элемент ошибки для поля ${inputElement.name} не найден.`);
  }
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    console.error(`Элемент ошибки для поля ${inputElement.name} не найден.`);
  }
}

// Проверка валидности поля
function isValid(formElement, inputElement, config) {
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Разрешаем только буквы, дефисы и пробелы

  // Проверка пустого поля
  if (inputElement.value.trim() === '') {
    showInputError(formElement, inputElement, 'Заполните это поле.', config);
    return false;
  }

  // Проверка поля "Название" в форме "Новое место"
  if (inputElement.name === 'place-name' && !namePattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы', config);
    return false;
  }

  // Проверка полей "Имя" и "О себе"
  if ((inputElement.name === 'name' || inputElement.name === 'description') && !namePattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы', config);
    return false;
  }

  // Проверка стандартной валидации HTML5
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return false;
  }

  // Если всё корректно, убираем ошибки
  hideInputError(formElement, inputElement, config);
  return true;
}

// Функция для изменения стиля кнопки при ошибке или пустых полях
function applyButtonStyle(buttonElement, isFormEmpty, isFormValid) {
  if (isFormEmpty) {
    // Если форма полностью пуста, кнопка прозрачная
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.classList.remove('popup__button_invalid');
  } else if (!isFormValid) {
    // Если есть ошибка валидации, кнопка серая
    buttonElement.classList.add('popup__button_invalid');
    buttonElement.classList.remove('popup__button_disabled');
  } else {
    // Если форма валидна, кнопка черная и активная
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.classList.remove('popup__button_invalid');
  }
}

// Логика для управления состоянием кнопки в зависимости от валидации
export function toggleButtonState(formElement, buttonElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const isValidForm = inputList.every((input) => input.validity.valid); // Проверяем встроенную валидацию браузера
  const isFormEmpty = inputList.every((input) => input.value.trim() === '');

  buttonElement.disabled = !isValidForm; // Делаем кнопку активной, если форма валидна
  applyButtonStyle(buttonElement, isFormEmpty, isValidForm);
}

// Установка обработчиков на поля формы
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

// Очистка ошибок валидации при открытии попапа
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = true;
  applyButtonStyle(buttonElement, true, false); // Применение стиля для пустой формы при открытии
}
