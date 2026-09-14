// Функция для получения начала следующего дня
export function startOfTomorrow(date = new Date()) {
    const tomorrow = new Date(date)

    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    return tomorrow
}
