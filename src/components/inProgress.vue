<template>
  <div>
    <div>
      <b-card title="In Progress" sub-title="In Progress Tasks">
        <cards :data="pageData"></cards>
      </b-card>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import getData from "../actions/get";
import deleteData from "../actions/delete";
import postData from "../actions/post";
import cards from "./cards";

export default {
  mixins: [getData, deleteData, postData],
  data() {
    return {
      pageData: "inProgress"
    };
  },
  components: {
    cards
  },
  created() {},
  methods: {}
};
</script>
