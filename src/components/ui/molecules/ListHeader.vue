<template>
  <div 
    :class="['list-header',listHeaderBackground]"
    ref="listHeader"
  >
    <h1 class="list-header__title">
      Currencies
    </h1>
    <div class="list-header__order-by">
      <Menu
        v-model="orderBySelected"
        :list="orderByList"
      >
        Order By
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
import Menu from './Menu.vue';

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
        listHeaderBackground:'',
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
    mounted(){
      const listHeader = this.$refs.listHeader;
      document.addEventListener('scroll',()=>{
        const { top } = listHeader.getBoundingClientRect();
        this.listHeaderBackground = top === 0 ? 'list-header--scrolled' : '';
      })
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
    padding: .5rem .3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transition: all .9s ease-in-out;
    align-items: flex-end;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100vw;
    margin-left: calc(((100vw - 100%) / 2) * -1);
    padding-left: calc((100vw - 100%) / 2);
    padding-right: calc((100vw - 100%) / 2);
    background-color: transparent;
    transition: all .2s;
    border: 2.5px solid transparent;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;

    &--scrolled {
      background-color: variables.$background-list-header-scrolled;
      border-color: variables.$border-menu;
      transition: all .2s;      
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    &__title {
      line-height: 0;
    }

    &__order-by {
      align-self: center;
      display: flex;
      font-size: 1rem;
      text-transform: capitalize;
      height: 100%;
      gap:10px;
    }
  }
</style>