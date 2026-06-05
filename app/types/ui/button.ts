export const BUTTON_VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
} as const

export type ButtonVariant =
  typeof BUTTON_VARIANT[keyof typeof BUTTON_VARIANT]

export const BUTTON_NATIVE_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const

export type ButtonNativeType =
  typeof BUTTON_NATIVE_TYPE[keyof typeof BUTTON_NATIVE_TYPE]
