import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listToken: [],
    isModeDeleteList:false,
    isSortAsc:false,
    orderBy:'',
  },
  mutations:{
    addToken(state, token){
      state.listToken.push(token);
    },
    deleteToken(state, {id}){
      const index = state.listToken.findIndex(token => token.id === id);
      state.listToken.splice(index,1);
    },
    changeToken(state, token){
      const index = state.listToken.findIndex(item => item.id === token.id);
      if(index !== -1){
        state.listToken.splice(index, 1, token);
      }
    },
    changeModeDelete(state, isEnabled){
      state.isModeDeleteList = isEnabled;
    },
    setOrderBy(state, key){
      state.orderBy = key;
    },
    changeSort(state, isAsc){
      state.isSortAsc = isAsc;
    }
  },
  getters:{
    listTokenId({listToken}){
      return listToken.map(token => token.id);
    },
    isModeDeleteList({isModeDeleteList}){
      return isModeDeleteList;
    },
    sortedListToken(state){
      return _.orderBy(state.listToken,[state.orderBy],[state.isSortAsc ? 'asc':'desc']);
    }
  }
});
