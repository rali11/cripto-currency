<template>
  <main 
    id="app" 
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

  .crypto-currency {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-bottom:1rem;
  }
</style>
