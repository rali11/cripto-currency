<template>
  <li 
    class="search-bar__results-item"
    @click.once="$emit('click')"
  >
    <figure class="search-bar__item-logo">
      <img :src="token.image">
    </figure>
    <div class="search-bar__item-description">
      <b>{{ token.name }}</b>
      <span>{{ token.tiker }}</span>
    </div>
    <Button :role="roleButton">
      <span>Select&nbsp;&nbsp;</span>
      <i 
        v-if="!token.loading" 
        :class="iconButton"
      />
      <i
        v-else
        class="bi-arrow-clockwise search-bar__btn-loading-selected" 
      />
    </Button>
  </li>
</template>

<script>
  import Button from '@/components/ui/atoms/Button.vue';

  export default {
    components:{
      Button,
    },
    props:{
      token:{
        type:Object,
        default:()=>({}),
        validator:function(token){
          let isValidate = true;
          const requiredKeys = ['id','name','tiker','loading','image','isAdded'];
          const keys = Object.keys(token);
          requiredKeys.forEach(key => {
            if(!keys.includes(key)){
              isValidate = false;
              return;
            }
          });
          return isValidate;
        }
      }
    },
    computed:{
      roleButton(){
        return this.token.isAdded ? 'success':'light';
      },
      iconButton(){
        return this.token.isAdded ? 'bi bi-check-lg':'bi bi-arrow-left-square-fill';
      }
    },
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";
  .search-bar {
    &__results-item {
      display: flex;
      padding: 0 1rem;
      align-items: center;
      height: 60px;
      gap: 1rem;
      border: 0 solid #eee;
      border-bottom-width: 1px;
      list-style: none;
      font-size: .9rem;
      transition: all .5s ease-in-out;
      
      &:hover {
        background-color: #eee;
      }
      
      button {
        margin-left: auto;
      }
    }

    &__item-logo {
      margin: 0;

      img {
        height: 2.5rem;
        width: 2.5rem;
        padding: 5px;
        border: 1px solid variables.$border-list-item-logo;  
        border-radius: 50%; 
      }
    }

    &__item-description {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: .9rem;
      overflow: hidden;

      span {
        color: variables.$font-result-item-ticker;
      }

      b {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &__btn-loading-selected {
      animation: .5s linear 0s infinite normal loading;
    }
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>