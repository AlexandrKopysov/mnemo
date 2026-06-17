import type { IDeck } from "@shared/types"

export function calculatePercentForDeck(decks: IDeck[]) {
  let newDeckList: IDeck[] = []

  //TO-DO
  //Здесь будет рассчет процента выполнения колоды на основе количества запомненных карточек

  newDeckList = decks.map((deck) => {
    return {
      id: deck.id,
      title: deck.title,
      description: deck.description,
      // Процент выполнения записываем в это поле
      percentCompleet: 75,
      // Всего карточек в этой деке
      total: 25
    }
  })

  return newDeckList
}
