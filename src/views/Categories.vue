<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit
          :key="categories.length + updateCount"
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategory"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
import Loader from "@/components/app/Loader";
export default {
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    Loader,
    CategoryCreate,
    CategoryEdit
  },
  async mounted() {
    this.categories = (await this.$store.dispatch("fetchCategories")) ?? [];
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const index = this.categories.findIndex(c => c.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      ++this.updateCount;
    }
  }
};
</script>

<style scoped></style>
