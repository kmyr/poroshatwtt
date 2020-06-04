<script>
export default {
  methods: {
    async postData(doc, obj) {
      try {
        this.$http.post(doc, obj);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>