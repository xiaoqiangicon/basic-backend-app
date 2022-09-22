<template>
  <div class="home">
    <input type="username" v-model="userName" />
    <input type="password" v-model="password" />
    <button @click="register">注册</button>
    <button @click="getInfo">登陆</button>
    <button @click="del">删除</button>
    <button @click="logout">退出登陆</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  methods: {
    getInfo() {
      axios.post('/api/api/user/login', {
        userName: this.userName,
        password: this.password
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    register() {
      axios.post('/api/api/user/register', {
        userName: this.userName,
        password: this.password
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    del() {
      axios.post('/api/api/user/delUser', {
        userName: this.userName,
        password: this.password
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    logout() {
      axios.post('/api/api/user/logout', {}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
