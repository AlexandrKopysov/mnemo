export function pluralRu(value: number, forms: readonly [string, string, string]): string {
    const count = Math.abs(value) % 100
    if (count >= 11 && count <= 14) return forms[2]
    const last = count % 10
    if (last === 1) return forms[0]
    if (last >= 2 && last <= 4) return forms[1]
    return forms[2]
}
