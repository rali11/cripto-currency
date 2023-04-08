<template>
  <header 
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
    <SearchBar
      v-model="resultSearchSelected"
      :result-list="resultSearchList"
      :loading="loadingSearchBar"
      @text-search="processSearchValueToken"
    />
  </header>
</template>

<script>
import Menu from './Menu.vue';
import SearchBar from './SearchBar.vue';
import { Debounce } from '@/components/shared/Utils';
import { searchToken, getInfoToken } from '@/services/api/CoinGecko';

  export default {
    components: { Menu, SearchBar },
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
        resultSearchSelected:{},
        resultSearchList:[],
        processSearchValueToken:()=>{},
        loadingSearchBar:false,
      }
    },
    mounted(){
      const listHeader = this.$refs.listHeader;
      document.addEventListener('scroll',()=>{
        const { top } = listHeader.getBoundingClientRect();
        this.listHeaderBackground = top === 0 ? 'list-header--scrolled' : '';
      })
      this.processSearchValueToken = Debounce(this.searchToken);
    },
    watch:{
      orderBySelected(value){
        this.$emit('update:orderBy',value);
      },
      orderSelected(value){
        this.$emit('update:asc',value === 'asc' ? true : false);
      },
      resultSearchSelected({id}){
        this.addSelectedToken(id);
      }
    },
    methods:{
      async searchToken(searchValue){
        if (searchValue) {
          this.loadingSearchBar = true;
          const tokenExcluded = this.$store.getters.listTokenId;
          const resultList = await searchToken(searchValue, tokenExcluded);
          this.resultSearchList =  resultList.map(token => {
           return {
             id:token.id,
             name:token.name,
             tiker:token.symbol,
             image:token.large,
           }
          });
        } else {
          this.resultSearchList = [];
        }
        this.loadingSearchBar = false;
      },
      async addSelectedToken(idToken){
        const token = await getInfoToken(idToken);
        this.$store.commit('addToken',token);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";
  
  .list-header {  
    display: flex;
    flex-wrap: wrap;
    transition: all .9s ease-in-out;
    align-items: flex-end;
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

    &--scrolled {
      background-color: variables.$background-list-header-scrolled;
      border-color: variables.$border-menu;
      transition: all .2s;      
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    &__title {
      line-height: 0;
      margin-right: auto;
    }

    &__order-by {
      padding-right: 3rem;
      align-self: center;
      display: flex;
      font-size: 1rem;
      text-transform: capitalize;
      height: 100%;
      gap:10px;
    }
  }
</style>