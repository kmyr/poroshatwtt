<script>
export default {
  methods: {
    async deleteData(doc, obj) {
      try {
        this.$http.delete(doc, obj);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>