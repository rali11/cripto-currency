<template>
  <Card class="crypto-currency__card">
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
  import { getListInfoToken } from '@/services/api/CoinGecko.js';
  import { StreamCryptoMarket, StreamCryptoMarketObserver } from '@/services/api/BinanceStream.js';
  import List from '@/components/ui/molecules/List.vue';
  import ListHeader from '@/components/ui/molecules/ListHeader.vue';
  import Card from '@/components/ui/atoms/Card.vue';
  import { mapGetters } from 'vuex';

  export default {  
    components:{List, ListHeader, Card},  
    data(){
      return {
        orderBy:'change',
        asc:false,
      }
    },
    computed:{
      ...mapGetters([
        'listToken'
      ])
    },
    mounted(){         
      this.getTokenList();      
    }, 
    methods:{
      async getTokenList(){
        const listTokenId = ['ethereum','bitcoin','cardano','matic-network','binancecoin','pancakeswap-token','solana'];    
        const listToken = await getListInfoToken(listTokenId);
        listToken.forEach(token => {
          this.$store.commit('addToken', token);
        });
        const streamCryptoMarket = new StreamCryptoMarket();
        const streamCryptoMarketObserver = new StreamCryptoMarketObserver(this.listToken);
        await streamCryptoMarket.addObserver(streamCryptoMarketObserver);
      }, 
    }
  }
</script>

<style lang="scss" scoped>
  .crypto-currency__card {
    display:flex;
    flex-direction:column;
    gap: 5px;
    padding: 2rem;
    width: 100%;
  }
</style>