<script>
import db from "../components/firebaseInit";
export default {
  methods: {
    async deleteData(doc, i) {
      db.collection(doc)
        .where("title", "==", i)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
    }
  }
};
</script>