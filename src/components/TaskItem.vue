<template>
  <div class="">
    <div class="wrap-item">
      <el-image class="task-image" :src="task.src" />
      <h3 style="width: 100%;">{{ task.title }}</h3>
      <div>
        {{ task.desc }}
      </div>
      <div class="btns d-flex flex-start">

        <button class="button" @click="start">Start</button>
        <button class="button" @click="deleteTask">Remove</button>
      </div>
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

const start = () => {
  taskStore.updateTask(props.task.id, { ...props.task, status: 'In Progress' });
}

const deleteTask = () => {
  taskStore.deleteTask(props.task.id);
};
</script>

<style scoped>
.button {
  margin-left: 10px;
}
.wrap-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  text-align: start;
}

.task-image {
  width: 320px;height: 200px;
}
</style>