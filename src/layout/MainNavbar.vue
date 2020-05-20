<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
    id="menu"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link v-popover:popover1 class="navbar-brand" to="/"
        >Techbi</router-link
      >
    </template>
    <template slot="navbar-menu">
      <li class="nav-item" v-if="!userLogin">
        <router-link to="/login">
          <i class="fa fa-user"></i> Login
        </router-link>
      </li>
      <li class="nav-item">
        <a  @click="logout">
          <span v-if="userLogin">
            <i class="fa fa-power-off"></i> Sign Out</span
          >
        </a>
      </li>
      <li class="nav-item">
        <router-link to="/"> <i class="fa fa-home"></i> Home </router-link>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/bootstrapComponents";
import { Popover } from "element-ui";
import { setLogin } from "../main";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  data() {
    return {
      usersInfo: [],
      userLogin: "",
    };
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover,
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
    setLogin.$on("setProfile", (user) => {
      localStorage.login = true;
      localStorage.userName = this.usersInfo[user].name;
      localStorage.userImg = this.usersInfo[user].picture;
      localStorage.userEmail = this.usersInfo[user].email;
      this.userLogin = localStorage.login;
      this.$router.push("profile");
    });
    if (localStorage.login) {
      this.userLogin = localStorage.login;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("login");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userImg");
      this.$router.push("/");

      this.userLogin = false;
    },
  },
};
</script>

<style scoped>
</style>
