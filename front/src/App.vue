<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from './components/Index'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style>
#app {
  /*width:100%;*/
  height:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
