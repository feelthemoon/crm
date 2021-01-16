<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ currencyFilter() }}</h4>
    </div>
    <loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Записей пока нет.
      <router-link to="/categories">Добавьте их!</router-link>
    </p>
    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ currencyFilter(category.spendCash) }} из
          {{ currencyFilter(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            v-bind:class="[category.progressColor]"
            v-bind:style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { mapGetters } from "vuex";
export default {
  name: "Planning",
  components: { Loader },
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    if (records.length) {
      this.categories = categories.map(category => {
        const spendCash = records
          .filter(record => record.categoryId === category.id)
          .filter(record => record.type === "outcome")
          .reduce((total, record) => total + +record.amount, 0);
        const percent = (100 * spendCash) / category.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
        const tooltipValue = category.limit - spendCash;
        const tooltip = `${
          tooltipValue < 0 ? "Превышение на: " : "Осталось"
        } ${this.currencyFilter(Math.abs(tooltipValue))}`;
        return {
          ...category,
          progressPercent,
          progressColor,
          spendCash,
          tooltip
        };
      });
    }
    // console.log(this.categories);
    this.loading = false;
  },
  computed: {
    ...mapGetters(["info"])
  },
  methods: {
    currencyFilter(bill = this.info.bill, currency = "RUB") {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency
      }).format(bill);
    }
  }
};
</script>

<style scoped></style>
