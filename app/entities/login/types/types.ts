type BaseEntity = {
    login: string, 
    password: string
}

export type LoginPayload = BaseEntity

export type RegisterPayload = BaseEntity & {
    repeatPassword: string
}
