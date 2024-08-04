// Функция для обработки лайка карточки
export function toggleLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
  }
  
  // Функция удаления карточки
  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  // Функция создания карточки
  export function createCard(element, { handleCardClick, likeHandler }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardElement.querySelector('.card__title').textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
  
    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
    });
  
    // Обработчик клика по изображению
    cardImage.addEventListener('click', () => {
      handleCardClick(element.name, element.link);
    });
  
    // Обработчик лайка карточки
    likeButton.addEventListener('click', likeHandler);
  
    return cardElement;
  }
  