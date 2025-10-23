// /* eslint-disable */
import store from "@/store";
import { Throttle } from "@/components/shared/Utils";
import Vue from "vue";

const vm = new Vue();

const getWebSocket = () => {
    return new Promise((resolve, reject) => {
      const webSocket = new WebSocket("wss://stream.binance.com:9443/ws");
      webSocket.addEventListener('open', () => resolve(webSocket));
      webSocket.addEventListener('error', () => reject());
    });
  }

const getParamSubscribeStream = listToken => {
  const listTokenSymbol = listToken.map(
    (item) => item.symbol
  );
  const tradeParameter = listTokenSymbol
    .join("usdt@trade;")
    .concat("usdt@trade")
    .split(";");
  const tickerParameter = tradeParameter.map((item) =>
    item.replace("trade", "ticker")
  );
  return [...tradeParameter, ...tickerParameter];
};

export const binanceStream = async () => {
  const webSocket = await getWebSocket();
  webSocket.addEventListener("message", (event) => {
    Throttle(() => {
      const data = JSON.parse(event.data);
      if (data.e === "trade") {
        const token = store.getters.sortedListToken.find((item) =>
          data.s.toLowerCase().includes(item.symbol)
        );
        if (token) {
          Vue.set(token, "price", parseFloat(data.p));
        }
      }
      if (data.e === "24hrTicker") {
        const token = store.getters.sortedListToken.find((item) =>
          data.s.toLowerCase().includes(item.symbol)
        );
        if (token) {
          store.commit("changeToken", token);
          Vue.set(token, "change", parseFloat(data.P));
        }
      }
    }, 1000);
  });

  const subscribeWebSocket = () => {
    const data = {
      method:"SUBSCRIBE",
      params: getParamSubscribeStream(store.getters.sortedListToken),
      id:1,
    }
    webSocket.send(JSON.stringify(data));
  }

  const unsubscribeWebSocket = () => {
    const data = {
      method:"UNSUBSCRIBE",
      params: getParamSubscribeStream(store.getters.sortedListToken),
      id:1,
    }
    webSocket.send(JSON.stringify(data));
  }

  subscribeWebSocket();

  vm.$watch(
    () => store.state.listToken,
    (newVal, oldVal) => {
      unsubscribeWebSocket(getParamSubscribeStream(oldVal));
      subscribeWebSocket(getParamSubscribeStream(newVal));
    }
  );
};