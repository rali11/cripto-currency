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
          return ['primary','secondary','success','danger'].includes(role);
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
    border: 1px solid variables.$border-btn; 
    border-radius: 10px;     
    background-color: transparent;
    transition: all .3s;
    font-weight: 700;

    &--primary {
      color:  variables.$font-btn-outline-primary;       
      border-color: variables.$border-btn-outline-primary;
    }

    &--secondary {
      color:  variables.$font-btn-outline-secondary;       
      border-color: variables.$border-btn-outline-secondary;  
    }

    &--success {
      color: variables.$font-btn-outline-success;
      border-color: variables.$border-btn-outline-success;
    }

    &--danger {
      color: variables.$font-btn-outline-danger;
      border-color: variables.$border-btn-outline-danger;
    }
  }
</style>