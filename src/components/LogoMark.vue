<template>
  <img class="logoMark" :src="logoUrl" alt="Логотип вогню" />
</template>

<script setup>
const logoUrl = `${import.meta.env.BASE_URL}flame.png`
</script>

<style scoped>
.logoMark{
  width: var(--logoSize, 42px);
  height: var(--logoSize, 42px);
  display: block;
  object-fit: contain;
  background: transparent;
}
</style>
