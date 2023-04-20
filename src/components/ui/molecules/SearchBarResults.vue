<template>
  <div :class="['search-bar__results',showResults ? 'search-bar__results--show':'']">
    <div 
      v-for="(token, index) in resultList" 
      :key="index" 
      class="search-bar__item-results"
      @click="addSelectedToken(token)"
    >
      <img :src="token.image">
      <p>{{ token.name }}<span>({{ token.tiker }})</span></p>
      <ButtonPrimary>
        <i 
          v-if="!token.loading" 
          class="bi bi-plus-lg"
        />
        <i
          v-else
          class="bi-arrow-clockwise search-bar__btn-loading-selected" 
        />
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
  import { getInfoToken } from '@/services/api/CoinGecko';
  import ButtonPrimary from '../atoms/ButtonPrimary.vue';

  export default {
    props:{
        resultList:{
          type:Array,
          default:()=>[],
        }
    },
    components:{
      ButtonPrimary
    },
    data(){
      return {
        showResults:false,
      }
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
    methods:{
      async addSelectedToken(token){
        token.loading = true;
        const tokenSelected = await getInfoToken(token.id);
        this.$store.commit('addToken',tokenSelected);
        token.loading = false;
        this.$emit('update:resultList',[]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-bar__results {
    --height-results:50px;
    $height-results: var(--height-results);

    position: absolute;
    left: 0;
    height: 0;
    margin-top: 43px;
    transition: all .2s ease-out;
    overflow: scroll;
    background-color: white;
    border-radius: 10px; 
    width: 100%;

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

  .search-bar__item-results {
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

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      font-weight: 400;
    }

    img {
      height: 2rem;
      width: 2rem;
    }

    button {
      margin-left: auto;
    }
  }

  .search-bar__btn-loading-selected {
    animation: .5s linear 0s infinite normal loading;
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