function calculatePercentForDeck(decks) {
  let newDeckList = [];
  newDeckList = decks.map((deck) => {
    return {
      id: deck.id,
      title: deck.title,
      description: deck.description,
      // Процент выполнения записываем в это поле
      percentCompleet: 75,
      // Всего карточек в этой деке
      total: 25
    };
  });
  return newDeckList;
}

export { calculatePercentForDeck as c };
//# sourceMappingURL=deck.service.mjs.map
