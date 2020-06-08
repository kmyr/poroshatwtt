<template>
  <div id="edit-task">
    <h3>Edit Task</h3>
    <form @submit.prevent="updateTask">
      <input type="text" v-model="title" required />
      <input type="text" v-model="createdDate" required />
      <input type="text" v-model="description" required />
      <button type="submit">Save</button>
      <router-link to="/">cancel</router-link>
    </form>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "edit_task",
  data() {
    return {
      title: null,
      createdDate: null,
      description: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("tasks")
      .where("title", "==", to.params.taskTitle)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.title = doc.data().title;
            vm.description = doc.data().description;
            vm.createdDate = doc.data().createdDate;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("tasks")
        .where("title", "==", this.$route.params.taskTitle)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.title = doc.data().title;
            this.description = doc.data().description;
            this.createdDate = doc.data().createdDate;
          });
        });
    },
    updateTask() {
      db.collection("tasks")
        .where("title", "==", this.$route.params.taskTitle)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                title: this.title,
                createdDate: this.createdDate,
                description: this.description
              })
              .then(() => {
                this.$router.push({
                  name: "view_task",
                  params: {
                    taskTitle: this.title
                  }
                });
              });
          });
        });
    }
  }
};
</script>