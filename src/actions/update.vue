<script>
import db from "../components/firebaseInit";
export default {
  methods: {
    updateData(task, data) {
      db.collection(data)
        .where("title", "==", task)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                title: this.title,
                description: this.description
              })
              .then(() => {
                location.reload();
              });
          });
        });
    }
  }
};
</script>