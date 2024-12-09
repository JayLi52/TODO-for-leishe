<template>
  <div class="row">
    <div class="col border p-4" v-for="item in items">
      <h2>{{ item }}</h2>
      <TaskItem v-for="task in filteredTasks(item)" :key="task.id" :task="task" />
    </div>
    <!-- <h2>In Progress</h2>
    <TaskItem v-for="task in filteredTasks('In Progress')" :key="task.id" :task="task" />
    <h2>Completed</h2>
    <TaskItem v-for="task in filteredTasks('Completed')" :key="task.id" :task="task" /> -->
  </div>
</template>

<script setup>
import { useTaskStore } from "../store";
import TaskItem from "./TaskItem.vue";
import { computed, ref } from "vue";

const taskStore = useTaskStore();

const items = ['To-Do', 'In Progress', 'Completed']

const filteredTasks = (status) => {
  return taskStore.tasks.filter(task => task.status === status);
};
</script>