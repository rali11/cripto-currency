<template>
  <transition-group
    name="result-animation" 
    tag="ul"
    :class="['search-bar__results',showResults ? 'search-bar__results--show':'']"
  >
    <SearchBarResultsItem 
      v-for="token in resultList"
      :key="token.id"
      :token="token"
      @click="addSelectedToken(token)"
    />
  </transition-group>
</template>

<script>
  import { getInfoToken } from '@/services/api/CoinGecko';
  import SearchBarResultsItem from '../atoms/SearchBarResultsItem.vue';

  export default {
    props:{
      resultList:{
        type:Array,
        default:()=>[],
      }
    },
    components:{
      SearchBarResultsItem
    },
    data(){
      return {
        showResults:false,
        isTokenAdded:false,
      }
    },
    
    watch:{
      resultList(value){
        this.showResults = value.length ? true : false;
        const searchResults = document.querySelector('.search-bar__results');
        if (value.length <= 5) {      
          searchResults.style.setProperty('--height-results',`${value.length * 60}px`);
        } else {
          searchResults.style.setProperty('--height-results',`${5 * 60}px`);
        }
      }
    },
    methods:{
      async addSelectedToken(token){
        token.loading = true;
        const tokenSelected = await getInfoToken(token.id);
        this.$store.commit('addToken',tokenSelected);
        token.loading = false;
        token.isAdded = true;
        setTimeout(() => {
         this.$emit('update:resultList',this.resultList.filter(item => item.id !== token.id));
        },300)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .search-bar {
    --height-results:60px;
    $height-results: var(--height-results);

    &__results {
      position: absolute;
      left: 0;
      height: 0;
      width: 100%;
      padding: 0;
      margin-top: 45px;
      transition: all .2s ease-out;
      overflow: scroll;
      background-color: white;
      border-radius: 10px; 
     
      &--show {
        height: $height-results;
        box-shadow:
          0px 2.6px 2.2px rgba(0, 0, 0, 0.008),
          0px 6.3px 5.3px rgba(0, 0, 0, 0.012),
          0px 11.8px 10px rgba(0, 0, 0, 0.015),
          0px 21px 17.9px rgba(0, 0, 0, 0.018),
          0px 39.3px 33.4px rgba(0, 0, 0, 0.022),
          0px 94px 80px rgba(0, 0, 0, 0.03)
        ;   
        transition: all .2s ease-in;
      }
    }
  }

  .result-animation-enter, .result-animation-leave-to {
    opacity: 0;
  }
  
  .result-animation-leave-active {
    width: 100%;
    position: absolute;
  }
</style>