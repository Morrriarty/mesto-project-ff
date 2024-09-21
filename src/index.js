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

const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
let cardToDelete = null;
const deleteConfirmButton = confirmDeletePopup.querySelector('.popup__button');

const scrollButton = document.querySelector('.scroll-to-top');

// Объект конфигурации для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',  // Класс для неактивной кнопки
  errorClass: 'popup__button_invalid',  // Класс для отображения ошибки
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

getUserInfo()
  .then(userInfo => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    currentUserId = userInfo._id;

    // Загружаем карточки только после получения информации о текущем пользователе
    getInitialCards()
      .then(cards => {
        cards.forEach(cardElement => {
          renderCard(cardElement);
        });
      })
      .catch(err => {
        console.error(`Ошибка при загрузке карточек: ${err}`);
      });
  })
  .catch(err => {
    console.error(`Ошибка при загрузке информации о пользователе: ${err}`);
  });

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(formEditProfile, validationConfig);

  const submitButton = formEditProfile.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(formEditProfile, submitButton, validationConfig);

  openPopup(editProfilePopup);
});

addNewCardButton.addEventListener('click', () => {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openPopup(newCardPopup);
});

avatarEditButton.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(avatarEditPopup);
});

formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = formEditProfile.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';  // Меняем текст кнопки на "Сохранение..."

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
      submitButton.textContent = 'Сохранить';  // Возвращаем текст кнопки после завершения операции
    });
});

formNewCard.addEventListener('submit', (event) => {
  event.preventDefault();

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value
  };

  const submitButton = formNewCard.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';  // Меняем текст кнопки

  addNewCard(newCard.name, newCard.link)
    .then((createdCard) => {
      renderCard(createdCard);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';  // Возвращаем текст кнопки
    });
});

formEditAvatar.addEventListener('submit', (event) => {
  event.preventDefault();

  const avatarLink = avatarLinkInput.value;
  const submitButton = formEditAvatar.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';  // Меняем текст кнопки

  updateAvatar(avatarLink)
    .then((updatedUserInfo) => {
      profileAvatar.style.backgroundImage = `url(${updatedUserInfo.avatar})`;
      closePopup(avatarEditPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';  // Возвращаем текст кнопки
    });
});

function renderCard(cardElement) {
  const card = createCard(cardElement, { handleCardClick, currentUserId, openConfirmDeletePopup });
  cardsContainer.prepend(card);
}

closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

function handleCardClick(name, link) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
}

// Закрытие попапов по клику на оверлей
document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup') && !event.target.closest('.popup__content')) {
    closePopup(event.target);
  }
});

function openConfirmDeletePopup(cardElement, cardId) {
  cardToDelete = { cardElement, cardId };
  openPopup(confirmDeletePopup);
}

confirmDeletePopup.addEventListener('submit', (event) => {
  event.preventDefault();

  if (cardToDelete) {
    deleteConfirmButton.textContent = 'Удаление...';
    deleteCardFromServer(cardToDelete.cardId)
      .then(() => {
        cardToDelete.cardElement.remove(); // Удаляем карточку с экрана
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

// Функция для прокрутки наверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

scrollButton.addEventListener('click', scrollToTop);

// Показ кнопки при прокрутке страницы
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  scrollButton.addEventListener('click', scrollToTop);
});
