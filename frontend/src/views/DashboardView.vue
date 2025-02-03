<template>
  <v-container>
  <v-card max-width="488px" class="mx-auto">
    <v-layout>
      <TodoMenu/>
    </v-layout>
  </v-card>
  <v-container class="ma-3">
    <v-card>
      <TodoList/>
    </v-card>
  </v-container>
  </v-container>
</template>
<script setup lang="ts">
import TodoList from "@/components/todos/TodoList.vue";
import TodoMenu from "@/components/todos/TodoMenu.vue";
</script>
