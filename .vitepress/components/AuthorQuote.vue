<script setup lang="ts">
defineProps<{
  avatar?: string
  name?: string
  role?: string
}>()
</script>

<template>
  <div class="author-quote">
    <div class="quote-icon">
        <svg width="37" height="27" viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33222 27C5.8848 27 3.87737 26.1904 2.30992 24.5712C0.769974 22.925 0 20.7391 0 18.0135C0 15.8816 0.508733 13.7766 1.5262 11.6987C2.54366 9.59371 4.06986 7.55622 6.10479 5.58621C8.13973 3.61619 10.6971 1.75412 13.777 0L17.4894 5.05997C15.207 6.03148 13.1721 7.27286 11.3846 8.78411C9.62467 10.2684 8.35972 11.7391 7.58974 13.1964C9.10219 13.1154 10.4771 13.3448 11.7146 13.8846C12.9521 14.3973 13.942 15.1664 14.6845 16.1919C15.427 17.1904 15.7982 18.4048 15.7982 19.8351C15.7982 21.967 15.097 23.6942 13.6945 25.0165C12.3196 26.3388 10.5321 27 8.33222 27ZM27.8428 27C25.3954 27 23.388 26.1904 21.8205 24.5712C20.2806 22.925 19.5106 20.7391 19.5106 18.0135C19.5106 15.8816 20.0193 13.7766 21.0368 11.6987C22.0543 9.59371 23.5805 7.55622 25.6154 5.58621C27.6503 3.61619 30.2077 1.75412 33.2876 0L37 5.05997C34.7176 6.03148 32.6826 7.27286 30.8952 8.78411C29.1353 10.2684 27.8703 11.7391 27.1003 13.1964C28.6128 13.1154 29.9877 13.3448 31.2252 13.8846C32.4626 14.3973 33.4526 15.1664 34.1951 16.1919C34.9376 17.1904 35.3088 18.4048 35.3088 19.8351C35.3088 21.967 34.6076 23.6942 33.2051 25.0165C31.8302 26.3388 30.0427 27 27.8428 27Z" fill="var(--vp-c-text-3)"/>
</svg>
    </div>
    <div class="author-quote__text">
      <slot />
    </div>
    <div class="author-quote__footer">
      <img 
        v-if="avatar" 
        :src="avatar" 
        :alt="name" 
        class="author-quote__avatar" 
      />
      <div class="author-quote__info">
        <span class="author-quote__name">{{ name }}</span>
        <span class="author-quote__role">{{ role }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.author-quote {
  position: relative;
  margin: 38px 0 24px 0;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.quote-icon {
  position: absolute;
  bottom: 24px;
  right: 24px;
  color: var(--vp-c-text-3);
  opacity: 0.20;
}

.dark .quote-icon {
    opacity: 0.15;
}

.author-quote__text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  /* font-style: italic; */
  margin-bottom: 20px;
  opacity: 0.9;
}

.author-quote__text :deep(p) {
  margin: 0;
}

.author-quote__footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-quote__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.author-quote__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-quote__name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-style: normal;
}

.author-quote__role {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  font-style: normal;
}
</style>
