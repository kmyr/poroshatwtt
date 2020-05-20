<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt />
            </div>
            <div
              class="alert alert-danger"
              id="incorrectInformation"
              role="alert"
              style="display: none;"
            >
              Informations Are Incorrect
            </div>
            <div
              class="alert alert-danger"
              id="emptyFields"
              role="alert"
              style="display: none;"
            >
              Fields Are Empty
            </div>
            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Username"
              v-model="username"
            ></fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Password"
              type="password"
              v-model="password"
            ></fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  @click="login()"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  >Log In</a
                >
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { setLogin } from "../main";
import $ from "jquery";
import { Card, Button, FormGroupInput } from "@/bootstrapComponents";
import MainFooter from "@/layout/MainFooter";
export default {
  name: "login-page",
  bodyClass: "login-page",
  data() {
    return {
      username: "",
      password: "",
      usersInfo: [],
    };
  },
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  async created() {
    try {
      //Users Data
      this.$http
        .get("users.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.usersInfo = data;
        });
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    login() {
      for (const user in this.usersInfo) {
        console.log(user);
        if (this.username !== "" && this.password !== "") {
          if (
            this.username === this.usersInfo[user].email &&
            this.password === this.usersInfo[user].password
          ) {
            setLogin.$emit("setProfile", user);
          } else {
            $("#incorrectInformation").fadeIn(1000);
          }
        } else {
          $("#emptyFields").fadeIn(1000);
        }
      }
      $("#incorrectInformation").fadeOut(1000);
      $("#emptyFields").fadeOut(1000);
    },
  },
};
</script>
<style></style>
