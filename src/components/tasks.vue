<template>
  <div>
    <div>
      <b-card title="Tasks" sub-title="All Tasks Todo">
        <div class="padding">
          <b-button id="show-btn" variant="outline-primary" @click="newItemModal()">+</b-button>
        </div>
        <cards :data="pageData"></cards>
      </b-card>
    </div>
    <!-- new item -->
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
              <b-button class="mt-3" variant="outline-danger" block @click="newItemModal()">
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
              <b-button class="mt-3" variant="outline-success" block @click="addData()">
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
import db from "./firebaseInit";
import $ from "jquery";
import postData from "../actions/post";
import getData from "../actions/get";
import deleteData from "../actions/delete";
import cards from "./cards";

export default {
  mixins: [getData, postData, deleteData],
  data() {
    return {
      date: "",
      title: null,
      description: null,
      pageData: "tasks"
    };
  },
  components: {
    cards
  },
  created() {
    this.date = this.currentDate;
  },
  methods: {
    addData() {
      if (this.title !== null && this.description !== null) {
        this.saveData("tasks", {
          title: this.title,
          createdDate: this.date,
          description: this.description
        });
        this.title = null;
        this.description = null;
        $("input").removeClass("is-invalid");
        this.newItemModal();
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

    newItemModal() {
      this.$refs["newItemModal"].toggle("#toggle-btn");
    }
  }
};
</script>
