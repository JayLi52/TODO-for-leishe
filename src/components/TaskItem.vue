<template>
  <div class="wrap">
    <p>{{ task.title }} ({{ formattedTimestamp }})</p>
    <div class="wrap-item">
      <select class="form-select-sm" v-model="task.status" @change="updateTask">
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button class="button" @click="deleteTask">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../store";
import { computed } from "vue";

const props = defineProps({
  task: Object
});

const taskStore = useTaskStore();

const formattedTimestamp = computed(() => 
  new Date(props.task.timestamp).toLocaleString("en-US", { timeZone: "Asia/Shanghai" })
);

const updateTask = () => {
  taskStore.updateTask(props.task.id, { ...props.task, status: props.task.status });
};

const deleteTask = () => {
  taskStore.deleteTask(props.task.id);
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.button {
  margin-left: 10px;
}
.wrap-item {
  display: flex;
  min-width: 0;
}
</style>