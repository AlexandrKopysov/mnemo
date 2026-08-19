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
  status: CardStatus,
  lastReviewedAt: Date,
  intervalDays: number,
  easeFactor: number,
  repetitions: number, 
  lapses: number,
  createdAt: Date,
}

export type ReviewCardInput = Pick<
    ICard,
    "intervalDays" | "easeFactor" | "repetitions" | "lapses"
>

export type CardKnowledgeLevel = 'unknown' | 'weak' | 'medium' | 'good' | 'strong'

export type ICardList = Omit<ICard, 
  'intervalDays' | 
  'easeFactor' | 
  'repetitions' | 
  'lapses' | 
  'dueAt' |
  'lastReviewedAt' |
  'createdAt'
  > & {
  knowledgeScore: number,
  dueAt: string,
  createdAt: string,
}

export enum ANSWER {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

export type ICardReview = {
  cardId: string,
  deckId: string,
  answer: ANSWER,
}