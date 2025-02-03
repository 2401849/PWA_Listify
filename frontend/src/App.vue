<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useUserAuthStore } from "@/stores/auth.ts";
import { RouterView } from "vue-router";
import router from "@/router";
import { useDisplay } from "vuetify";

const userState = useUserAuthStore();
const { smAndDown } = useDisplay();
const logout = () => userState.logout();
const theme = ref(localStorage.getItem("theme") || "light");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
  localStorage.setItem("theme", theme.value);
};

onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
});

const appTitle = computed(() =>
  smAndDown.value ? "Listify" : "Listify - Turn chaos into order!"
);
</script>

<template>
  <v-app :theme="theme">
    <template v-if="!userState.isTokenExpired">
      <v-app-bar :elevation="9">
        <v-app-bar-title>{{ appTitle }}</v-app-bar-title>
        <v-spacer />
        <v-menu v-if="smAndDown" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="userState.isAdmin" @click="router.push('/admin')">
              <v-list-item-title>Admin Panel</v-list-item-title>
            </v-list-item>
            <v-list-item @click="router.push('/dashboard')">
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item @click="router.push('/about')">
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleTheme">
              <v-list-item-title>Switch Theme</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <template v-else>
          <template v-if="userState.isAdmin">
            <v-btn id="admin-btn" icon="mdi-shield-lock-outline" @click="router.push('/admin')" />
            <v-tooltip activator="#admin-btn" location="bottom">Admin Panel</v-tooltip>
          </template>
          <v-btn id="dashboard-btn" icon="mdi-format-list-text" @click="router.push('/dashboard')" />
          <v-tooltip activator="#dashboard-btn" location="bottom">Dashboard</v-tooltip>
          <v-btn id="about-btn" icon="mdi-information-outline" @click="router.push('/about')" />
          <v-tooltip activator="#about-btn" location="bottom">About</v-tooltip>
          <v-btn id="theme-btn" icon="mdi-theme-light-dark" @click="toggleTheme" />
          <v-tooltip activator="#theme-btn" location="bottom">Switch Theme</v-tooltip>
          <v-btn id="logout-btn" icon="mdi-logout" @click="logout" />
          <v-tooltip activator="#logout-btn" location="bottom">Logout</v-tooltip>
        </template>
      </v-app-bar>
    </template>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
