<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
   @use "@/assets/styles/settings/variables";

  .card {    
    background-color: variables.$background-card;
    border-radius:1rem;
  }
</style>