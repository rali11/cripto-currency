<template>
  <label class="button-check">
    <input 
      type="checkbox"
      :checked="checked"
      @change="$emit('change',$event.target.checked)"
    >
    <transition 
      name="fade"
      mode="out-in"
    >
      <div :class="['btn',roleClass]">
        <i
          v-if="checked"
          key="checked"
          class="bi bi-x-lg"
        />
        <div 
          v-else
          key="unchecked"
        >
          <slot />  
        </div>
      </div>
    </transition>
  </label>
</template>

<script>
export default {
  props:{
    checked:{
      type:Boolean,
      default:false,
    },
    role:{
      type:String,
      default:'primary',
      validator:function(role){
        return ['primary','secondary','success','danger','light'].includes(role);
      }
    }
  },
  model:{
    prop:'checked',
    event:'change',
  },
  computed:{
    roleClass(){
      return `btn--${this.role}`;
    }
  }
}
</script>

<style lang="scss">
  .button-check {
    input[type='checkbox']{
      display: none;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>>