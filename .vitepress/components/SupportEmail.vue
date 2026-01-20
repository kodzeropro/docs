<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
</script>

<template>
  <a :href="`mailto:${theme.supportEmail}`">{{ theme.supportEmail }}</a>
</template>
