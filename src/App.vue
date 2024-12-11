<template>
  <div id="app" style="width: 100vw;">
    <!-- <nav class="">
      <div class="d-flex justify-content-between nav-wrap">
        <div class="d-flex flex-row align-items-center">
          <span>MyToDoList</span>
        </div>
        <div class="d-flex align-items-center" role="search">
          <span class="mx-3">[Terry]</span>
          <button class="btn" type="">
            LogOut
          </button>
        </div>
      </div>
    </nav> -->

    <TaskForm />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="task in taskCategorys" :label="task" :name="task">
        <TaskList :taskCategory="task" />
      </el-tab-pane>
    </el-tabs>
    <TaskList taskCategory="" />
    <CompanyNews left />
    <CompanyNews />

   
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CompanyNews from "./components/CompanyNews.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import { useTaskStore } from "./store";

const taskStore = useTaskStore();

const activeName = ref('To-Do')

const taskCategorys = ref(["To-Do", "In Progress", "Completed"]);

onMounted(async () => {
  await taskStore.loadTasks(); // Fetch tasks when the component is mounted
});

</script>

<style scoped>
.nav-wrap {
  background-color: #ccc;
}
</style>
