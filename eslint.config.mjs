// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier/flat'

export default withNuxt(
    {
        ignores: ['.nuxt/**', '.output/**', 'dist/**', 'coverage/**', 'prisma/generated/**'],
    },
    prettier,
    {
        files: ['**/*.vue'],
        rules: {
            'vue/max-attributes-per-line': ['error', { singleline: 1, multiline: 1 }],
            'vue/first-attribute-linebreak': [
                'error',
                { singleline: 'ignore', multiline: 'below' },
            ],
        },
    },
)
