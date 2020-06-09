<template>
  <div id="app">
    <router-view class="application" style="display:none"></router-view>
    <div class="spinner-border" role="status" id="loader">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  components: {},
  created() {
    $(window).on("load", function() {
      setTimeout(function() {
        $(".application").show();
        $("#loader").hide();
      }, 800);
    });
  }
};
</script>
<style>
@import url("./assets/style/main.css");
</style>
