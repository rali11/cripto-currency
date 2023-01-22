

export const createStream = async () => {
  const ws = await createWebSocket();
  return {
    messageListener(callback){
      ws.addEventListener('message',callback);
    },
    subscribeStream(arrayStreamName){
      const data = {
        method:"SUBSCRIBE",
        params: arrayStreamName,
        id:1,
      };
      ws.send(JSON.stringify(data));
    },
    unsubscribeStream(arrayStreamName){
      const data = {
        method:"UNSUBSCRIBE",
        params: arrayStreamName,
        id:2,
      };
      ws.send(JSON.stringify(data));
    },
    closeStream(){
      ws.close();
    }
  }
}

const createWebSocket = () => new Promise((resolve, reject) => {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws");
  ws.addEventListener('open',() => resolve(ws));
  ws.addEventListener('error',event => reject(event));
});
