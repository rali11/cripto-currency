<template>
  <div class="crypto-currency">
    <ListHeader 
      :order-by.sync="orderBy" 
      :asc.sync="asc"  
    />
    <List 
      :items="this.tokenList"
      :order-by="orderBy"
      :asc="asc"
    />
  </div>
</template>

<script>
  import {getListInfoToken} from '../../services/api/CoinGecko.js';
  import {StreamCryptoMarket, StreamCryptoMarketObserver} from '../../services/api/BinanceStream.js';
  import List from '../ui/molecules/List.vue';
  import ListHeader from '../ui/molecules/ListHeader.vue';

  export default {  
    components:{List, ListHeader},  
    data(){
      return {
        tokens:[
          'bitcoin',
          'ethereum',
          'binancecoin',
          'cardano',
          'solana',
          'matic-network',
          'pancakeswap-token',
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
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";
  
  .crypto-currency{
    display:flex;
    flex-direction:column;
    gap: 5px;
    padding: 2rem;
    background-color: variables.$background-crypto-currency;
    border-radius:1rem;
    margin-top:2rem;
  }
</style>