//template
const cardTemplate = document.querySelector('#card-template').content;
//type of DOM
const container = document.querySelector('.content'); //класс <main>
const cardsContainer = container.querySelector('.places__list');
//add card function
function createCard(deleteCard) {
    initialCards.forEach(function (element) {
        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        const deleteButton = cardElement.querySelector('.card__delete-button');
        cardElement.querySelector('.card__title').textContent = element.name;
        cardElement.querySelector('.card__image').src = element.link;
        cardElement.querySelector('.card__image').alt = element.name;
        cardsContainer.append(cardElement);
        deleteButton.addEventListener('click', () => {
            deleteCard(cardElement);
        });
    return cardElement;
})}
//remove card function
function deleteCard(cardElement) {
        cardElement.remove();
}
//display on page
createCard(deleteCard);

