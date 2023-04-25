<template>
  <button 
    :class="['btn',btnClass]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
  import "@/assets/styles/components/Button.scss";

  export default {
    props:{
      role:{
        type:String,
        default:'primary',
        validator:function(role){
          return ['primary','secondary','success','danger','light'].includes(role);
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