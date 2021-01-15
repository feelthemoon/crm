<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="email"
          :disabled="loading"
          v-model.trim="emailAddress"
          v-bind:class="{
            invalid:
              (v.emailAddress.$dirty && v.emailAddress.required.$invalid) ||
              (v.emailAddress.$dirty && v.emailAddress.email.$invalid)
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="v.emailAddress.$dirty && v.emailAddress.required.$invalid"
          class="helper-text invalid"
          >Поле Email не должно быть пустым</small
        >
        <small
          v-else-if="v.emailAddress.$dirty && v.emailAddress.email.$invalid"
          class="helper-text invalid"
          >Введите корректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :disabled="loading"
          v-model="password"
          v-bind:class="{
            invalid:
              (v.password.$dirty && v.password.required.$invalid) ||
              (v.password.$dirty && v.password.minLength.$invalid)
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="
            v.password.$dirty &&
              (v.password.required.$invalid || v.password.minLength.$invalid)
          "
          class="helper-text invalid"
          >Неверный пароль</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="userName"
          :disabled="loading"
          v-bind:class="{
            invalid: v.userName.$dirty && v.userName.required.$invalid
          }"
        />
        <label for="name">Имя</label>
        <small
          v-if="v.userName.$dirty && v.userName.required.$invalid"
          class="helper-text invalid"
          >Поле Name не должно быть пустым</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" :disabled="loading" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <sync-loader class="loader" :loading="loading" :color="color" :size="size"></sync-loader>
    <div class="card-action">
      <div>
        <button :disabled="loading" class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { required, email, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import SyncLoader from "vue-spinner/src/SyncLoader";
export default {
  name: "Register",
  data: () => ({
    loading: false,
    color: SyncLoader.data().spinnerStyle.backgroundColor,
    size: SyncLoader.data().spinnerStyle.width
  }),
  setup() {
    const password = ref("");
    const emailAddress = ref("");
    const userName = ref("");
    const agree = ref("");
    const rules = {
      password: { required, minLength: minLength(8) },
      emailAddress: { required, email },
      userName: { required },
      agree: { checked: val => val }
    };
    const v = useVuelidate(rules, { password, emailAddress, userName, agree });
    return { password, emailAddress, userName, agree, v };
  },
  methods: {
    async submitHandler() {
      await this.v.$validate();
      if (!this.v.$invalid) {
        const formData = {
          email: this.emailAddress,
          password: this.password,
          name: this.userName
        };
        try{
          this.loading = true;
          await this.$store.dispatch("register", formData);
          this.loading = false;
          await this.$router.push("/");
        } catch (e) {
          this.loading = false;
          console.clear();
        }
      }
    }
  },
  components:{
    SyncLoader
  }
};
</script>

<style lang="scss">
.loader{
  text-align: center;
  margin-bottom: 20px;
}
</style>
