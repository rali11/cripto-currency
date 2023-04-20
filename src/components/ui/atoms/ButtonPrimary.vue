<template>
  <button :class="['btn',btnClass]">
    <slot />
  </button>
</template>

<script>
  export default {
    props:{
      role:{
        type:String,
        default:'primary',
        validator:function(role){
          return ['primary','secondary'].includes(role);
        }
      }
    },
    computed:{
      btnClass(){
        return `btn--${this.role}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .btn {
    padding: .7rem;  
    display: flex;
    height: variables.$height-btn;
    justify-content: center;
    align-items: center;    
    border: 2.5px solid variables.$border-btn;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-radius: 10px;      
    transition: all .3s;
    font-weight: 700;

    &--primary {
      color:  variables.$font-btn-primary;         
      background-color: variables.$background-btn-primary;  
    }

    &--secondary {
      color:  variables.$font-btn-secondary;         
      background-color: variables.$background-btn-secondary;  
    }
  }
</style>