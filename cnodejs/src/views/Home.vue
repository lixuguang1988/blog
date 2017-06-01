<template>
  <div class="">
      <div class="loading">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to CNodejs'
    }
  },
  mounted () {
    setTimeout(()=>{
      this.$router.push({
        name: "list",
        query: {
          tab: 'all'
        }
      });
    }, 2000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
