<template>
  <div>
    <div>
      <b-card title="Tasks" sub-title="All Tasks Todo">
        <div class="padding">
          <b-button id="show-btn" variant="outline-primary" @click="toggleModal">+</b-button>
        </div>

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
      <div class="modal fade" id="addTaskForm" tabindex="-1" role="dialog" aria-hidden="true">
        <div>
          <b-modal ref="newItemModal" hide-footer title="Add New Task">
            <div class="d-block text-center">
              <b-input-group prepend="Title" class="mb-2">
                <b-form-input aria-label="Title" v-model="title"></b-form-input>
              </b-input-group>
              <b-input-group prepend="Description" class="mb-2">
                <b-form-input aria-label="Description" v-model="description"></b-form-input>
              </b-input-group>
            </div>
            <div class="row" id="popupForm">
              <div class="col-md-6">
                <b-button class="mt-3" variant="outline-danger" block @click="toggleModal()">
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
                </b-button>
              </div>
              <div class="col-md-6">
                <b-button class="mt-3" variant="outline-success" block @click="addData">
                  <svg
                    class="bi bi-plus-circle-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
                    />
                  </svg>
                </b-button>
              </div>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
import $ from "jquery";
import getData from "../actions/get.vue";
import postData from "../actions/post.vue";
import deleteData from "../actions/delete.vue";

export default {
  mixins: [getData, postData, deleteData],
  data() {
    return {
      date: "",
      title: null,
      description: null
    };
  },
  created() {
    this.date = this.currentDate;
    this.getData("tasks");
  },
  methods: {
    addData() {
      if (this.title !== null && this.description !== null) {
        this.saveTask("tasks", {
          title: this.title,
          createdDate: this.date,
          description: this.description
        });
        this.title = null;
        this.description = null;
        $("input").removeClass("is-invalid");
        this.toggleModal();
      } else {
        $("input:text")
          .filter(function() {
            return this.value == "";
          })
          .addClass("is-invalid");

        $("input:text")
          .filter(function() {
            return this.value !== "";
          })
          .removeClass("is-invalid");
      }
    },

    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["newItemModal"].toggle("#toggle-btn");
    },
    forwardItem(i) {
      this.saveTask("inProgress", this.tasks[i]);
      this.deleteData("tasks", this.tasks[i].title);
    },
    deleteItem(i) {
      if (confirm(`Delete ${i} ?`)) {
        this.deleteData("tasks", i);
      }
    }
  }
};
</script>
