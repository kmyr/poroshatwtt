<script>
import db from "../components/firebaseInit";

export default {
  methods: {
    saveData(document, obj) {
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