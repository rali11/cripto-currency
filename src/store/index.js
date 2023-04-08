import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listToken: [],
  },
  mutations:{
    addToken(state, token){
      state.listToken.push(token);
    },
  },
  getters:{
    listTokenId(state){
      return state.listToken.map(token => token.id);
    },
    listToken(state){
      return state.listToken;
    }
  }
});
