<template>
  <div id="app">
    <Container 
      class="container"
      tag="section"
    >
      <CryptoCurrency />
      <CoinGeckoMention />
    </Container>
  </div>
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
  .container {
    display: flex;
    flex-direction: column;
    gap:1.5rem;
    margin-bottom: 1rem;
  }
</style>
