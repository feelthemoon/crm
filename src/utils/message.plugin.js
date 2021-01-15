export default {
  // eslint-disable-next-line no-unused-vars
  install(app, options) {
    app.config.globalProperties.$message = function(html) {
      // eslint-disable-next-line no-undef
      M.toast({ html });
    };
    app.config.globalProperties.$error = function(html) {
      // eslint-disable-next-line no-undef
      M.toast({ html: `[ERROR] ${html}` });
    };
  }
};
