<template>
  <Card class="crypto-currency">
    <ListFilter 
      :order-by.sync="orderBy" 
      :asc.sync="asc"  
    />
    <List 
      :items="this.tokenList"
      :order-by="orderBy"
      :asc="asc"
    />
  </Card>
</template>

<script>
  import {getListInfoToken} from '../../services/api/CoinGecko.js';
  import {StreamCryptoMarket, StreamCryptoMarketObserver} from '../../services/api/BinanceStream.js';
  import List from '../ui/molecules/List.vue';
  import ListFilter from '../ui/molecules/ListFilter.vue';
  import Card from '../ui/atoms/Card.vue';

  export default {  
    components:{List, ListFilter, Card},  
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
        const infoTokens = await getListInfoToken(this.tokens);
        const streamCryptoMarket = new StreamCryptoMarket();
        const streamCryptoMarketObserver = new StreamCryptoMarketObserver(infoTokens);
        await streamCryptoMarket.addObserver(streamCryptoMarketObserver);
        setInterval(() => {
          this.tokenList = infoTokens.map(item => ({...item}));
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
    margin-top:2rem;
    width: 700px;
  }
</style>