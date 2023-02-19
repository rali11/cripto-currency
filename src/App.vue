<template>
  <div id="app">
    <CryptoCurrency style="width:700px;" />
    <footer>
      Created by <a href="https://github.com/rali11/cripto-currency">rali11</a>.
    </footer>
  </div>
</template>

<script>
import CryptoCurrency from './components/crypto-currency/CryptoCurrency.vue';

export default {
  name: 'App',
  components: {
    CryptoCurrency
  }
}
</script>
<style scoped>
  #app {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-direction: columns;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
</style>

