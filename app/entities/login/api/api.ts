import type { RegisterPayload } from '../types/types'

export async function register(body: RegisterPayload) {
    return await $fetch('/api/internal/auth/register', {
        method: 'POST',
        body
    })
}