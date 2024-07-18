// model.js

export function createCard(card) {
    const Card = document.createElement("div");
    Card.classList.add("card");
    if (card.flipped) {
        Card.classList.add("flipped");
    }
    Card.setAttribute("data-id", card.id);
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    
    const img = document.createElement("img");
    img.src = `img/${card.value}.jpg`;
    img.alt = `Image ${card.value}`;
    cardBack.appendChild(img);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    Card.appendChild(cardInner);
    return Card;
}
