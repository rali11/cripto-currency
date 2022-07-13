<template>
  <li>
    <section class="logo-info">
      <figure>
        <img 
          :class="[!img ? 'loading' : '']"
          :src="img" 
        >
      </figure>          
      <div class=""> 
        <strong :class="[name ? '' : 'normal-skeleton loading']">
          {{ name }}
        </strong>
        <p :class="[symbol ? 'list-item-label' : 'small-skeleton loading'] ">
          {{ symbol|mayus }}
        </p>                
      </div>
    </section>
    <section class="price-section">      
      <strong :class="[price ? priceClass : 'normal-skeleton loading']">
        {{ !price ? '' : priceFormat }}        
      </strong>
      <p :class="[change ? '' : 'small-skeleton loading', percentClass] ">
        {{ !change ? '' : percentFormat }}
        <i 
          v-if="change > 0" 
          class="bi bi-arrow-up-right-circle"          
        />
        <i
          v-if="change < 0"
          class="bi bi-arrow-down-right-circle" 
        />
      </p>
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
      changeClass(){
        return !this.change ? '' : this.percentClass;
      }
    }
  }
</script>

<style scoped>
  .loading {
    background: #eee;
    background: linear-gradient(90deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    border-width: 0;
  }
  .small-skeleton {
    width: 40%;
    height: 50%;
    margin-bottom:3px;
    margin-top:0;
  }
  .normal-skeleton {
    width: 80%;
    height: 50%;
    margin-bottom:3px;
  }
  li {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    padding: 1.3rem;  
    margin-bottom:8px;
    border: 2px solid #f2f3f5;
    border-radius:10px;
    background-color: white;       
    transition: all .9s ease-in-out;
    cursor: pointer;    
  }
  .logo-info {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: .7rem;
  }
  .logo-info figure {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .logo-info figure img {
    height:  3rem;
    width: 3rem;
    padding: 5px;
    border: 1px solid #eeeeee;  
    border-radius: 50%; 
  }
  .logo-info > *:last-child{    
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;    
    overflow: hidden;
  }
  .logo-info > *:last-child > *{
    text-overflow: ellipsis;    
    overflow: hidden;
  }
  .logo-info > *:last-child > strong {
    font-size: 1.1rem;
  }
  .price-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;    
  }
  .price-section > *:first-child{
    font-size: 1.1rem;
  }
  .list-item-label {
    margin:0;
    font-weight: 400;
    color:#95949d;
    text-overflow: ellipsis;
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