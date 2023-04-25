<template>
  <li class="list-item">
    <section class="list-item__description">
      <transition 
        name="slide-fade" 
        mode="out-in"
      >
        <Button 
          v-if="modeDelete"
          key="delete"
          role="danger" 
          class="list-item__logo"
          @click.once="$emit('delete-event')"
        >
          <i class="bi bi-trash-fill" />
        </Button> 
        <img 
          v-else
          key="img"
          class="list-item__logo"
          :src="logo" 
        >
      </transition>
      <div class="list-item__description-text">         
        <p class="list-item__ticker">
          {{ ticker|mayus }}
        </p>                
        <strong class="list-item__name">
          {{ name }}
        </strong>
      </div>
    </section>
    <section class="list-item__price">
      <div class="list-item__value">
        <p class="list-item__label">
          {{ !price ? '' : 'Price' }}   
        </p> 
        <strong :class="priceClass">
          {{ !price ? '' : priceFormat }}        
        </strong>
      </div>
      <div class="list-item__percentage">    
        <p class="list-item__label">
          {{ !price ? '' : 'Change' }}  
        </p>
        <p :class="percentageClass">
          {{ change ? percentageFormat : '' }}
          <i 
            v-show="change" 
            :class="arrowClass"
          />
        </p>          
      </div>
    </section>
  </li>
</template>

<script>
  import { gsap } from "gsap";
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import Button from './Button.vue';

  export default {
  components: { Button },
    props:{
      logo:{
        type:String,
        default:''
      },
      ticker: {
        type:String,
        default:'',
      },
      name: {
        type: String,
        default:'',
      },
      price: {
        type:Number,
        default:0,
      },
      change: {
        type: Number,
        default:0,
      },
      modeDelete:{
        type: Boolean,
        default:false,
      }
    },
    data() {
      return {
        priceUpdate: this.price,
        changeUpdate: this.change,
        priceClass:'',
      }
    },
    watch:{
      price(newVal, oldVal){
        this.priceClass = newVal > oldVal ? 'list-item__price--positive' : 'list-item__price--negative';
        gsap.to(this.$data, {priceUpdate: newVal, duration:1});
      },
      change(newVal){
        gsap.to(this.$data, {changeUpdate: newVal, duration:1});
      }
    },
    filters:{
      mayus(val){
        return val.toUpperCase();
      }
    },
    computed: {      
      decimalPrice(){
        return this.priceUpdate.toFixed(3);
      },
      percentageFormat(){
        return `${this.changeUpdate.toFixed(2)}%`;
      },
      priceFormat(){
        const options = {style: 'currency', currency: 'USD'};
        return new Intl.NumberFormat('en-US', options).format(this.decimalPrice);
      },
      percentageClass(){
        return this.change > 0 ? 'list-item__price--positive' : 'list-item__price--negative'; 
      },
      arrowClass(){
        return this.change > 0 ? 'bi bi-arrow-up-right-circle' : 'bi bi-arrow-down-right-circle';
      },
    }
  }
</script>
<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .list-item { 
    --price-label-display: none; 
    --price-columns: 1;
    --price-align: end;
    --price-text-align: end;
    --order-ticker: 1;    

    list-style: none;
    padding: 1.3rem;  
    border: 0 solid variables.$border-list-item;
    border-bottom-width: 2.5px;
    border-radius:10px;
    background-color: variables.$background-list-item;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    transition: all .9s ease-in-out;

    & + & {      
      margin-top:12px;
    }

    &__description {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: .7rem;
    }

    &__logo {
      height: 3rem;
      width: 3rem;
      padding: 5px;
      border: 1px solid variables.$border-list-item-logo;  
      border-radius: 50%; 
    }
    
    &__name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 1rem;
    }   

    &__price {
      display: grid;
      grid-template-columns: repeat(var(--price-columns),auto);
      justify-content: var(--price-align);
      text-align: var(--price-text-align);
    } 

    &__price--positive {
      margin: 0;
      color: variables.$positive !important;
    }

    &__price--negative {
      margin: 0;
      color: variables.$negative !important;
    }

    &__value, 
    &__percentage,
    &__description-text {
      display: grid;
      grid-template-columns: 1fr;  
      align-items: center;
      height: 100%;
    }

    &__ticker {
      order:var(--order-ticker);
    }

    &__ticker,
    &__label {
      margin:0;
      font-weight: 500;
      color: variables.$font-list-item-label;
    }

    &__label {
      display: var(--price-label-display);
    }    
    
    &__percentage {
      text-align:end;
    }

    @media (min-width: variables.$tablet){
      --price-label-display: block;
      --price-columns: 2;
      --price-align: space-beetwen;      
      --price-text-align: start;
      --order-ticker: -1;
    }  
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>