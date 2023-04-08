<template>  
  <div 
    :class="['search-bar', searchBarScrolled]" 
  >
    <div class="search-bar__body">
      <div 
        :class="['search-bar__btn', showContent ? 'search-bar__btn--show':'',showResults ? 'search-bar__btn--shadow':'']" 
        ref="searchBar"
      >        
        <input               
          type="text" 
          placeholder="Search..."
          v-model="inputValue"
          @input="$emit('text-search', $event.target.value)"
          :class="['search-bar__input-search', showContent ? 'search-bar__input-search--show':'']"          
        >   
        <button 
          v-if="!loading"
          class="search-bar__btn-close" 
          @click="toggleSearchBar"           
        >
          <i :class="['bi bi-x-lg', showContent ? 'bi--show':'']" />
        </button>  
        <button 
          v-else
          class="search-bar__btn-loading" 
        >
          <i :class="['bi-arrow-clockwise', showContent ? 'bi--show':'']" />
        </button>  
        <div :class="['search-bar__results',showResults ? 'search-bar__results--show':'']">
          <div 
            v-for="(token, index) in resultList" 
            :key="index" 
            class="search-bar__item-results"
            @click="$emit('select', token)"
          >
            <img :src="token.image">
            <p>{{ token.name }} <span>({{ token.tiker }})</span></p>
            <button-primary>
              Add
            </button-primary>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import ButtonPrimary from '../atoms/ButtonPrimary.vue';

  export default {
    props:{
      value:{
        type:Object,
        default:() => ({}),
        validator: function(value){
          const props = ['name','tiker','image','id'];
          const propsValue = Object.keys(value);
          propsValue.forEach(key => {
            if(!props.includes(key)){
              return false;
            }
          });
          return true;          
        }
      },
      resultList:{
        type: Array,
        default: () => [],
        validator: function(value){
          const props = ['name','tiker','image','id'];
          value.forEach(item => {
            const propsItem = Object.keys(item);
            propsItem.forEach(key => {
              if(!props.includes(key)){
                return false;
              }
            });
          });
          return true;
        }
      },
      loading:{
        type:Boolean,
        default:false,
      },
    },
    model:{
      prop:'value',
      event:'select'
    },
    components: { ButtonPrimary },
    data(){
      return {
        searchBarScrolled:'',
        showContent:false,
        inputValue:'',
        showResults:false,
        isToggleTransitionEnd:true,
      }
    },
    mounted(){      
      const searchBar = this.$refs.searchBar;
      const inputSearch = document.querySelector('.search-bar__input-search');
      document.addEventListener('scroll',() => {
        const { y } = searchBar.getBoundingClientRect();
        if (y < 9) {
          this.searchBarScrolled = 'search-bar--scrolled';
        } 
        if (y > 16) {
          this.searchBarScrolled = '';
        }
      })
      inputSearch.addEventListener('transitionend',() => {
        this.isToggleTransitionEnd = true;
      })
    },
    watch:{
      resultList(value){
        this.showResults = value.length ? true : false;
        const searchResults = document.querySelector('.search-bar__results');
        if (value.length <= 5) {      
          searchResults.style.setProperty('--height-results',`${value.length * 50}px`);
        } else {
          searchResults.style.setProperty('--height-results',`${5 * 50}px`);
        }
      }
    },
    methods: {
      toggleSearchBar(){
        if (this.isToggleTransitionEnd) {
          this.isToggleTransitionEnd = false;
          this.showContent = !this.showContent;
          this.showResults = false;
          if(this.showContent){
            this.$emit('text-search','');
            this.inputValue = '';
          } 
        }
      }, 
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
      overflow: scroll;

      &--show {
        height: $height-results;
        margin-top: 10px;
        transition: all .2s ease-in;
      }
    }

    &__item-results {
      display: flex;
      padding: 0 1rem;
      align-items: center;
      height: 50px;
      gap: 1rem;
      border: 0 solid #eee;
      border-top-width: 1px;

      &:hover {
        background-color: #eee;
      }

      img {
        height: 2rem;
        width: 2rem;
      }

      span {
        font-weight: 400;
      }

      button {
        margin-left: auto;
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
      border: 0 solid variables.$border-btn;
      border-bottom-width: 2.5px;
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

      &--shadow {
        box-shadow:
          0px 2.6px 2.2px rgba(0, 0, 0, 0.008),
          0px 6.3px 5.3px rgba(0, 0, 0, 0.012),
          0px 11.8px 10px rgba(0, 0, 0, 0.015),
          0px 21px 17.9px rgba(0, 0, 0, 0.018),
          0px 39.3px 33.4px rgba(0, 0, 0, 0.022),
          0px 94px 80px rgba(0, 0, 0, 0.03)
        ;   
      }
    }

    &__input-search {
      position: absolute;
      z-index: 1;
      top:0;
      left:0;
      height: 40px;
      width: 100%;
      padding: 0;
      background-color: transparent;
      border-width: 0;
      opacity: 0;
      transition: all .5s ease-out; 

      &--show {
        opacity: 1;
        padding: 0 2.3rem;
        transition: all .5s .3s ease-in;    
      }

      &:focus {
        outline: none !important;
      }
    }

    &__btn-close, &__btn-loading {
      position: absolute;
      top:0;
      right: 0;
      width: 40px;
      height: 42px;
      border-width: 0;
      background-color: transparent;
      z-index: 1;           
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