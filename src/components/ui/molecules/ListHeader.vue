<template>
  <header 
    :class="['list-header',listHeaderBackground]"
    ref="listHeader"
  >
    <Container class="list-header__container">
      <h1 class="list-header__title">
        Currencies
      </h1>
      <div class="list-header__order-by">
        <Dropdown
          v-model="orderBySelected"
          :list="orderByList"
        >
          Order By
        </Dropdown>
        <Dropdown
          v-model="orderSelected"
          :list="orderList"
        >
          <i class="bi bi-sort-down" />
        </Dropdown>      
        <CheckButton 
          v-model="modeDelete"
          role="danger"
        >
          <i class="bi bi-trash-fill" />
        </CheckButton>
      </div>    
      <SearchBar />
    </Container>
  </header>
</template>

<script>
  import CheckButton from '../atoms/CheckButton.vue';
  import Container from '../objects/Container.vue';
  import Dropdown from './Dropdown.vue';
  import SearchBar from './SearchBar.vue';

  export default {
    components: { Dropdown, SearchBar, Container, CheckButton },
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
        ],
        loadingSearchBar:false,
        modeDelete:false,
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
      },
      modeDelete(value){
        this.$store.commit('changeModeDelete', value);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";
  
  
  .list-header {  
    display: flex;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100vw;
    margin-left: calc(((100vw - 100%) / 2) * -1);
    padding: .5rem calc((100vw - 100%) / 2);
    background-color: transparent;
    transition: all .2s;
    border: 0 solid transparent;
    border-bottom-width: 2.5px;
    transition: all .2s ease-in-out;

    &--scrolled {
      background-color: variables.$background-list-header-scrolled;
      border-color: variables.$border-menu;
      transition: all .2s;      
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    &__container {
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }

    &__title {
      line-height: 0;
      margin-right: auto;
    }

    &__order-by {
      display: flex;
      font-size: 1rem;
      text-transform: capitalize;
      height: 100%;
      gap:10px;
      padding-right: 3rem;
    }
  }
</style>