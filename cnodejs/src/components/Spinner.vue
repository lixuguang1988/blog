<template>
    <div class="spinner">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>


<script>
export default {
  name: 'spinner',
//   props: {
//       background: background,
//       color: color 
//   }
}
</script>

<style>
.spinner{
    height: 60px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.spinner span{
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 20px 5px 0;
    background: #333;
    border-radius: 50%;
    animation: ptr .9s infinite
}
.spinner span:nth-child(2){
    animation-delay: .3s
}
.spinner span:nth-child(3){
    animation-delay: .6s
}



@keyframes ptr{
    0%{
        opacity: 0
    }
    50% {
        opacity: .5;
    }
    100% {
        opacity: 1
    }
}

</style>




