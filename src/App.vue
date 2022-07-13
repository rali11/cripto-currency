<template>
  <div id="app">
    <ListCrypto style="width:700px;" />
  </div>
</template>

<script>
import ListCrypto from './components/ListCrypto.vue';

export default {
  name: 'App',
  components: {
    ListCrypto
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

