//template
const cardTemplate = document.querySelector('#card-template').content;

//type of DOM
const container = document.querySelector('.content'); //класс <main>
const cardsContainer = container.querySelector('.places__list');

//add card function
function createCard(element) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;

//event handler
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    })
    return cardElement;
}
//array render function
function renderCard(cardElement) {
    cardsContainer.append(createCard(cardElement));
}

initialCards.forEach(cardElement => {
    renderCard(cardElement);
});

//remove card function
function deleteCard(cardElement) {
        cardElement.remove();
}



