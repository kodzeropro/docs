import { defineConfig } from 'vitepress'

// Расширяем тип темы для кастомных свойств
declare module 'vitepress' {
    interface ThemeConfig {
        supportEmail?: string
    }
}

export default defineConfig({
    lang: 'ru-RU',
    title: "Kodzero Docs",
    description: "Documentation for my service",
    lastUpdated: true,
    cleanUrls: true,
    base: '/docs/',
    // Глобальные переменные для markdown
    markdown: {
        config: (md) => {
            // Можно добавить плагины
        }
    },
    
    themeConfig: {
        logo: {
            light: '/kodzero-docs-bl.png',
            dark: '/kodzero-docs-wh.png'
        },
        siteTitle: false,
        notFound: {
            title: 'Страница не найдена',
            quote: 'Похоже, вы перешли по неверной ссылке или страница была удалена.',
            linkLabel: 'Перейти на главную',
            linkText: 'На главную'
        },
        outline: {
            level: [2, 3],
            label: 'На этой странице'
        },
        docFooter: {
            prev: 'Предыдущая страница',
            next: 'Следующая страница'
        },
        lastUpdated: {
            text: 'Обновлено'
        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: 'Поиск',
                        buttonAriaLabel: 'Поиск'
                    },
                    modal: {
                        displayDetails: 'Показать подробности',
                        resetButtonTitle: 'Сбросить',
                        backButtonTitle: 'Закрыть',
                        noResultsText: 'Ничего не найдено',
                        footer: {
                            selectText: 'выбрать',
                            selectKeyAriaLabel: 'enter',
                            navigateText: 'навигация',
                            navigateUpKeyAriaLabel: 'стрелка вверх',
                            navigateDownKeyAriaLabel: 'стрелка вниз',
                            closeText: 'закрыть',
                            closeKeyAriaLabel: 'escape'
                        }
                    }
                }
            }
        },
        nav: [
            { 
                text: 'Разделы',
                items: [
                    { text: 'Быстрый старт', link: '/quickstart' },
                    { text: 'Коллекции', link: '/collections' },
                    { text: 'API', link: '/api' },
                    { text: 'SDK', link: '/sdk' },
                    { text: 'Логи', link: '/logs' }
                ]
            },
            { text: 'kodzero.pro', link: 'https://kodzero.pro/', target: '_blank', rel: 'noopener' },
            // { component: 'IconBeta'} // custom component insert
        ],
        sidebar: [
        {
            text: 'Быстрый старт',
            items: [
                    { text: 'О Kodzero', link: '/quickstart/' },
                    { text: 'Первый проект', link: '/quickstart/first-project' },
                    { text: 'Обзор API', link: '/quickstart/api' }
                ]
        },
        {
            text: 'Коллекции',
            items: [
                    { text: 'Обзор', link: '/collections/' },
                    { text: 'Данные', link: '/collections/data' },
                    { text: 'Схема данных', link: '/collections/schema' },
                    { text: 'Настройки API', link: '/collections/api-settings' }
                ]
        },
        {
            text: 'REST API',
            items: [
                    { text: 'Введение', link: '/api/' },
                    { text: 'View All', link: '/api/view-all' },
                    { text: 'View', link: '/api/view' },
                    { text: 'Create', link: '/api/create' },
                    { text: 'Update', link: '/api/update' },
                    { text: 'Delete', link: '/api/delete' },
                    { text: 'Ошибки', link: '/api/errors' }
                ]
        },
        {
            text: 'Kodzero SDK',
            items: [
                    { text: 'Обзор', link: '/sdk/' },
                    { text: 'Начало работы', link: '/sdk/start' },
                    { text: 'Для ИИ', link: '/sdk/ai' },
                    { text: 'Модель данных', link: '/sdk/model' },
                    { text: 'Кастомные методы', link: '/sdk/custom' },
                    { text: 'Пагинация', link: '/sdk/pagination' },
                    { text: 'Валидация', link: '/sdk/validation' },
                    { text: 'Авторизация', link: '/sdk/auth' },
                    { text: 'Обработка ошибок', link: '/sdk/errors' }
                ]
        },
        {
            text: 'Логи',
            items: [
                    { text: 'Логи запросов', link: '/logs/' }
                ]
        }
        ],

        socialLinks: [
          { icon: 'telegram', link: 'https://t.me/leshatourpro' },
        //   { icon: 'telegram', link: 'https://t.me/leshatourpro' }
        ],
        
        // @ts-ignore
        supportEmail: 'support@kodzero.pro'
    }
})
