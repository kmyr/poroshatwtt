<script>
import db from "../components/firebaseInit";

export default {
  methods: {
    saveTask(document, obj) {
      db.collection(document)
        .add(obj)
        .then(docRef => {
          this.$router.push("/");
        })
        .catch(error => console.log(err));
    }
  }
};
</script>