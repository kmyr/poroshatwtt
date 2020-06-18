<template>
  <div>
    <template>
      <b-list-group>
        <b-list-group-item v-for="(task, i) in tasks" :key="i" id="item">
          <span class="title" @click="viewItemModal(i)">
            <h4>{{task.title}}</h4>
            <p>{{task.createdDate}}</p>
          </span>
          {{task.description}}
          <br />

          <div id="actionSection">
            <span id="deleteBtn" @click="deleteItemModal(task)">
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
            <span @click="updateItemModal(i)">
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
    </template>
    <!-- view task -->
    <div class="modal fade" id="addTaskForm" tabindex="-1" role="dialog" aria-hidden="true">
      <div>
        <b-modal ref="viewItemModal" hide-footer :title="currentTask.title">
          <div class="d-block text-center">
            <span class="title">
              <h4>{{currentTask.title}}</h4>
              <p>{{currentTask.createdDate}}</p>
            </span>
            <p>{{currentTask.description}}</p>
          </div>
          <div class="row" id="popupForm">
            <div class="col-md-6">
              <b-button class="mt-3" variant="outline-danger" block @click="viewItemModal()">
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
              <b-button class="mt-3" variant="outline-success" block>
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
    <!-- delete modal -->
    <div class="modal fade" id="addTaskForm" tabindex="-1" role="dialog" aria-hidden="true">
      <div>
        <b-modal ref="deleteItemModal" hide-footer :title="'Delete '+currentTask">
          <div class="d-block text-center">Delete {{currentTask}} ?</div>
          <div class="row" id="popupForm">
            <div class="col-md-6">
              <b-button
                class="mt-3"
                variant="outline-primary"
                block
                @click="deleteItemModal()"
              >Cancel</b-button>
            </div>
            <div class="col-md-6">
              <b-button
                class="mt-3"
                variant="outline-danger"
                block
                @click="deleteItem(currentTask)"
              >Delete</b-button>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <!-- update item -->
    <div class="modal fade" id="addTaskForm" tabindex="-1" role="dialog" aria-hidden="true">
      <div>
        <b-modal ref="updateItemModal" hide-footer :title="'Update '+currentTask">
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
              <b-button class="mt-3" variant="outline-danger" block @click="updateItemModal()">
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
              <b-button
                class="mt-3"
                variant="outline-success"
                block
                @click="updateItem(currentTask)"
              >
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
              </b-button>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
import deleteData from "../actions/delete";
import getData from "../actions/get";
import postData from "../actions/post";
import updateData from "../actions/update";

import $ from "jquery";
export default {
  name: "view_task",
  mixins: [deleteData, getData, postData, updateData],
  data() {
    return {
      title: null,
      description: null,
      currentTask: ""
    };
  },
  props: ["data"],
  created() {
    this.getData(this.data);
  },
  methods: {
    deleteItemModal(i) {
      this.$refs["deleteItemModal"].toggle("#toggle-btn");
      this.currentTask = i;
    },
    viewItemModal(i) {
      if (i !== undefined) {
        this.currentTask = this.tasks[i];
      }
      this.$refs["viewItemModal"].toggle("#toggle-btn");
    },
    forwardItem(i) {
      this.saveData("inProgress", this.tasks[i]);
      this.deleteData("tasks", this.tasks[i].title);
    },
    deleteItem(i) {
      this.saveData("refersh", {});
      this.deleteData(this.data, i);
      this.$refs["deleteItemModal"].toggle("#toggle-btn");
    },
    updateItemModal(i) {
      this.$refs["updateItemModal"].toggle("#toggle-btn");
      this.title = this.tasks[i].title;
      this.description = this.tasks[i].description;
      this.currentTask = this.tasks[i].title;
    },
    updateItem(i) {
      this.updateData(i, this.data);
      this.$refs["updateItemModal"].toggle("#toggle-btn");
    }
  }
};
</script>