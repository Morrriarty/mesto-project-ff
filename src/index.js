import icon from './images/add-icon.svg';
import avatar from './images/avatar.jpg';
import card_1 from './images/card_1.jpg';
import card_2 from './images/card_2.jpg';
import card_3 from './images/card_3.jpg';
import close from './images/close.svg';
import del from './images/delete-icon.svg';
import edit from './images/edit-icon.svg';
import active from './images/like-active.svg';
import inactive from './images/like-inactive.svg';
import logo from './images/logo.svg';

const pictures = [
    {name: 'icon', link: icon},
    {name: 'avatar', link: avatar},
    {name: 'card_1', link: card_1},
    {name: 'card_2', link: card_2},
    {name: 'card_3', link: card_3},
    {name: 'close', link: close},
    {name: 'delete', link: del},
    {name: 'edit', link: edit},
    {name: 'active', link: active},
    {name: 'inactive', link: inactive},
    {name: 'logo', link: logo},
];

//импорт стилей
import './pages/index.css';

//import { openPopup, closePopup, initialCards } from './components/modal';

import initialCards from './scripts/cards';
// src/index.js

import { createCard, toggleLike, deleteCard } from './components/card.js';
import { openPopup, closePopup, closePopupOnEsc } from './components/modal.js';

// Получение шаблона карточки
const cardTemplate = document.querySelector('#card-template').content;

// Получение контейнеров для карточек и попапов
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image'); // **Элементы всегда находятся в DOM**

const popupImage = imagePopup.querySelector('.popup__image'); // **Элементы всегда находятся в DOM**
const popupCaption = imagePopup.querySelector('.popup__caption'); // **Элементы всегда находятся в DOM**

// Кнопки открытия попапов
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы формы редактирования профиля
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const descriptionInput = formEditProfile.elements['description'];

// Элементы формы добавления новой карточки
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];

// Обработчики событий для открытия попапов
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

addNewCardButton.addEventListener('click', () => openPopup(newCardPopup));

// Обработчики событий для закрытия попапов
closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

// Закрытие попапов при клике на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

// Функция открытия попапа с изображением
function handleCardClick(name, link) {
  popupImage.src = link; // **Элементы всегда находятся в DOM**
  popupImage.alt = name; // **Элементы всегда находятся в DOM**
  popupCaption.textContent = name; // **Элементы всегда находятся в DOM**
  openPopup(imagePopup); // **Элементы всегда находятся в DOM**
}

// Обработчик «отправки» формы редактирования профиля
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault(); // Отмена стандартной отправки формы

  // Обновление значений профиля
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // Закрытие попапа
  closePopup(editProfilePopup);
});

// Обработчик «отправки» формы добавления новой карточки
formNewCard.addEventListener('submit', (event) => {
  event.preventDefault(); // Отмена стандартной отправки формы

  // Создание новой карточки
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value
  };
  renderCard(newCard);

  // Очистка формы
  formNewCard.reset();

  // Закрытие попапа
  closePopup(newCardPopup);
});

// Функция рендеринга массива карточек
function renderCard(cardElement) {
  cardsContainer.prepend(createCard(cardElement, { handleCardClick, likeHandler: toggleLike }));
}

// Рендеринг начальных карточек
initialCards.forEach(cardElement => {
  renderCard(cardElement);
});
