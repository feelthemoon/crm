<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="toggleSide">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text date">{{ dateFilter }}</span>
        <span class="black-text">{{ timeFilter }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout()">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  computed: {
    dateFilter() {
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(this.date);
    },
    timeFilter() {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(this.date);
    },
    name(){
      return this.$store.getters.info.name;
    }
  },
  methods: {
    toggleSide() {
      this.$emit("toggle");
    },
    async logout() {
      await this.$store.dispatch('logout');
      await this.$router.push("/login?message=logout");
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    this.dropdown?.destroy();
  }
};
</script>

<style lang="scss">
.date{
  margin-right: 10px;
}
</style>
