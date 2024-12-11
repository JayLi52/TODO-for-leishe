<template>
  <div class="task-list-wrap">
    <h2>{{ taskCategory }}</h2>
    <div class="tasks-wrap">
      <TaskItem class="task-item" v-for="task in filteredTasks(taskCategory)" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../store";
import TaskItem from "./TaskItem.vue";
import { computed, ref } from "vue";

const props = defineProps({
  taskCategory: {
    type: String,
    default: 'To-Do'
  }
})

const taskStore = useTaskStore();

const items = ['To-Do', 'In Progress', 'Completed'];

const filteredTasks = () => {
  return taskStore.tasks.filter(task => task.status === props.taskCategory);
};
</script>

<style scoped>
.task-list-wrap {
  width: 100%;
}
.tasks-wrap {
  display: flex;
  flex-wrap: wrap;
}
.task-item {
  flex-basis: calc(100% / 3); /* 初始设置为3列布局，每列占比三分之一宽度 */
  box-sizing: border-box; /* 确保元素的内边距、边框等不会撑大元素宽度 */
  padding: 10px; /* 可以根据实际需求调整元素内边距 */
}
@media screen and (max-width: 768px) {
  /* 平板设备，屏幕宽度小于等于768px时，变为2列布局 */
.task-item {
    flex-basis: calc(100% / 2);
  }
}
@media screen and (max-width: 480px) {
  /* 移动设备，屏幕宽度小于等于480px时，变为1列布局 */
.task-item {
    flex-basis: 100%;
  }
}
</style>