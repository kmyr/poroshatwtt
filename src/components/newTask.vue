<template>
  <div id="new-task">
    <h3>New Task</h3>
    <form @submit.prevent="saveTask">
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
  name: "new_task",
  data() {
    return {
      title: null,
      createdDate: null,
      description: null
    };
  },
  methods: {
    saveTask() {
      db.collection("tasks")
        .add({
          title: this.title,
          createdDate: this.createdDate,
          description: this.description
        })
        .then(docRef => {
          this.$router.push("/");
        })
        .catch(error => console.log(err));
    }
  }
};
</script>