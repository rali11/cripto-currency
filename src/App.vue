<template>
  <div id="app">
    <List style="width:700px;" />
  </div>
</template>

<script>
import List from './components/ui/atoms/List.vue';

export default {
  name: 'App',
  components: {
    List
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

