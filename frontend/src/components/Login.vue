<template>
  <div class="container">
    <input
      type="text"
      v-model="Form.email"
      placeholder="Digite o email"
    >
    <input
      type="password"
      v-model="Form.password"
      placeholder="Digite a senha"
    >
    <div>
      <button
        @click="Enviar()"
        type="submit"
      >Entrar</button>
      <button
        @click="Reset()"
        type="submit"
      >Reset</button>
    </div>

    <div>
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
        >
          {{ user.username }}
          {{ user.email }}
          <button @click="(() => {alert(user.id)})">Editss</button>
          <button @click="(() => {alert(user.id)})">Delete</button>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import { AsyncDataMixin } from "vue-async-data-2";
  // import axios from "axios";
  // const baseUrl = 'http://localhost:8080/api/v1/users/'
  export default {
    name: 'ComponentLogin',
    mixins: [AsyncDataMixin],
    data () {
      return {
        Form: {
          email: '',
          password: ''
        },
        users: []
      }
    },
    asyncData: {
      usersDefault: [],
      async users () {
        const axiosConfig = {
          method: 'get',
          url: '/',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            'Content-Type': 'application/json'
          }
        }
        console.log(axiosConfig);
        const Response = await this.$axios(axiosConfig).then(R => R.data).catch(this.AxiosCatch)
        console.log(Response);
        return Response
      }
    },
    methods: {
      async Enviar () {
        const axiosConfig = {
          method: 'post',
          url: '/login',
          data: JSON.parse(JSON.stringify(this.Form))
        }

        const Response = await this.$axios(axiosConfig).then(R => R.data).catch(this.AxiosCatch)
        localStorage.setItem('ACCESS_TOKEN', Response)
        await this.asyncReload('users')
        await this.$acl.change('authenticated')
        await this.$router.push('/')
      },
      async Reset () {
        this.users = []
        await localStorage.removeItem('ACCESS_TOKEN');
        await this.asyncReload('users')
      }
    },

  }
</script>

<style>
  div {
  }
</style>
