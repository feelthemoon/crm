<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            v-model="title"
            type="text"
            :class="{
              invalid: this.v.title.$dirty && this.v.title.required.$invalid
            }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="this.v.title.$dirty && this.v.title.required.$invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model="limit"
            type="number"
            :class="{
              invalid:
                (this.v.limit.$dirty && this.v.limit.minValue.$invalid) ||
                (this.v.limit.$dirty && this.v.limit.required.$invalid)
            }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="
              (this.v.limit.$dirty && this.v.limit.minValue.$invalid) ||
                (this.v.limit.$dirty && this.v.limit.required.$invalid)
            "
            >Минимальная величина</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  name: "CategoryCreate",
  setup() {
    const title = ref("");
    const limit = ref(100);
    const rules = {
      title: { required },
      limit: { required, minValue: minValue(100) }
    };
    const v = useVuelidate(rules, { title, limit });
    return { title, limit, v };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  emits: ["created"],
  methods: {
    async submitHandler() {
      await this.v.$validate();
      if (!this.v.$invalid) {
        try {
          const category = await this.$store.dispatch("createCategory", {
            title: this.title,
            limit: this.limit
          });
          this.title = "";
          this.limit = 100;
          this.v.$reset();
          this.$message("Категория была создана");
          this.$emit("created", category);
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    }
  }
};
</script>

<style scoped></style>
