<template>
  <div class="mention-coingecko">
    Powered by 
    <a 
      class="mention-coingecko__url"
      href="https://www.coingecko.com/es/api" 
      target="_blank"
    >
      CoinGecko API
    </a>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables"; 

  .mention-coingecko {
    &__url {
      text-decoration: none;
      color: variables.$font-url;
    }
  }
</style>