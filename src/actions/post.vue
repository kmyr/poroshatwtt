<script>
import db from "../components/firebaseInit";

export default {
  methods: {
    saveTask(document, obj) {
      db.collection(document)
        .add(obj)
        .catch(error => console.log(err))
        .then(() => {
          location.reload();
        });
    }
  }
};
</script>