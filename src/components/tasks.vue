<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <b-card title="Tasks" sub-title="All Tasks Todo">
          <div class="padding">
            <b-button id="show-btn" variant="outline-primary" @click="toggleModal">+</b-button>
          </div>

          <template>
            <b-list-group>
              <b-list-group-item v-for="(task, i) in tasks" :key="i" id="item">
                <span class="title">
                  <h4>{{task.name}}</h4>
                  <p>{{task.created}}</p>
                </span>
                {{task.description}}
                <br />

                <div id="actionSection">
                  <span>
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

      <div class="col-md-3">
        <b-card title="Card title" sub-title="Card subtitle"></b-card>
      </div>

      <div class="col-md-3">
        <b-card title="Card title" sub-title="Card subtitle"></b-card>
      </div>
    </div>
    <div
      class="modal fade"
      id="addTaskForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div>
        <b-modal ref="my-modal" hide-footer title="Using Component Methods">
          <div class="d-block text-center">
            <b-input-group prepend="Task Name" class="mb-2">
              <b-form-input aria-label="Task name" v-model="prepareTask.name"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Description" class="mb-2">
              <b-form-input aria-label="Description" v-model="prepareTask.description"></b-form-input>
            </b-input-group>
          </div>
          <div class="row" id="popupForm">
            <div class="col-md-6">
              <b-button class="mt-3" variant="outline-danger" block @click="toggleModal">
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
              <b-button class="mt-3" variant="outline-success" block @click="addTask">
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
</template>
<script>
import $ from "jquery";
import getData from "../actions/get.vue";
import postData from "../actions/post.vue";
export default {
  mixins: [getData, postData],
  data() {
    return {
      tasks: [],
      date: "",
      prepareTask: {
        name: "",
        description: ""
      }
    };
  },
  created() {
    this.date = this.currentDate;
    this.getData("tasks.json");
  },
  methods: {
    addTask() {
      if ((this.prepareTask.name !== "", this.prepareTask.description !== "")) {
        this.postData("tasks.json", {
          name: this.prepareTask.name,
          description: this.prepareTask.description,
          created: this.date
        });
        $("input").val("");
        $("input").removeClass("is-invalid");
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
      this.$refs["my-modal"].toggle("#toggle-btn");
    }
  }
};
</script>
