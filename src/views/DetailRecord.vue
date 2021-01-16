<template>
  <div class="app-page">
    <loader v-if="loading" />
    <div v-else-if="record">
      <div>
        <div class="breadcrumb-wrap">
          <router-link to="/history" class="breadcrumb">История</router-link>
          <a @click.prevent class="breadcrumb">
            {{record.typeText}}
          </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card" :class="[record.typeColor]">
              <div class="card-content white-text">
                <p>Описание: {{ record.description }}</p>
                <p>Сумма: {{ currencyFilter(record.amount) }}</p>
                <p>Категория: {{ record.categoryName }}</p>

                <small
                  >{{ dateFilter(record.date) }}&nbsp;{{
                    timeFilter(record.date)
                  }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с id={{ $route.params.id }} не найден</p>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
export default {
  name: "DetailRecord",
  components: { Loader },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const record = await this.$store.dispatch(
      "fetchRecordById",
      this.$route.params.id
    );
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
      typeColor: record.type === "outcome" ? "red" : "green",
      typeText: record.type === "outcome" ? "Расход" : "Доход"
    };
    this.loading = false;
  },
  methods: {
    currencyFilter(bill, currency = "RUB") {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency
      }).format(bill);
    },
    dateFilter(date) {
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
    },
    timeFilter(date) {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
    }
  }
};
</script>

<style scoped></style>
