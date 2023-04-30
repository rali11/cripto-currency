<template> 
  <div class="list-container">   
    <template v-if="loading">
      <ListItemSkeleton 
        v-for="n in 7" 
        :key="n"
      />
    </template>
    <template v-else-if="items.length">
      <transition-group 
        name="list" 
        tag="ul"
        class="list"
      >            
        <ListItem
          v-for="item in items"
          :key="item.id"
          :logo="item.img"
          :ticker="item.symbol"
          :name="item.name"
          :price="item.price"
          :change="item.change"
          :mode-delete="isModeDeleteList"
          @delete-event="deleteToken(item)"
        />
      </transition-group> 
    </template> 
  </div>  
</template>

<script>
  import ListItem from "../atoms/ListItem.vue";
  import ListItemSkeleton from '../atoms/ListItemSkeleton.vue';
  import { mapGetters } from 'vuex';

  export default {
    components:{
      ListItem,
      ListItemSkeleton,
    },
    props:{
      items:{
        type: Array,
        default:()=>[],
      },
      loading:{
        type:Boolean,
        default:false,
      }
    },
    computed:{
      ...mapGetters([
        'isModeDeleteList',
      ])
    },  
    updated(){
      this.$emit('update-height');
    },
    methods:{
      deleteToken(token){
        this.$store.commit('deleteToken',token);
      },
    }
  }
</script>
<style lang="scss" scoped>
  .list {
    position: relative;
    margin:0;
    padding:0;

    &-enter, &-leave-to {
      opacity: 0;
    }
    
    &-leave-active {
      width: 100%;
      position: absolute;
    }
  }
  
</style>
