import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listToken: [],
    isModeDeleteList:false,
  },
  mutations:{
    addToken(state, token){
      state.listToken.push(token);
    },
    deleteToken(state, {id}){
      const index = state.listToken.findIndex(token => token.id === id);
      state.listToken.splice(index,1);
    },
    changeModeDelete(state, isEnabled){
      state.isModeDeleteList = isEnabled;
    }
  },
  getters:{
    listTokenId({listToken}){
      return listToken.map(token => token.id);
    },
    listToken({listToken}){
      return listToken;
    },
    isModeDeleteList({isModeDeleteList}){
      return isModeDeleteList;
    }
  }
});
