<template>
    <i-col span="12" offset="">
        <Form inline :label-width="80" class="form">
            <FormItem label="昵称：" required>
                <Input placeholder="请输入昵称" v-model="username"></Input>
            </FormItem>
            <FormItem label="密码：" required>
                <Input type="password" placeholder="请输入密码" v-model="password"></Input>
            </FormItem>
            <row type="flex" align="middle" justify="center" class="code-row-bg">
                <i-col>
                    <Button type="primary" @click="submitForm">登陆</Button>
                </i-col>
                <i-col offset="4">
                    <Button type="primary">重置</Button>
                </i-col>
            </row>
        </Form>
    </i-col>
</template>
<script>
    import socketsend from "../websocket/socketsend";

    export default {
        name: "Login",
        data () {
            return {
                username:'',
                password:''
            }
        },
        methods : {
            submitForm:function () {
                socketsend(1, {username:this.username, password:this.password})
            }
        }
    }
</script>

<style scoped>
    .form {
        padding: 40% 0;
    }
</style>