<template> 
  <div>    
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
  </div>  
</template>

<script>
  import ListCryptoItem from "./ListCryptoItem.vue";
  import _ from 'lodash';
  import {createStream} from '../services/BinanceApi.js';

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
        ],
        infoTokens:[],    
        stackChange:[],  
      }
    },
    computed:{
      combinedTradeStreams(){
        return this.arraySymbolCrypto.join('usdt@trade;').concat('usdt@trade').split(';');
      },
      combinedTickerStream(){
        return this.arraySymbolCrypto.join('usdt@ticker;').concat('usdt@ticker').split(';');
      },
      arraySymbolCrypto(){
        return this.infoTokens.map(item => item.symbol);
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
      async createBinanceStreams(){
        try {
          const binanceStreamTicker = await createStream();
          const binanceStreamTrade = await createStream();
          binanceStreamTicker.subscribeStream(this.combinedTickerStream);
          binanceStreamTicker.messageListener(this.updateChangeToken);
          binanceStreamTrade.subscribeStream(this.combinedTradeStreams);
          binanceStreamTrade.messageListener(this.updateTradeToken);
          this.intervalFunction();
        } catch (error) {
          console.log(error);
        }       
      },
      responseEventpriceStream(data){
        data.e === 'trade' ? this.updateTradeToken(data) : this.updateChangeToken(data);
      },
      updateTradeToken(event){
        const data = JSON.parse(event.data);
        if(data.e === 'trade'){
          const indexToken = this.infoTokens.findIndex(item => data.s.toLowerCase().includes(item.symbol));
          this.infoTokens[indexToken].price = parseFloat(data.p);
        }        
      },
      updateChangeToken(event){        
        this.stackChange.push(JSON.parse(event.data));
      },
      intervalFunction(){
        setInterval(() => {
          this.stackChange.splice(0,10).forEach(dataStream => {
            if(dataStream.e === '24hrTicker'){
              const indexToken = this.infoTokens.findIndex(item => dataStream.s.toLowerCase().includes(item.symbol));
              this.infoTokens[indexToken].change = parseFloat(dataStream.P);              
            }      
          });
          this.infoTokens = _.orderBy(this.infoTokens,['change'],['desc']);
        },1000);
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
