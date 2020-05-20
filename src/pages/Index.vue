<template>
  <div>
    <div class="page-header clear-filter" filter-color="">
      <parallax class="page-header-image" style="background-image:url('img/header.jpg')"></parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt />
          <h1 class="h1-seo">Now UI Kit.</h1>
          <h3>A beautiful Bootstrap 4 UI kit. Yours free.</h3>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="hero-images-container">
                <img src="img/hero-image-1.png" alt />
              </div>
              <div class="hero-images-container-1">
                <img src="img/hero-image-2.png" alt />
              </div>
              <div class="hero-images-container-2">
                <img src="img/hero-image-3.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from "@/bootstrapComponents";

export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    Parallax
  }
};
</script>
<style></style>
