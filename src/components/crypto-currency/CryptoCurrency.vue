<template>
  <div>
    <List 
      :items="this.tokenList"
      :order-by="orderBy"
      :asc="asc"
    />
  </div>
</template>

<script>
  import {getListInfoToken, getInfoToken} from '../../services/api/CoinGecko.js';
  import {StreamCryptoMarket, StreamCryptoMarketObserver} from '../../services/api/BinanceStream.js';
  import List from '../ui/molecules/List.vue';

  export default {  
    components:{List},  
    data(){
      return {
        tokens:[
          'bitcoin',
          'ethereum',
          'binancecoin',
          'cardano',
        ],
        infoTokens:[],
        tokenList:[],    
        orderBy:'change',
        asc:false,
      }
    },
    mounted(){   
      this.getTokenList();
    },    
    watch:{
      tokens(newList){
        this.fetchInfoToken(newList[newList.length-1]);
      }
    },
    methods:{
      async getTokenList(){
        this.infoTokens = await getListInfoToken(this.tokens);
        const streamCryptoMarket = new StreamCryptoMarket();
        const streamCryptoMarketObserver = new StreamCryptoMarketObserver(this.infoTokens);
        await streamCryptoMarket.addObserver(streamCryptoMarketObserver);
        setInterval(() => {
          this.tokenList = this.infoTokens.map(item => ({...item}));
        }, 1000);
      }, 
      async fetchInfoToken(idToken){
        const infoToken = await getInfoToken(idToken);
        this.infoTokens.push(infoToken);
        this.tokenList = this.infoTokens.map(item => ({...item}));
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>