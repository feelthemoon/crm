export default {
  beforeMount(el, {value}){
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, {html: value});
  },
  unmounted(el){
    // eslint-disable-next-line no-undef
    M.Tooltip.getInstance(el)?.destroy();
  }
};
