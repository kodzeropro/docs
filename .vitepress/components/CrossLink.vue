<script setup lang="ts">
defineProps<{
    description?: string
    section?: string
    page?: string
    fullUrl: string
}>()
</script>

<template>
<div class="cross-link-wr">
    <span class="cross-link-description">{{ description || 'Полное описание' }}:</span>
        <a :href="fullUrl">
        <template v-if="section">{{section}} → </template>{{ page }}
    </a>
</div>
</template>

<style scoped>
    .cross-link-wr {
        margin-top: 8px;
        font-size: 0.9rem;
    }

    .cross-link-description {
        padding-right: 10px;
        opacity: 0.8;
    }

    a {
        text-decoration: none !important;
    }
</style>