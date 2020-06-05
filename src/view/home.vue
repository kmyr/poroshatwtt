<template>
  <div class="row">
    <tasks class="col-md-3"></tasks>
    <inProgress class="col-md-3"></inProgress>
  </div>
</template>
<script>
import tasks from "../components/tasks";
import inProgress from "../components/inProgress";
export default {
  components: {
    tasks,
    inProgress
  }
};
</script>
