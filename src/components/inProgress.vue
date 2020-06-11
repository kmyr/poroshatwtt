<template>
  <div>
    <div>
      <b-card title="In Progress" sub-title="In Progress Tasks">
        <template>
          <b-list-group>
            <b-list-group-item v-for="(task, i) in tasks" :key="i" id="item">
              <router-link
                class="title"
                :to="{name: 'view_task',params:{taskTitle: task.title}}"
                tag="span"
              >
                <h4>{{task.title}}</h4>
                <p>{{task.createdDate}}</p>
              </router-link>
              {{task.description}}
              <br />

              <div id="actionSection">
                <span id="deleteBtn" @click="deleteItem(task.title)">
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
                <span @click="forwardItem(i)">
                  <svg
                    class="bi bi-arrow-right-square-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm5.646 10.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"
                    />
                  </svg>
                </span>
              </div>
            </b-list-group-item>
          </b-list-group>
        </template>
      </b-card>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import getData from "../actions/get.vue";
import deleteData from "../actions/delete.vue";
import postData from "../actions/post.vue";
export default {
  mixins: [getData, deleteData, postData],
  data() {
    return {};
  },
  created(i) {
    this.getData("inProgress", i);
  },
  methods: {
    deleteItem(i) {
      this.saveTask("refresh", {});

      if (confirm(`Delete ${i} ?`)) {
        this.deleteData("inProgress", i);
      }
    }
  }
};
</script>
