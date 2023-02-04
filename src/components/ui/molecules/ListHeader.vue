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
      }
    },
    data(){
      return {
        orderBySelected:this.orderBy,
        orderByList:[
          {value:'name',label:'Name',selected:false},
          {value:'price',label:'Price',selected:false},
          {value:'change',label:'Change',selected:true},
        ]
      }
    },
    watch:{
      orderBySelected(value){
        this.$emit('update:orderBy',value);
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

    &__percent {
      font-size: .7rem;
      border-radius: 50%;
      background-color: #aaabad;
      color:white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.1rem;
      width: 1.1rem;
      line-height: 0;
    }

    .bi {
      line-height: 0 !important;
      font-weight: bold !important;
      font-size: 1.1rem;
    }
  }
</style>