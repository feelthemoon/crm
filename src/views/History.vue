<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <loader v-if="loading" />
    <p class="center" v-else-if="!records">Записей пока нет. <router-link to="/record">Добавьте первую!</router-link></p>
    <section v-else>
      <history-table v-bind:records="records"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from "@/components/app/Loader";
export default {
  name: "History",
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(
          category => category.id === record.categoryId
        ).title,
        typeClass: record.type === "outcome" ? "red" : "green",
        typeText: record.type === "outcome" ? "Расход" : "Доход"
      };
    });
    this.loading = false;
  },
  components: {
    Loader,
    HistoryTable
  }
};
</script>

<style scoped></style>
