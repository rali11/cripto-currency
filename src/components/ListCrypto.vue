<template> 
  <div>
    <template v-if="infoTokens.length !== tokens.length">
      <ListCryptoItem 
        v-for="n in tokens.length" 
        :key="n"
      />
    </template>
    <template v-else>
      <transition-group 
        name="list" 
        tag="ul"
      >          
        <ListCryptoItem
          v-for="item in infoTokens"
          :key="item.id"
          :img="item.img"
          :symbol="item.symbol"
          :name="item.name"
          :price="item.price"
          :change="item.change"
        />
      </transition-group> 
    </template>    
  </div>  
</template>

<script>
  import ListCryptoItem from "./ListCryptoItem.vue";

  export default {
    name: 'ListCrypto',
    components:{
      ListCryptoItem,
    },
    data(){
      return {
        tokens:[
          'bitcoin',
          'ethereum',
          'binancecoin',
          'cardano',
          'pancakeswap-token',
          'matic-network',
          'polkadot',
          'terra-luna-2',
          'solana'
        ],
        infoTokens:[],      
      }
    },
    computed:{
      combinedStreams(){
        return this.infoTokens.reduce((acc, item, index, tokens) => {
          const lastItem = index === tokens.length-1;
          return `${acc}${item.symbol}usdt@trade${lastItem ? '' : '/'}`;
        },'stream?streams=');
      }
    },
    mounted(){   
      try {
        this.getInfoTokens();
      } catch (error) {
        console.log(error);
      }
    },
    methods:{
      async getInfoTokens(){
        for (const item of this.tokens) {
          const dataToken = await this.fetchInfo(item);
          this.infoTokens.push({
            id:item,
            img:dataToken.image.small,
            symbol:dataToken.symbol,
            name:dataToken.name,
            price:dataToken.market_data.current_price.usd,
            change:0,
          })
        }
        this.connectBinanceStream();
      },
      async fetchInfo(idToken){
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idToken}`);
        const json = await response.json();
        return json;
      },
      connectBinanceStream(){
        const binanceStream = new WebSocket(`wss://stream.binance.com:9443/${this.combinedStreams}`);
        binanceStream.addEventListener('message',this.updateToken);
      },
      updateToken(event){
        const dataStream = JSON.parse(event.data).data;
        const indexToken = this.infoTokens.findIndex(item => dataStream.s.toLowerCase().includes(item.symbol));
        this.infoTokens[indexToken].price = parseFloat(dataStream.p);
      }
    }
  }
</script>
<style scoped>
  ul {
    position: relative;
    margin:0;
    padding:0;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
  }
  .list-leave-active {
    width: 100%;
    position: absolute;
  }
</style>
