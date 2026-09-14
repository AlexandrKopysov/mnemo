export function formatReviewDate(date: string | Date): string {
    const target = new Date(date)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const targetDay = new Date(target)
    targetDay.setHours(0, 0, 0, 0)

    if (targetDay.getTime() === today.getTime()) {
        return 'сегодня'
    }

    if (targetDay.getTime() === tomorrow.getTime()) {
        return 'завтра'
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    }).format(target)
}
