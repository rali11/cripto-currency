<template>
  <Card class="crypto-currency__card">
    <div 
      class="crypto-currency__card-body" 
      ref="cardBody"
    >
      <ListHeader />
      <List 
        :items="sortedListToken"
        :loading="loading"
        @update-height="resizeCardHeight"
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
        const card =  document.querySelector('.crypto-currency__card');
        const cardStyles = window.getComputedStyle(card, null);
        const cardPaddingTop = parseFloat(cardStyles.getPropertyValue('padding-top'));
        const cardPaddingBottom = parseFloat(cardStyles.getPropertyValue('padding-bottom'));

        const cardBody = this.$refs.cardBody;
        const cardBodyStyles = window.getComputedStyle(cardBody, null);
        const cardBodyHeight = parseFloat(cardBodyStyles.getPropertyValue('height'));
        
        card.style.setProperty('--height-card',`${cardPaddingTop + cardPaddingBottom + cardBodyHeight}px`);
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
    --height-card:auto;
    $height-card: var(--height-card);

    display:flex;
    flex-direction:column;
    gap: 5px;
    padding: 2rem;
    width: 100%;
    height: $height-card;
    transition: height .9s ease;

    &-body {
      position: relative;
      height: auto;
      width: 100%;
    }
  }
</style>