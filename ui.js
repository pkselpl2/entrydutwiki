function createCard(title, value) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <p class="title">${title}</p>
        <p class="value">${value}</p>
    `
    return card;
}
