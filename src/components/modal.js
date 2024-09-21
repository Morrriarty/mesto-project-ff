// Функция для открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('mousedown', closePopupOnOverlay);

  setTimeout(() => {
    popup.classList.add('popup_visible');
  }, 10);
}

// Функция для закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('mousedown', closePopupOnOverlay); // Убираем обработчик клика на оверлей при закрытии попапа
}

// Функция для закрытия попапа при нажатии клавиши Esc
export function closePopupOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция для закрытия попапа при клике на оверлей
export function closePopupOnOverlay(event) {
  // Проверяем, что клик был сделан на оверлей, а не на содержимое попапа
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}
