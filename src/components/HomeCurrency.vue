<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(5) }}</td>
              <td>{{ dateFilter }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: {
    rates: Object,
    date: String
  },
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  },
  computed: {
    dateFilter() {
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(
        new Date(this.date)
      );
    }
  }
};
</script>

<style scoped></style>
