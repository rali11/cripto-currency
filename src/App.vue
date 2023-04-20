<template>
  <main 
    id="app" 
    class="app"
  >
    <Container 
      tag="section"
      class="crypto-currency"
    >
      <CryptoCurrency />
      <CoinGeckoMention />
    </Container>
  </main>
</template>

<script>
import CryptoCurrency from './components/crypto-currency/CryptoCurrency.vue';
import CoinGeckoMention from './components/ui/atoms/CoinGeckoMention.vue';
import Container from './components/ui/objects/Container.vue';

export default {
  name: 'App',
  components: {
    CryptoCurrency,
    Container,
    CoinGeckoMention
  }
}
</script>
<style lang="scss" scoped>
  .app {
    height: 100vh;
    display: flex;
    padding-top: 2rem;
  }

  .crypto-currency {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin:auto;
    padding-bottom:1rem;
  }
</style>
