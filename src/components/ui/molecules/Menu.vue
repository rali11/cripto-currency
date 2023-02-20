<template>
  <div class="menu">
    <button
      @click="displayMenu"
      @focusout="showMenu = false"
      ref="btnMenu"
      class="menu__btn"
    >
      <slot />
    </button>
    <transition name="menu-anim">
      <ul
        v-show="showMenu" 
        class="menu__hover-list"
      >
        <li 
          v-for="(item, index) in list"
          :class="['menu__hover-item', item.selected ? 'menu__hover-item--selected':'']"
          @click="selected(item.value)"
          :key="index"
        >
          {{ item.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    model:{
      prop:'value',
      event:'selected'
    },
    props:{
      list:{
        type:Array,
        default:() => {}
      },
      value:{
        type:String,
        default:'',
      }
    },
    data(){
      return {
        showMenu:false,
      }
    },
    methods:{
      selected(value){
        this.list.forEach(item => {
          if(item.value === value){
            item.selected = true;
          } else {
            item.selected = false;
          }
          this.$emit('selected', value);
        })
      },
      displayMenu(){
        this.showMenu = true;
        this.$refs.btnMenu.focus();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .menu {
    position: relative;

    & + & {
      margin-left: 10px;
    }

    &__btn {      
      padding: .7rem;  
      display: flex;
      justify-content: center;
      align-items: center;
      color:  variables.$font-menu;
      border: 2.5px solid variables.$border-menu;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      border-radius:10px;      
      background-color: variables.$background-menu;  
      transition: all .3s;
      font-weight: 600;
    }

    &__hover-list {
      list-style: none;
      position:absolute;
      top:100%;
      right: 0;
      margin-top: .3rem;
      border: 0px solid variables.$border-menu; 
      border-radius:10px; 
      background-color: variables.$background-menu;
      font-weight: 500;
      padding: 0rem;
      z-index: 1;      
      color:  variables.$font-menu;
      overflow: hidden;
      box-shadow:
        0px 2.6px 2.2px rgba(0, 0, 0, 0.008),
        0px 6.3px 5.3px rgba(0, 0, 0, 0.012),
        0px 11.8px 10px rgba(0, 0, 0, 0.015),
        0px 21px 17.9px rgba(0, 0, 0, 0.018),
        0px 39.3px 33.4px rgba(0, 0, 0, 0.022),
        0px 94px 80px rgba(0, 0, 0, 0.03)
      ;
    }

    &__hover-item {
      padding: .5rem .8rem;
      cursor: default;

      &:hover, &--selected {
        color:  variables.$font-menu;
        background-color: variables.$background-menu-item-selected;
      }  
    }
    
    &-anim-enter-active ,&-anim-leave-active {
      transition: all .3s;  
    }

    &-anim-enter, &-anim-leave-to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
</style>