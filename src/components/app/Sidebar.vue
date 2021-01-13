<template>
  <ul class="sidenav app-sidenav" v-bind:class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      custom
      v-slot="{ href, isActive }"
      :to="link.url"
    >
      <li :class="{ active: isActive }">
        <a :href="href" class="waves-effect waves-orange pointer">{{
          link.title
        }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props:{
    value: Boolean
  },
  name: "Sidebar",
  data: () => ({
    links: [
      {
        title: "Счёт",
        url: "/"
      },
      {
        title: "История",
        url: "/history"
      },
      {
        title: "Планирование",
        url: "/planning"
      },
      {
        title: "Новая запись",
        url: "/record"
      },
      {
        title: "Категория",
        url: "/categories"
      }
    ]
  })
};
</script>

<style scoped></style>
