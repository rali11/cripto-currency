<template>
  <Card 
    class="crypto-currency__card"
    :style="styleCard"
  >
    <div 
      class="crypto-currency__card-body" 
      ref="cardBody"
    >
      <ListHeader />
      <List 
        :items="sortedListToken"
        :loading="loading"
        @update-listener="resizeCardHeight"
      />
    </div>
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
        loading:false,
        styleCard:{
          padding:'32px',
          height:'auto',
        }
      }
    },
    computed:{
      ...mapGetters([
        'sortedListToken',
      ])
    },
    mounted(){          
      this.getTokenList();   
    }, 
    methods:{
      resizeCardHeight(){
        const cardBodyStyles = window.getComputedStyle(this.$refs.cardBody, null);
        const cardBodyStylesHeight = parseFloat(cardBodyStyles.getPropertyValue('height'));
        this.styleCard.height = `${cardBodyStylesHeight + (parseFloat(this.styleCard.padding) * 2)}px`;
      },
      async getTokenList(){
        this.loading = true;
        const listTokenId = ['ethereum','bitcoin','cardano','matic-network','binancecoin','pancakeswap-token','solana'];    
        const listToken = await getListInfoToken(listTokenId);
        listToken.forEach(token => {
          this.$store.commit('addToken', token);
        });
        const streamCryptoMarket = new StreamCryptoMarket();
        const streamCryptoMarketObserver = new StreamCryptoMarketObserver(this.sortedListToken);
        await streamCryptoMarket.addObserver(streamCryptoMarketObserver);
        this.loading = false;
      }, 
    }
  }
</script>

<style lang="scss" scoped>
  .crypto-currency__card {
    display:flex;
    flex-direction:column;
    gap: 5px;
    width: 100%;
    transition: height .9s ease;

    &-body {
      position: relative;
      height: auto;
      width: 100%;
    }
  }
</style>