<script setup>
import Login from "@/components/Login.vue";
import { ref } from "vue"
import router from "../router"

const loginInfo = ref({"username":"", "password":""})  
const tokens = ref()

async function loginPost(){
  const data = new URLSearchParams();
  data.append("password", loginInfo.value.password);
  data.append("username", loginInfo.value.username);

   const loginRes = await fetch(
    "http://localhost:8081/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data
    }
  )
  tokens.value = await loginRes.json();
  console.log(tokens.value)
  localStorage.setItem('access_token', tokens.value.access_token);
  
  router.push("/catalog")

  }

</script>

<template>
    <div class="row justify-content-center">
      <div class="col-md-4 p-5 mt-5" style="background:azure">
        <h1>Giriş</h1>
        <form v-on:submit.prevent="loginPost" >
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Kullanıcı Adı</label
            >
            <input
            v-model="loginInfo.username"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Parola</label>
            <input v-model="loginInfo.password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" class="btn btn-primary">Giriş</button>
        </form>
      </div>
    </div>

</template>
