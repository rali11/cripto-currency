<template> 
  <div>
    <transition-group 
      name="list" 
      tag="ul"
    >          
      <ListCryptoItem
        v-for="item in tokens"
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
   /*global _,  */ 
  import ListCryptoItem from "./ListCryptoItem.vue";

  export default {
    name: 'ListCrypto',
    components:{
      ListCryptoItem,
    },
    data(){
      return{
        tokens:[
          {
            id:"bitcoin",
            name:"Bitcoin",
            symbol:"btc",
            img:"https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
            price:21421,
            change:-4,
          },
          {
            id:"ethereum",
            name:"Ethereum",
            symbol:"eth",
            img:"https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
            price:1234.19,
            change:343,
          },
           {
            id:"binancecoin",
            name:"BNB",
            symbol:"bnb",
            img:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850",
            price:238.57,
            change:20,
          },
           {
            id:"cardano",
            name:"Cardano",
            symbol:"ada",
            img:"https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860",
            price:0.5,
            change:20,
          },
          {
            id:"pancakeswap-token",
            name:"PancakeSwap",
            symbol:"cake",
            img:"https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png?1629359065",
            price:1.002,
            change:20,
          },
          {
            id:"matic-network",
            name:"Polygon",
            symbol:"matic",
            img:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
            price:0.59,
            change:20,
          },
          {
            id:"polkadot",
            name:"Polkadot",
            symbol:"dot",
            img:"https://assets.coingecko.com/coins/images/12171/small/polkadot.png?1639712644",
            price:8.1,
            change:20,
          },
        ], 
      }
    },
    computed:{
      combinedStreams(){
        return this.tokens.reduce((acc, item, index, tokens) => {
          const lastItem = index === tokens.length-1;
          return `${acc}${item.symbol}usdt@trade${lastItem ? '' : '/'}`;
        },'stream?streams=');
      }
    },
    mounted(){   
      this.connectBinanceStream();
    },
    methods:{
      connectBinanceStream(){
        const binanceStream = new WebSocket(`wss://stream.binance.com:9443/${this.combinedStreams}`);
        binanceStream.addEventListener('message',this.updateToken);
      },
      updateToken(event){
        const dataStream = JSON.parse(event.data).data;
        const indexToken = this.tokens.findIndex(item => dataStream.s.toLowerCase().includes(item.symbol));
        this.tokens[indexToken].price = parseFloat(dataStream.p);
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
