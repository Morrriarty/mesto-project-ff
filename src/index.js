import './pages/index.css'; 
import { createCard, toggleLike } from './components/card.js'; 
import { openPopup, closePopup } from './components/modal.js'; 
import { getInitialCards, getUserInfo, updateUserProfile, updateAvatar, addNewCard, deleteCardFromServer } from './components/api.js'; 
import { enableValidation, clearValidation, toggleButtonState } from './components/validation.js'; 

let currentUserId;

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const imagePopup = document.querySelector('.popup_type_image');
const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');

// Открытие попапа изображения
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Кнопки и другие элементы интерфейса
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const closeButtons = document.querySelectorAll('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const descriptionInput = formEditProfile.elements['description'];

const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];

const formEditAvatar = document.forms['edit-avatar'];
const avatarLinkInput = formEditAvatar.elements['avatar-link'];

let cardToDelete = null;
const deleteConfirmButton = confirmDeletePopup.querySelector('.popup__button');

const scrollButton = document.querySelector('.scroll-to-top')

// Включение валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  invalidButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

// Получение данных пользователя и загрузка карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;

    // Отрисовка карточек в обратном порядке
    cards.reverse().forEach(renderCard);
  })
  .catch(err => {
    console.error(`Ошибка при загрузке данных: ${err}`);
  });

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);

  const submitButton = formEditProfile.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(formEditProfile, submitButton, validationConfig);

  openPopup(editProfilePopup);
});

// Открытие попапа добавления новой карточки
addNewCardButton.addEventListener('click', () => {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openPopup(newCardPopup);
});


// Открытие попапа редактирования аватара
avatarEditButton.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(avatarEditPopup);
});

// Сохранение изменений в профиле
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  submitButton.textContent = 'Сохранение...';

  if (!formEditProfile.checkValidity()) {
    // Если форма невалидна, не продолжаем выполнение кода
    return;
  }

  updateUserProfile(nameInput.value, descriptionInput.value)
    .then((updatedUserInfo) => {
      profileName.textContent = updatedUserInfo.name;
      profileDescription.textContent = updatedUserInfo.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

// Добавление новой карточки
formNewCard.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  submitButton.textContent = 'Сохранение...';

  if (!formNewCard.checkValidity()) {
    // Если форма невалидна, не продолжаем выполнение кода
    return;
  }

  addNewCard(placeNameInput.value, linkInput.value)
    .then((createdCard) => {
      renderCard(createdCard);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

// Обновление аватара
formEditAvatar.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  submitButton.textContent = 'Сохранение...';

  if (!formEditAvatar.checkValidity()) {
    // Если форма невалидна, не продолжаем выполнение кода
    return;
  }

  updateAvatar(avatarLinkInput.value)
    .then((updatedUserInfo) => {
      profileAvatar.style.backgroundImage = `url(${updatedUserInfo.avatar})`;
      closePopup(avatarEditPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

// Отображение карточки
function renderCard(cardElement) {
  const card = createCard(cardElement, { handleCardClick, currentUserId, openConfirmDeletePopup });
  cardsContainer.prepend(card);
}

// Закрытие попапов
closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

// Открытие попапа с изображением
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
}

// Открытие попапа подтверждения удаления карточки
function openConfirmDeletePopup(cardElement, cardId) {
  cardToDelete = { cardElement, cardId };
  openPopup(confirmDeletePopup);
}

// Удаление карточки после подтверждения
confirmDeletePopup.addEventListener('submit', (event) => {
  event.preventDefault();

  if (cardToDelete) {
    deleteConfirmButton.textContent = 'Удаление...';
    deleteCardFromServer(cardToDelete.cardId)
      .then(() => {
        cardToDelete.cardElement.remove();
        cardToDelete = null;
        closePopup(confirmDeletePopup);
      })
      .catch(err => {
        console.error(`Ошибка при удалении карточки: ${err}`);
      })
      .finally(() => {
        deleteConfirmButton.textContent = 'Да';
      });
  }
});


// Функция для плавного скроллинга наверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Обработка события прокрутки страницы для отображения кнопки
window.addEventListener('scroll', function() {
  scrollButton;
  
  if (window.scrollY > 300) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  scrollButton;
  
  scrollButton.addEventListener('click', scrollToTop);
});
