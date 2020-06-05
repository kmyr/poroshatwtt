<template>
  <div>
    <div>
      <b-card title="In Progress" sub-title="In Progress Tasks">
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
  </div>
</template>
<script>
import $ from "jquery";
import getData from "../actions/get.vue";
export default {
  mixins: [getData],
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.getData("inProgress.json");
  },
  methods: {}
};
</script>
