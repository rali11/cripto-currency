<template>  
  <div>
    <div :class="['search-bar__body', isExpanded ? 'search-bar__body--expanded':'']">        
      <button 
        class="search-bar__btn-open"
        @click="openSearchBar"  
      >
        <i class="bi bi-search" />
      </button>
      <input               
        type="text" 
        placeholder="Search Token..."
        v-model="inputValue"
        @input="processSearchValueToken($event.target.value)"
        :class="['search-bar__input-search', isExpanded ? 'search-bar__input-search--expanded':'']"          
      >   
      <button 
        v-if="!loadingSearch"
        class="search-bar__btn-close"  
        @click="closeSearchBar"        
      >
        <i :class="['bi bi-x-lg', isExpanded ? 'bi--show':'']" />
      </button>  
      <button 
        v-else
        class="search-bar__btn-loading" 
      >
        <i :class="['bi-arrow-clockwise', isExpanded ? 'bi--show':'']" />
      </button>  
    </div>
    <SearchBarResults :result-list.sync="resultList" />
  </div> 
</template>

<script>
import { searchToken } from '@/services/api/CoinGecko';
import { Debounce } from '@/components/shared/Utils';
import SearchBarResults from './SearchBarResults.vue';

  export default {
    components: { SearchBarResults },
    data(){
      return {
        isExpanded:false,
        inputValue:'',
        isToggleTransitionEnd:true,
        loadingSearch:false,
        processSearchValueToken:()=>{},
        resultList:[],
      }
    },
    mounted(){      
      const inputSearch = document.querySelector('.search-bar__input-search');
      inputSearch.addEventListener('transitionend',() => {
        this.isToggleTransitionEnd = true;
      });
      this.processSearchValueToken = Debounce(this.searchToken);
    },
    watch:{
      inputValue(value){
        if (value) {
          this.loadingSearch = true;
        }
      },
      resultList(value){
        if(!value.length){
          this.closeSearchBar();
        }
      }
    },
    methods: {
      openSearchBar(){
        if (this.isToggleTransitionEnd && !this.isExpanded){
          this.isToggleTransitionEnd = false;
          this.isExpanded = !this.isExpanded;
          this.$emit('text-search','');
          this.inputValue = '';
        }
      },
      closeSearchBar(){
        if (this.isToggleTransitionEnd && this.isExpanded) {
          this.isToggleTransitionEnd = false;
          this.isExpanded = !this.isExpanded;
          this.resultList = [];
        }
      }, 
      async searchToken(searchValue){
        if (searchValue && this.isExpanded) {
          const tokenExcluded = this.$store.getters.listTokenId;
          const results = await searchToken(searchValue, tokenExcluded);
          this.resultList =  results.map(token => {
           return {
             id:token.id,
             name:token.name,
             tiker:token.symbol,
             image:token.large,
             loading:false,
             isAdded:false,
           }
          });
        } else {
          this.resultList = [];
        }
        this.loadingSearch = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .search-bar {    
    &__body {    
      position: absolute;
      display: flex;
      width: variables.$width-btn-icon;
      border-radius: 10px;      
      font-weight: 700;
      color:  variables.$font-btn-primary;    
      border: 0 solid transparent; 
      border-bottom-width: 2.5px;  
      transition: all .5s ease-in-out .4s;
      right:0;

      &--expanded {
        width: 100%;
        background-color: white;
        color:black;
        transition: all .5s ease-in-out;
        border-color: variables.$border-list-item;
      } 
    }

    &__btn-open {
      position: absolute;
      z-index: 1;
      width: variables.$width-btn-icon;
      height: variables.$height-btn;
      border: 0 solid variables.$border-btn;
      border-bottom-width: 2.5px;
      border-radius: 10px;      
      font-weight: 700;
      color:  variables.$font-btn-primary;     
      background-color: variables.$background-btn-primary; 
      margin:0;
    }

    &__input-search {
      height: 40px;
      width: 100%;
      padding: 0;
      background-color: transparent;
      border-width: 0;
      opacity: 0;
      transition: all .5s ease-out; 

      &--expanded {
        opacity: 1;
        padding: 0 1rem;
        margin-left: 2.5rem;
        transition: all .5s .3s ease-in;    
      }

      &:focus {
        outline: none !important;
      }
    }

    &__btn-close, &__btn-loading {
      width: 40px;
      height: 42px;
      border-width: 0;
      background-color: transparent;
      transition: all .5s ease;
    }

    &__btn-close .bi::before {        
      font-size: .8rem;
      transform: rotate(90deg);
      opacity: 0; 
      transition: all .5s ease;        
    }      

    &__btn-close .bi--show::before {
      font-size: 1rem;      
      transform: rotate(0deg);
      opacity: 1;
      transition: all .5s .4s ease;
    }

    &__btn-loading {
      animation: .5s linear 0s infinite normal loading;
    }
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>