<template>
  <li>
    <section class="logo-info">
      <figure>
        <img 
          :class="[!img ? 'loading' : '']"
          :src="img" 
        >
      </figure>          
      <div class="w-100">
        <p :class="[symbol ? 'list-item-label' : 'symbol-skeleton loading'] ">
          {{ symbol|mayus }}
        </p>
        <strong :class="[name ? '' : 'name-skeleton loading']">
          {{ name }}
        </strong>
      </div>
    </section>
    <section class="w-100">
      <p :class="[price ? 'list-item-label' : 'symbol-skeleton loading']">
        {{ price ? 'Price' : '' }}
      </p>
      <strong :class="[price ? priceClass : 'name-skeleton loading']">
        {{ !price ? '' : priceFormat }}
        <i 
          v-if="priceClass === 'positive'" 
          class="bi bi-arrow-up-right-circle"          
        />
        <i
          v-if="priceClass === 'negative'"
          class="bi bi-arrow-down-right-circle" 
        />
      </strong>
    </section>
  </li>
</template>

<script>
  import { gsap } from "gsap";
  import 'bootstrap-icons/font/bootstrap-icons.css';

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
      },
      percentFormat(val){
        return `${val.toFixed(2)}%`;
      }
     },
     computed: {      
      decimalPrice(){
        return this.priceUpdate.toFixed(3);
      },
      priceFormat(){
        const options = {style: 'currency', currency: 'USD'};
        return new Intl.NumberFormat('en-US', options).format(this.decimalPrice);
      },
      percentClass(){
        return this.change > 0 ? 'positive' : 'negative'; 
      },
      changeClass(){
        return !this.change ? '' : this.percentClass;
      }
     }
  }
</script>

<style scoped>
  .w-100{
    width: 100%;
  }
  .loading {
    background: #eee;
    background: linear-gradient(90deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    border-width: 0;
  }
  .symbol-skeleton {
    display: block;
    width: 40%;
    height: 50%;
    margin-bottom:3px;
    margin-top:0;
  }
  .name-skeleton {
    display: block;
    width: 80%;
    height: 50%;
    margin-bottom:3px;
  }
  li {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: auto;
    padding: 1.5rem;  
    margin-bottom:8px;
    border: 2px solid #f2f3f5;
    border-radius:10px;
    background-color: white;       
    transition: all .9s ease-in-out;
    overflow: hidden;
    cursor: pointer;    
  }
  li > *{
    overflow: hidden;
  }
  li > *:last-child{
    padding-left: 25%;
  }
  li figure img {
    height:  3rem;
    width: 3rem;
    padding: 5px;
    border: 1px solid #eeeeee;  
    border-radius: 50%; 
  }
  li .logo-info {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }
  li .logo-info figure {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0;
  }
  .list-item-label {
    margin:0;
    font-weight: 400;
    color:#95949d;
  }
  .positive {
    margin:0;
    color:#31c090
  }
  .negative {
    margin:0;
    color:#e94e4e
  } 
  @keyframes shine {
  to {
    background-position-x: -200%;
    }
  }
</style>