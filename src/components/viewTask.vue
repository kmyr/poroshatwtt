<template>
  <div style="margin: 10px" id="view_task">
    <b-list-group>
      <b-list-group-item id="item">
        <span class="title">
          <h4>{{title}}</h4>
          <p>{{createdDate}}</p>
        </span>
        {{description}}
        <br />

        <div id="actionSection">
          <span id="deleteBtn" @click="toggleDeleteModal()">
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
          <span id="editBtn">
            <svg
              class="bi bi-pencil-square"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </span>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-modal ref="deleteItemModal" hide-footer :title="'Delete '+$route.params.taskTitle+'?'">
      <div class="row">
        <div class="col-md-6">
          <b-button
            class="mt-3"
            variant="outline-secondary"
            block
            @click="toggleDeleteModal()"
          >Cancel</b-button>
        </div>
        <div class="col-md-6">
          <b-button class="mt-3" variant="outline-danger" block @click="deleteItem()">Delete</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import db from "./firebaseInit";
import deleteData from "../actions/delete";
export default {
  name: "view_task",
  mixins: [deleteData],
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
    toggleDeleteModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["deleteItemModal"].toggle("#toggle-btn");
    },
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
    deleteItem() {
      this.deleteData("tasks", this.$route.params.taskTitle);
    }
  }
};
</script>