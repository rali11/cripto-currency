<template>
  <div id="app">
    <CryptoCurrency style="width:700px;" />
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
    align-items: center;
    justify-content: center;
    flex-direction: columns;
  }
</style>

