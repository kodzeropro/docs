import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './style.css'
import SupportEmail from '../components/SupportEmail.vue'
import IconAlfa from '../components/IconAlfa.vue'
import IconBeta from '../components/IconBeta.vue'
import AuthorQuote from '../components/AuthorQuote.vue'
import CrossLink from '../components/CrossLink.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }: EnhanceAppContext) {
        // Регистрируем глобальный компонент
        app.component('SupportEmail', SupportEmail)
        app.component('IconAlfa', IconAlfa)
        app.component('IconBeta', IconBeta)
        app.component('AuthorQuote', AuthorQuote)
        app.component('CrossLink', CrossLink)
    }
}
