<template>
  <!-- Vue Router -->
  <div class="app"> 
  <router-view /> 

  </div>
 



</template>

<script>



export default {
   

}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "kanit", sans-serif;
  font-weight: 400;
}
.app {
  min-height: 100%;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
