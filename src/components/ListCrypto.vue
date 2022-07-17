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
  import _ from 'lodash';

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
        stackChange:[],  
      }
    },
    computed:{
      combinedTradeStreams(){
        return this.infoTokens.reduce((acc, item, index, tokens) => {
          const isLastItem = index === tokens.length-1;
          return `${acc}${item.symbol}usdt@trade${isLastItem ? '' : '/'}`;
        },'stream?streams=');
      },
      combinedTickerStream(){
        return this.infoTokens.reduce((acc, item, index, tokens) => {
          const isLastItem = index === tokens.length-1;
          return `${acc}${item.symbol}usdt@ticker${isLastItem ? '' : '/'}`;
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
            change:dataToken.market_data.price_change_percentage_24h,
          })
        }
        this.createBinanceStreams();
      },
      async fetchInfo(idToken){
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idToken}`);
        const json = await response.json();
        return json;
      },
      createBinanceStreams(){
        const tradeStream = new WebSocket(`wss://stream.binance.com:9443/${this.combinedTradeStreams}`);
        const tickerStream = new WebSocket(`wss://stream.binance.com:9443/${this.combinedTickerStream}`);
        tradeStream.addEventListener('message',this.updateTradeToken);
        tickerStream.addEventListener('message',this.updateChangeToken)
        setInterval(() => {
          this.stackChange.splice(0,10).forEach(dataStream => {
            if(dataStream){
              const indexToken = this.infoTokens.findIndex(item => dataStream.s.toLowerCase().includes(item.symbol));
              this.infoTokens[indexToken].change = parseFloat(dataStream.P);              
            }      
          });
          this.infoTokens = _.orderBy(this.infoTokens,['change'],['desc']);
        },1000)
      },
      updateTradeToken(event){
        const dataStream = JSON.parse(event.data).data;
        const indexToken = this.infoTokens.findIndex(item => dataStream.s.toLowerCase().includes(item.symbol));
        this.infoTokens[indexToken].price = parseFloat(dataStream.p);
      },
      updateChangeToken(event){        
        this.stackChange.push(JSON.parse(event.data).data);
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
