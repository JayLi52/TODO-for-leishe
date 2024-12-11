import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [], // 移除类型注解
  }),
  actions: {
    async loadTasks() {
      try {
        const response = await axios.get("/rest/tasks");
        this.tasks = response.data;
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    },
    async addTask(task) {
      try {
        const response = await axios.post("/rest/tasks", task);
        this.tasks.push(response.data);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },
    async updateTask(id, updatedTask) {
      try {
        await axios.put(`/rest/tasks/${id}`, updatedTask);
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
          task.status = updatedTask.status;
        }
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`/rest/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    },
  },
});
