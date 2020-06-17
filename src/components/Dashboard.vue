<template>
  <div id="dashboard">
    <h3>dashboard</h3>
    <ul>
      <li v-for="(task,i) in tasks" :key="i">
        {{task.title}},{{task.createdDate}},{{task.description}}
        <router-link>view</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      tasks: []
    };
  },
  created() {
    db.collection("tasks")
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
};
</script>