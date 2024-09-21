import { deleteCardFromServer, addLike, removeLike } from './api.js';

// Функция для переключения лайка
export function toggleLike(event, cardId, likeCountElement, isLiked) {
  const likeButton = event.target;

  if (isLiked) {
    removeLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при снятии лайка: ${err}`);
      });
  } else {
    addLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при постановке лайка: ${err}`);
      });
  }
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

// Функция создания карточки
export function createCard(element, { handleCardClick, currentUserId, openConfirmDeletePopup }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  
  cardElement.querySelector('.card__title').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  likeCount.textContent = element.likes.length;

  if (element.owner && element.owner._id === currentUserId) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => {
      openConfirmDeletePopup(cardElement, element._id);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => {
    handleCardClick(element.name, element.link);
  });

  const isLiked = element.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (event) => {
    toggleLike(event, element._id, likeCount, likeButton.classList.contains('card__like-button_is-active'));
  });

  return cardElement;
}
