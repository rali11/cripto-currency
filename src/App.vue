<template>
  <div id="app">
    <Container tag="section">
      <CryptoCurrency />
    </Container>
  </div>
</template>

<script>
import CryptoCurrency from './components/crypto-currency/CryptoCurrency.vue';
import Container from './components/ui/objects/Container.vue';

export default {
  name: 'App',
  components: {
    CryptoCurrency,
    Container
  }
}
</script>

