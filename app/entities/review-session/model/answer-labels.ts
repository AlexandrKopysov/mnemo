import { ANSWER } from '@shared/types/card'

export const ANSWER_LABELS: Record<ANSWER, string> = {
    [ANSWER.HARD]: 'Не вспомнил',
    [ANSWER.NORMAL]: 'Нормально',
    [ANSWER.EASY]: 'Легко',
}
