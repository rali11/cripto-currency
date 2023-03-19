<template>  
  <div 
    :class="['search-bar', searchBarScrolled]" 
    ref="searchBar"
  >
    <div class="search-bar__body">
      <div 
        :class="['search-bar__btn', showContent ? 'search-bar__btn--show':'']" 
      >        
        <input               
          type="text" 
          placeholder="Search..."
          v-model="inputValue"
          :class="['search-bar__input-search', showContent ? 'search-bar__input-search--show':'']"          
        >   
        <button 
          class="search-bar__btn-close" 
          @click="toggleSearchBar"           
        >
          <i :class="['bi bi-x-lg', showContent ? 'bi--show':'']" />
        </button>  
        <div :class="['search-bar__results',showResults ? 'search-bar__results--show':'']" />
      </div>
    </div>
  </div> 
</template>

<script>
  export default {
    data(){
      return {
        searchBarScrolled:'',
        showContent:false,
        inputValue:'',
        showResults:false,
        loading:false,
      }
    },
    mounted(){      
      const searchBar = this.$refs.searchBar;
      document.addEventListener('scroll',() => {
        const { top } = searchBar.getBoundingClientRect();
        this.searchBarScrolled = top <= 16 ? 'search-bar--scrolled' : '';
      })
    },
    watch:{
      inputValue(value){
        this.showResults = value ? true : false;
        if (value.length <= 5) {
          const searchResults = document.querySelector('.search-bar__results');
          searchResults.style.setProperty('--height-results',`${value.length * 50}px`);
        }
      }
    },
    methods: {
      toggleSearchBar(){
        this.showContent = !this.showContent;
        this.showResults = false;
        if(this.showContent){
          this.inputValue = '';
        } 
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .search-bar {    
    $padding-search-bar: calc((100vw - variables.$content-max-width) / 2);    

    position: absolute;
    top: .5rem;    
    left: 0;
    padding-left: $padding-search-bar;
    padding-right: $padding-search-bar;
    width: 100vw;
    transition: all .2s;

    &--scrolled {
      top: 1rem !important;
      transition: all .2s;
    } 

    &__results {
      --height-results:50px;
      $height-results: var(--height-results);

      height: 0;
      transition: all .2s ease-out;

      &--show {
        height: $height-results;
        transition: all .2s ease-in;
      }
    }

    &__body {
      margin: 0 2rem;      
      position: relative;
    }

    &__btn {    
      position: absolute;
      padding: .7rem;     
      width:  40px; 
      border: 2.5px solid variables.$border-btn;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      border-radius: 10px;      
      font-weight: 700;
      color:  variables.$font-btn-primary;         
      background-color: variables.$background-btn-primary; 
      transition: all .5s ease-in-out .4s;
      right:0;

      &::before {
        content: '\F52A';
        font-family: 'bootstrap-icons';
        font-size: .9rem;  
      }

      &--show {
        width: 100%;
        background-color: white;
        color:black;
        transition: all .5s ease-in-out;
      } 
    }

    &__input-search {
      position: absolute;
      z-index: 1;
      top:0;
      left:0;
      height: 40px;
      width: 100%;
      padding: 0 2.3rem;
      background-color: transparent;
      border-width: 0;
      opacity: 0;
      transform: translateX(-20px);
      transition: all .5s .3s ease-out; 

      &--show {
        opacity: 1;
        transform: translateX(0);
        transition: all .5s .3s ease-in;    
      }
    }

    &__btn-close {
      position: absolute;
      top:0;
      right: 0;
      width: 40px;
      height: 42px;
      border-width: 0;
      background-color: transparent;
      z-index: 1;           
      transition: all .5s ease;

      .bi::before {        
        font-size: .8rem;
        transform: rotate(90deg);
        opacity: 0; 
        transition: all .5s ease;        
      }      

      .bi--show::before {
        font-size: 1rem;      
        transform: rotate(0deg);
        opacity: 1;
        transition: all .5s .4s ease;
      }
    }
  }
</style>