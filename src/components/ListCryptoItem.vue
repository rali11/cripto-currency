<template>
  <li class="card-style">
    <section class="primary-section">
      <figure class="image">
        <img 
          :class="[!img ? 'loading' : '']"
          :src="img" 
        >
      </figure>          
      <div class="text-content"> 
        <strong :class="[name ? '' : 'normal-skeleton loading']">
          {{ name }}
        </strong>
        <p :class="[symbol ? 'list-item-label' : 'small-skeleton loading']">
          {{ symbol|mayus }}
        </p>                
      </div>
    </section>
    <section class="metadata-section">  
      <p :class="[symbol ? 'list-item-label' : 'small-skeleton loading']">
        {{ !price ? '' : 'Price' }}   
      </p>   
      <p :class="[symbol ? 'list-item-label' : 'small-skeleton loading']">
        {{ !price ? '' : 'Change' }}  
      </p>
      <strong :class="[price ? priceClass : 'normal-skeleton loading']">
        {{ !price ? '' : priceFormat }}        
      </strong>
      <p :class="[change ? '' : 'normal-skeleton loading', percentClass] ">
        {{ change ? percentFormat : '' }}
        <i 
          v-show="change" 
          :class="arrowClass"
        />
      </p>
    </section>
  </li>
</template>

<script>
  import { gsap } from "gsap";
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import '../css/animation-skeleton.css';
    import '../css/color.css';

  export default {
    name: 'ListCryptoItem',
    props:{
      img:{
        type:String,
        default:''
      },
      symbol: {
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
        this.priceClass = newVal > oldVal ? 'positive' : 'negative';
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
      percentFormat(){
        return `${this.changeUpdate.toFixed(2)}%`;
      },
      priceFormat(){
        const options = {style: 'currency', currency: 'USD'};
        return new Intl.NumberFormat('en-US', options).format(this.decimalPrice);
      },
      percentClass(){
        return this.change > 0 ? 'positive' : 'negative'; 
      },
      arrowClass(){
        return this.change > 0 ? 'bi bi-arrow-up-right-circle' : 'bi bi-arrow-down-right-circle';
      }
    }
  }
</script>

<style scoped>
  @media (max-width: 575.98px) {
    li {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
    }
    .primary-section .text-content > p {
      grid-row:2/3;
    }
    .primary-section .text-content > strong {
      font-size: 1.1rem;
      text-overflow: ellipsis;    
      overflow: hidden;
      grid-row:1/2;
      color: var(--var-text-dark-color);
    }
    .metadata-section {
      display: flex;
      flex-direction: column;
    }
    .metadata-section > *:nth-child(-n+2){
      display: none;
    }
    .metadata-section > *:nth-child(3){
      font-size: 1.1rem;
      text-align: end;
      margin-left: auto;
      height: 50%;
      color: var(--var-text-dark-color);
    }
    .metadata-section > *:nth-child(4){
      margin-left: auto;
      text-align: end;    
      font-weight: 400;
      height: 50%;
    } 
  }
  @media (min-width: 576px) {
    li {
      display: grid;
      grid-template-columns: 1fr 1fr;        
    }    
    .primary-section .text-content > p {
      grid-row:1/2;
    }
    .primary-section .text-content > strong {
      font-size: 1.1rem;
      text-overflow: ellipsis;    
      overflow: hidden;
      color: var(--var-text-dark-color);
      grid-row:2/3;
    }
    .metadata-section {
      display: grid;
      grid-template-columns: 1fr 1fr; 
      gap: 0;
    }
    .metadata-section > *:nth-child(2){
      margin-left: auto;    
      text-align: end;
    }
    .metadata-section > *:nth-child(3){
      font-size: 1.1rem;
      color: var(--var-text-dark-color);
    }
    .metadata-section > *:nth-child(4){
      margin-left: auto;
      text-align: end;
      font-size: 1.1rem;
    }
  }
  .card-style{
    padding: 1.3rem;  
    margin-bottom:8px;
    border: 2px solid var(--var-border-color-card);
    border-radius:10px;
    background-color: var(--var-background-color-card);       
    transition: all .9s ease-in-out;
    cursor: pointer;  
  }
  .primary-section {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: .7rem;
  }
  .primary-section .image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .primary-section .image img {
    height:  3rem;
    width: 3rem;
    padding: 5px;
    border: 1px solid var(--var-border-color-img);  
    border-radius: 50%; 
  }
  .primary-section .text-content{    
    display: grid;
    grid-template-columns: 1fr;    
    overflow: hidden;
  }
  .list-item-label {
    margin:0;
    font-weight: 400;
    color:var(--var-secondary-color);
    text-overflow: ellipsis;
  }
  .small-skeleton {
    width: 40%;
    height: auto;
    margin-bottom:3px;
    margin-top:0;
  }
  .normal-skeleton {
    width: 80%;
    height: auto;
    margin-bottom:3px;
  }
  .positive {
    margin:0;
    color:var(--var-positive-color) !important;
  }
  .negative {
    margin:0;
    color:var(--var-negative-color) !important;
  }   
</style>