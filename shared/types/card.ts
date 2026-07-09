export interface ICardCreate {
  id?: string,
  front: string, 
  back: string,
  deckId: string
}

export type ICardUpdate = Partial<ICardCreate>

export type CardStatus = 'NEW' | 'LEARNING' | 'REVIEW'

export type ICard = {
  id: string,
  front: string,
  back: string,
  dueAt: Date, 
  status: string,
  intervalDays: number,
  easeFactor: number,
  repetitions: number, 
  lapses: number,
  createdAt: Date,
}

export type CardKnowledgeLevel = 'unknown' | 'weak' | 'medium' | 'good' | 'strong'

export type ICardList = Omit<ICard, 
  'intervalDays' | 
  'easeFactor' | 
  'repetitions' | 
  'lapses' | 
  'dueAt' |
  'createdAt'
  > & {
  knowledgeScore: number,
  dueAt: string,
  createdAt: string,
}