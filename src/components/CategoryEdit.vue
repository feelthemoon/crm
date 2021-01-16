<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          <label for="limit">Лимит, ₽</label>
          <span
            class="helper-text invalid"
            v-if="
              (this.v.limit.$dirty && this.v.limit.minValue.$invalid) ||
                (this.v.limit.$dirty && this.v.limit.required.$invalid)
            "
            >Минимальная величина: {{v.limit.minValue.$params.min}}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
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
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
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
  data: () => ({
    select: null,
    current: null
  }),
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.title = title;
    this.limit = limit;
    this.current = id;
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  unmounted() {
    this.select?.destroy();
  },
  emits:["updated"],
  methods: {
    async submitHandler() {
      await this.v.$validate();
      if (!this.v.$invalid) {
        try{
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          }
          await this.$store.dispatch("updateCategory", categoryData);
          this.$message("Категория успешно обновлена");
          this.$emit("updated", categoryData);
          // eslint-disable-next-line no-empty
        }catch (e) {

        }
      }
    }
  }
};
</script>

<style scoped></style>
