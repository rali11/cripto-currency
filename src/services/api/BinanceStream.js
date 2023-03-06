/* eslint-disable */
import _ from 'lodash';

const streamUrl = "wss://stream.binance.com:9443/ws";

export class StreamCryptoMarket {
  #webSocket;

  async addObserver(observerInstance){   
    !this.#webSocket && await this.#createWebSocket();
    this.#subscribeWebSocket(observerInstance.getParamSubscribeStream());
    this.#webSocket.addEventListener('message', event => {
      observerInstance.notify(event, this);
    });  
  }

  removeObserver(observerInstance){
    this.#unsubscribeWebSocket(observerInstance.getParamSubscribeStream());
    this.#webSocket.removeEventListener('message', event => {
      observerInstance.notify(event, this);
    })
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
  #infoTokens;
  #infoTokensBefore;

  constructor(infoTokens){
    this.#infoTokens = infoTokens;
    this.#infoTokensBefore = infoTokens.map(item => ({...item}));
  }

  notify(event, streamMarket){    
    const data = JSON.parse(event.data);    
    if(data.e === 'trade'){
      this.#infoTokens.find(item => data.s.toLowerCase().includes(item.symbol)).price = parseFloat(data.p);
    }  
    if(data.e === '24hrTicker'){
      this.#infoTokens.find(item => data.s.toLowerCase().includes(item.symbol)).change = parseFloat(data.P);
    } 
    if (this.#isInfoTokensDifferent()){    
      this.#infoTokensBefore = this.#infoTokens.map(item => ({...item}));  
      streamMarket.removeObserver(this);
      streamMarket.addObserver(this);
    }
  }
  
  #isInfoTokensDifferent(){
    const oldList = this.#infoTokensBefore.map(item => item.symbol);
    const newList = this.#infoTokens.map(item => item.symbol);
    if (oldList.length !== newList.length) {
      return true;
    }
    const arrayDif = newList.filter(token => !oldList.includes(token));
    if(arrayDif.length){
      return true;
    }
    return false;
  }

  getParamSubscribeStream(){
    const tokensList = this.#infoTokens.map(item => item.symbol);
    const tradeParameter = tokensList.join('usdt@trade;').concat('usdt@trade').split(';');
    return [
      ...tradeParameter, 
      ...tradeParameter.map(item => item.replace('trade','ticker'))
    ];
  }
}

