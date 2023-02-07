<template>
  <div class="lines">
    <div>
      <div class="line circle pulse" />
      <div class="center">
        <div class="line pulse" />
        <div class="line pulse" />
      </div>
    </div>
    <div class="center">
      <div class="line pulse" />
      <div class="line pulse" />
    </div>
    <div class="center mobile-none">
      <div class="line pulse" />
      <div class="line pulse" />
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @use "@/assets/styles/settings/variables";

  .lines {
    --grid-lines-column: 2;

    height: 100%;
    display:grid;
    grid-template-columns: repeat(var(--grid-lines-column), 1fr);
    background-color: variables.$list-item-background;
    padding: 1.3rem;  
    border: 2px solid variables.$list-item-border;
    border-radius:10px;
    gap:1rem;

    & + & {      
      margin-top:8px;
    }

    div:first-child {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
    }

    .center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin:0;
      gap: 5px;
    }
    
    .line {
      background-color: #f5f5f5;
      height: 1rem;
    }

    .circle {
      border-radius: 50%; 
      height: 3rem;
      width: 3rem;
      padding: 5px;
    }

    .mobile-none {
      display: none;
    }

    @media (min-width: variables.$tablet){
      --grid-lines-column: 3;
      .mobile-none {
        display: flex;
      }
    }  
  }

  .pulse {
    height: 100%;
    width: 100%;
    background: linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%);
    background-size: 400% 400%;
    animation: pulse 1.2s ease-in-out infinite;
    @keyframes pulse {
      0% {
        background-position: 0% 0%
      }
      100% {
        background-position: -135% 0%
      }
    }
  }
</style>