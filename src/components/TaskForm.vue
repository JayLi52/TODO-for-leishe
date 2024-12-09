<template>
  <div class="wrap mb-3">
    <input class="form-control" v-model="title" placeholder="Enter task title" required />
    <!-- <button type="submit">Add Task</button> -->
    <button type="submit" class="btn btn-primary mx-3" style="width: 200px;" @click="createTask">Add Task</button>
  </div>
</template>

<script setup>
import { useTaskStore } from "../store";
import { ref } from "vue";

const title = ref("");

const taskStore = useTaskStore();

const createTask = () => {
  if (title.value.length > 0) {
    const task = {
      id: Date.now().toString(),
      title: title.value,
      status: "To-Do",
      timestamp: new Date().toISOString()
    };
    taskStore.addTask(task);
  }
  title.value = "";
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: space-around;
}
.button {
  margin-left: 10px;
}
</style>
