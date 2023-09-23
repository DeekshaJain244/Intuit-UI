// custom layout
<template>
  <div class="custom-layout">
    <NuxtLoadingIndicator :throttle="0" height="5px" color="grey"/>
    <slot/>
  </div>
</template>
<script setup lang="ts">
</script>