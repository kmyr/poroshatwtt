<template>
  <b-card id="view_task">
    <b-list-group>
      <b-list-group-item id="item">
        <span class="title">
          <h4>{{title}}</h4>
          <p>{{createdDate}}</p>
        </span>
        {{description}}
        <br />

        <div id="actionSection">
          <span id="deleteBtn" @click="deleteMe()">
            <svg
              class="bi bi-x-circle-fill"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"
              />
            </svg>
          </span>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "view_task",
  data() {
    return {
      title: null,
      description: null,
      createdDate: null
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
    deleteMe() {
      if (confirm("are u sure?")) {
        db.collection("tasks")
          .where("title", "==", this.$route.params.taskTitle)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>