<template>
    <row  type="flex" justify="center" align="middle" class="code-row-bg index" >
        <Login></Login>
    </row>
</template>

<script>
    import Login from './Login'
    import Register from './Register'
    export default {
        name: "Index",
        components: {
            Login:Login,
            Register:Register
        }
    }
</script>

<style scoped>
    .index{
        width:40%;
        background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535734879695&di=a8239f24a01e165d898cf32871edfe80&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D5b1ce110f41f3a295a9dddcaac159007%2F500fd9f9d72a6059f265a1d42c34349b023bba83.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>