<template>
  <li>
    <section class="logo-info">
      <figure>
        <img 
          :src="img" 
          alt="logo"
        >
      </figure>          
      <div>
        <p class="list-item-label">
          {{ symbol|mayus }}
        </p>
        <strong>
          {{ name }}
        </strong>
      </div>
    </section>
    <section>
      <p class="list-item-label">
        Price
      </p>
      <strong>
        {{ decimalPrice|englishFormat }}
      </strong>
    </section>
    <section class="change">
      <p class="list-item-label">
        24hs
      </p>
      <strong :class="changeClass">
        {{ changeUpdate|percentFormat }}
      </strong>
    </section>
  </li>
</template>

<script>
  import { gsap } from "gsap";

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
      }
     },
     watch:{
      price(newVal){
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
      englishFormat(val){
        const options = {style: 'currency', currency: 'USD'};
        return new Intl.NumberFormat('en-US', options).format(val);
      },
      percentFormat(val){
        return `${val.toFixed(2)}%`;
      }
     },
     computed: {      
      decimalPrice() {
        return this.priceUpdate.toFixed(3);
      },
      percentClass(){
        return this.change > 0 ? 'percent-positive' : 'percent-negative'; 
      },
      changeClass(){
        return !this.change ? '' : this.percentClass;
      }
     }
  }
</script>

<style scoped>
  li {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
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
  .percent-positive {
    margin:0;
    color:#31c090
  }
  .percent-negative {
    margin:0;
    color:#e94e4e
  } 
</style>