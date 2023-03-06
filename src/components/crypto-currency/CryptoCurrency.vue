<template>
  <Card class="crypto-currency">
    <ListFilter 
      :order-by.sync="orderBy" 
      :asc.sync="asc"  
    />
    <List 
      :items="this.listToken"
      :order-by="orderBy"
      :asc="asc"
    />
  </Card>
</template>

<script>
  import { getListInfoToken } from '../../services/api/CoinGecko.js';
  import { StreamCryptoMarket, StreamCryptoMarketObserver } from '../../services/api/BinanceStream.js';
  import List from '../ui/molecules/List.vue';
  import ListFilter from '../ui/molecules/ListFilter.vue';
  import Card from '../ui/atoms/Card.vue';

  export default {  
    components:{List, ListFilter, Card},  
    data(){
      return {
        listToken:[],    
        orderBy:'change',
        asc:false,
      }
    },
    mounted(){         
      this.getTokenList();
    }, 
    methods:{
      async getTokenList(){
        const listTokenId = ['bitcoin','ethereum','binancecoin','cardano','solana','matic-network'];
        //const listTokenId = await trendingTokensLast24hr();
        this.listToken = await getListInfoToken(listTokenId);
        const streamCryptoMarket = new StreamCryptoMarket();
        const streamCryptoMarketObserver = new StreamCryptoMarketObserver(this.listToken);
        await streamCryptoMarket.addObserver(streamCryptoMarketObserver);
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