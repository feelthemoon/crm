<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="email"
          v-model.trim="emailAddress"
          :disabled="loading"
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
          v-model="password"
          :disabled="loading"
          v-bind:class="{
            invalid:
              (v.password.$dirty && v.password.required.$invalid) ||
              (v.password.$dirty && v.password.minLength.$invalid)
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v.password.$dirty && v.password.required.$invalid"
          class="helper-text invalid"
          >Неверный пароль</small
        >
        <small
          v-else-if="v.password.$dirty && v.password.minLength.$invalid"
          class="helper-text invalid"
          >Неверный пароль</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <sync-loader
          class="loader"
          :loading="loading"
          :color="color"
          :size="size"
        ></sync-loader>
        <button
          :disabled="loading"
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { required, email, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import messages from "@/utils/messages";
import SyncLoader from "vue-spinner/src/SyncLoader";
export default {
  name: "Login",
  data: () => ({
    loading: false,
    color: SyncLoader.data().spinnerStyle.backgroundColor,
    size: SyncLoader.data().spinnerStyle.width
  }),
  setup() {
    const password = ref("");
    const emailAddress = ref("");
    const rules = {
      password: { required, minLength: minLength(8) },
      emailAddress: { required, email }
    };
    const v = useVuelidate(rules, { password, emailAddress });
    return { password, emailAddress, v };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      await this.v.$validate();
      if (!this.v.$invalid) {
        try {
          const formData = {
            email: this.emailAddress,
            password: this.password
          };
          this.loading = true;
          await this.$store.dispatch("login", formData);
          await this.$router.push("/");
          this.loading = false;
        } catch (e) {
          this.loading = false;
          console.clear();
        }
      }
    }
  },
  components: {
    SyncLoader
  }
};
</script>

<style lang="scss">
.loader {
  text-align: center;
  margin-bottom: 20px;
}
</style>
