<script>
export default {
  methods: {
    async getData(doc) {
      try {
        this.$http
          .get(doc)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.tasks = data;
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>