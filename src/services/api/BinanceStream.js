/* eslint-disable */
import { Throttle } from "@/components/shared/Throttle";

const streamUrl = "wss://stream.binance.com:9443/ws";

export class StreamCryptoMarket {
  #webSocket;

  async addObserver(observerInstance){   
    !this.#webSocket && await this.#createWebSocket();
    this.#subscribeWebSocket(observerInstance.getParamSubscribeStream());
    const self = this;
    this.#webSocket.addEventListener('message', event => {
      Throttle(() => {
        observerInstance.notify(event, self);
      },250)
    });  
  }

  removeObserver(observerInstance){
    this.#unsubscribeWebSocket(observerInstance.getParamSubscribeStream());
    const self = this;
    this.#webSocket.removeEventListener('message',event => {
      Throttle(() => {
        observerInstance.notify(event, self);
      },250)
    });
  }

  #createWebSocket(){
    return new Promise((resolve, reject) => {
      this.#webSocket = new WebSocket(streamUrl);
      this.#webSocket.addEventListener('open', () => resolve());
      this.#webSocket.addEventListener('error', event => reject());
    });    
  }

  #subscribeWebSocket(getParamSubscribeStream){        
    const data = {
      method:"SUBSCRIBE",
      params: getParamSubscribeStream,
      id:1,
    }    
    this.#webSocket?.send(JSON.stringify(data));
  }

  #unsubscribeWebSocket(getParamSubscribeStream){
    const data = {
      method:"UNSUBSCRIBE",
      params: getParamSubscribeStream,
      id:1,
    }    
    this.#webSocket.send(JSON.stringify(data));
  }
}

export class StreamCryptoMarketObserver {  
  #listToken;
  #oldListToken;

  constructor(listToken){
    this.#listToken = listToken;
    this.#oldListToken = listToken.map(item => ({...item}));
  }

  notify(event, streamCryptoMarket){    
    const data = JSON.parse(event.data);
    if(data.e === 'trade'){
      const token = this.#listToken.find(item => data.s.toLowerCase().includes(item.symbol));
      if(token){
        token.price = parseFloat(data.p)
      }
    }  
    if(data.e === '24hrTicker'){
      const token = this.#listToken.find(item => data.s.toLowerCase().includes(item.symbol));
      if(token){
        token.change = parseFloat(data.P);
      }
    } 
    if (this.#isListTokenModified()){  
      streamCryptoMarket.removeObserver(this);
      this.#oldListToken = this.#listToken.map(item => ({...item}));  
      streamCryptoMarket.addObserver(this);
    }
  }
  
  #isListTokenModified(){
    const oldListTokenSymbol = this.#oldListToken.map(item => item.symbol);
    const listTokenSymbol = this.#listToken.map(item => item.symbol);
    if (oldListTokenSymbol.length !== listTokenSymbol.length) {
      return true;
    }
    const arrayDif = listTokenSymbol.filter(token => !oldListTokenSymbol.includes(token));
    if(arrayDif.length){
      return true;
    }
    return false;
  }

  getParamSubscribeStream(){
    const listTokenSymbol = this.#oldListToken.map(item => item.symbol);
    const tradeParameter = listTokenSymbol.join('usdt@trade;').concat('usdt@trade').split(';');
    const tickerParameter = tradeParameter.map(item => item.replace('trade','ticker'));
    return [
      ...tradeParameter, 
      ...tickerParameter
    ];
  }
}

