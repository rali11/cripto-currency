<template>
  <Card class="crypto-currency">
    <ListHeader 
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
  import { getListInfoToken, searchToken, getInfoToken } from '@/services/api/CoinGecko.js';
  import { StreamCryptoMarket, StreamCryptoMarketObserver } from '@/services/api/BinanceStream.js';
  import List from '@/components/ui/molecules/List.vue';
  import ListHeader from '@/components/ui/molecules/ListHeader.vue';
  import Card from '@/components/ui/atoms/Card.vue';

  export default {  
    components:{List, ListHeader, Card},  
    data(){
      return {
        listToken:[],    
        orderBy:'change',
        asc:false,
      }
    },
    computed:{
      listTokenId(){
        return this.listToken.map(token => token.id);
      }
    },
    mounted(){         
      this.getTokenList();      
    }, 
    methods:{
      async getTokenList(){
        const listTokenId = ['bitcoin','ethereum','binancecoin','cardano','solana','matic-network','pancakeswap-token'];        
        //const listTokenId2 = await trendingTokensLast24hr();
        this.listToken = await getListInfoToken(listTokenId);
        const streamCryptoMarket = new StreamCryptoMarket();
        const streamCryptoMarketObserver = new StreamCryptoMarketObserver(this.listToken);
        await streamCryptoMarket.addObserver(streamCryptoMarketObserver);
      }, 
      async addToken(){
        const searchTokenResults = await searchToken('btc',this.listTokenId);
        const newToken = await getInfoToken(searchTokenResults[0]);
        this.listToken.push(newToken);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";
  
  .crypto-currency {
    position: relative;
    display:flex;
    flex-direction:column;
    gap: 5px;
    padding: 2rem;
    margin-top:2rem;
    width: 700px;    
  }
</style>