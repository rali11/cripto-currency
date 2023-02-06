<template>
  <div class="list-header">
    <h1 class="list-header__title">
      Currencies
    </h1>
    <div class="list-header__order-by">
      <Menu
        v-model="orderBySelected"
        :list="orderByList"
      >
        <i class="bi bi-filter" />
      </Menu>
      <Menu
        v-model="orderSelected"
        :list="orderList"
      >
        <i class="bi bi-sort-down" />
      </Menu>
    </div>
  </div>
</template>

<script>
import Menu from './Menu.vue'
  export default {
    components: { Menu },
    props:{
      orderBy:{
        default:'',
        type:String,
      },
      asc:{
        default:false,
        type:Boolean,
      }
    },
    data(){
      return {
        orderBySelected:this.orderBy,
        orderSelected:'desc',
        orderByList:[
          {value:'name',label:'Name',selected:false},
          {value:'price',label:'Price',selected:false},
          {value:'change',label:'Change',selected:true},
        ],
        orderList:[
          {value:'asc', label:'Asc.', selected:false},
          {value:'desc', label:'Desc.', selected:true}
        ]
      }
    },
    watch:{
      orderBySelected(value){
        this.$emit('update:orderBy',value);
      },
      orderSelected(value){
        this.$emit('update:asc',value === 'asc' ? true : false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .list-header {
    padding:.5rem .3rem;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transition: all .9s ease-in-out;
    align-items: flex-end;

    &__title {
      line-height: 0;
    }

    &__order-by {
      align-self: center;
      display: flex;
      font-size:1rem;
      text-transform: capitalize;
      height: 100%;
    }
  }
</style>