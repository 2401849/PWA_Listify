<template>
  <v-container class="mt-6">
    <v-card elevation="8" class="pa-6">
      <v-card-title class="text-h4 font-weight-bold text-center">
        About Listify
      </v-card-title>
      <v-card-subtitle class="text-center text-subtitle-1 mt-2">
        A task management solution built for efficiency and simplicity.
      </v-card-subtitle>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12" md="6" align-self="center">
          <v-img
            src="/listify-logo.png"
            alt="Listify Logo"
            contain
            height="120"
            class="mx-auto d-block"
          ></v-img>
        </v-col>

        <v-col cols="12" md="6">
          <p class="text-body-1">
            <strong>Listify</strong> is a <strong>task management web application</strong> developed as a final project for
            the <strong>Programação Web Avançada</strong> course at <strong>Universidade Aberta</strong> and <strong>UTAD</strong>.
          </p>
          <p class="text-body-1">
            The goal of this project is to demonstrate <strong>full-stack development</strong> concepts
            by implementing a <strong>modern, scalable, and user-friendly task manager</strong>.
          </p>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-card-title class="text-h5 font-weight-bold">
        Features
      </v-card-title>

      <v-row class="mt-2">
        <v-col cols="12" md="6">
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-account-multiple" title="Two User Roles" subtitle="Admin and Standard Users"></v-list-item>
            <v-list-item prepend-icon="mdi-checkbox-marked-outline" title="Task Management" subtitle="Create, edit, delete, and complete tasks"></v-list-item>
            <v-list-item prepend-icon="mdi-theme-light-dark" title="Dark Mode Support" subtitle="Switch between light and dark themes"></v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="6">
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-speedometer" title="Fast & Responsive" subtitle="Built with Vue.js and Vuetify"></v-list-item>
            <v-list-item prepend-icon="mdi-shield-lock-outline" title="Secure Authentication" subtitle="Admin panel for user management"></v-list-item>
            <v-list-item prepend-icon="mdi-database" title="MongoDB Backend" subtitle="Data persistence with NestJS"></v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-card-title class="text-h5 font-weight-bold">
        Tech Stack
      </v-card-title>

      <v-row class="mt-2">
        <v-col cols="12" md="4" class="text-center">
          <v-icon size="48" color="blue">mdi-vuejs</v-icon>
          <p>Vue.js + Vuetify</p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-icon size="48" color="red">mdi-nodejs</v-icon>
          <p>NestJS Backend</p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-icon size="48" color="green">mdi-database</v-icon>
          <p>MongoDB Database</p>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-card-title class="text-h5 font-weight-bold">
        Developed By
      </v-card-title>
      <p class="text-center text-body-1 font-weight-medium">Pedro Morais - 2401849</p>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
</script>
