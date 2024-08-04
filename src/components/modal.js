// Функция для открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEsc);
  }
  
  // Функция для закрытия попапа
  export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keydown', closePopupOnEsc);
  }
  
  // Функция для закрытия попапа при нажатии на клавишу Esc
  export function closePopupOnEsc(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  // Функция открытия попапа с изображением
  export function handleCardClick(name, link) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(imagePopup);
  }
  