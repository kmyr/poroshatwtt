<script>
import db from "../components/firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    getData(document) {
      db.collection(document)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              createdDate: doc.data().createdDate,
              description: doc.data().description
            };
            this.tasks.push(data);
          });
        });
    }
  }
};
</script>