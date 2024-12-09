<template>
  <div id="app">
    <CompanyNews />
    <TaskForm />
    <TaskList />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import CompanyNews from "./components/CompanyNews.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import { useTaskStore } from "./store";

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.loadTasks(); // Fetch tasks when the component is mounted
});
</script>
