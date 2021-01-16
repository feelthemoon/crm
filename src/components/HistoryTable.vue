<template>
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) of records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>
          {{ dateFilter(record.date) }}&nbsp;{{ timeFilter(record.date) }}
        </td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
            v-tooltip="'Посмотреть запись'"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array
    }
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
