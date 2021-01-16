<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <loader v-if="loading" />
    <p v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавьте её!</router-link>
    </p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select v-model="category.title" ref="select">
          <option v-for="c of categories" :key="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          v-bind:class="{
            invalid:
              v.amount.$dirty &&
              (v.amount.required.$invalid || v.amount.minValue.$invalid)
          }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="
            v.amount.$dirty &&
              (v.amount.required.$invalid || v.amount.minValue.$invalid)
          "
        >
          Минимальное значение: {{ v.amount.minValue.$params.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          v-bind:class="{
            invalid: v.description.required.$invalid && v.description.$dirty
          }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="v.description.required.$invalid && v.description.$dirty"
        >
          Добавьте описание для записи
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { ref } from "vue";
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapGetters } from "vuex";
export default {
  name: "Record",
  components: { Loader },
  setup() {
    const type = ref("income");
    const amount = ref(100);
    const description = ref("");
    const rules = {
      type: { required },
      amount: { required, minValue: minValue(100) },
      description: { required }
    };
    const v = useVuelidate(rules, { type, amount, description });
    return { v, type, amount, description };
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null
  }),
  async mounted() {
    this.categories = (await this.$store.dispatch("fetchCategories")) ?? [];
    if (this.categories.length) {
      this.category = this.categories[0];
    }
    this.loading = false;
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select);
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },

  unmounted() {
    this.select?.destroy();
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "outcome") {
        return this.info.bill >= this.amount;
      }
      return true;
    }
  },
  methods: {
    resetModels() {
      this.amount = 100;
      this.description = "";
      this.type = "income";
    },
    async submitHandler() {
      await this.v.$validate();
      if (this.v.$invalid) {
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category.id,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", {bill});
          this.$message("Запись успешно создана");
          this.v.$reset();
          this.resetModels();
        } catch (e) {
          this.$error(e);
        }
      } else {
        this.$message(
          `Недостаточно средств на счёте ${this.amount - this.info.bill}`
        );
      }
    }
  }
};
</script>
