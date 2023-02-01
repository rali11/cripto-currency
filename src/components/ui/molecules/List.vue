<template> 
  <div>    
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
  </div>  
</template>

<script>
  import ListItem from "../atoms/ListItem.vue";
  import _ from 'lodash';

  export default {
    components:{
      ListItem,
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
