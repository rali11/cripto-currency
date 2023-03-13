<template> 
  <div>   
    <template v-if="items.length !== 0">
      <transition-group 
        name="list" 
        tag="ul"
        class="list"
      >            
        <ListItem
          v-for="item in sortList"
          :key="item.id"
          :logo="item.img"
          :ticker="item.symbol"
          :name="item.name"
          :price="item.price"
          :change="item.change"
        />
      </transition-group> 
    </template> 
    <template v-else>
      <ListItemSkeleton 
        v-for="n in 7" 
        :key="n"
      />
    </template>
  </div>  
</template>

<script>
  import ListItem from "../atoms/ListItem.vue";
  import _ from 'lodash';
  import ListItemSkeleton from '../atoms/ListItemSkeleton.vue';

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
      orderBy:{
        type:String,
        default:'',
      },
      asc:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        loading:true,
      }
    },
    computed:{
      order(){
        return this.asc ? 'asc':'desc';
      },
      sortList(){
        return _.orderBy(this.items,[this.orderBy],[this.order]);
      }
    },   
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
