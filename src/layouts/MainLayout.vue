<template>
  <div :class="{ 'all-center': loading }">
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar v-on:toggle="isOpen = !isOpen" />
      <Sidebar :value="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          v-tooltip="'Создать новую запись'"
          class="btn-floating btn-large blue"
          to="/record"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";
export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    }
  }
};
</script>

<style lang="scss">
.all-center{
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
