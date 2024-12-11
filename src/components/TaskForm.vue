<template>
  <div class="wrap mb-3">
    <div>Todo</div>
    <div type="submit" class="button" style="width: 150px" @click="createTask">
      +Create Task
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="create task"
      width="500"
      :before-close="handleClose"
    >
      <el-upload
        class="upload"
        action="#"
        :auto-upload="false"
        :show-file-list="true"
        :on-change="handleUploadChange"
        :before-upload="beforeUpload"
      >
        <el-button type="primary">点击上传图片（对话框内）</el-button>
      </el-upload>
      <div style="width: 100%;height: 20px;"></div>
      <el-input
        v-model="taskTitle"
        placeholder="Enter task title"
        required
      />
      <div style="width: 100%;height: 20px;"></div>
      <el-input
        v-model="taskDescription"
        placeholder="Enter task description"
        type="textarea"
        rows="3"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useTaskStore } from "../store";
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 任务标题
const taskTitle = ref("");
// 任务描述
const taskDescription = ref("");
// 存储上传的文件列表（图片等）
const uploadedFiles = ref([]);

const taskStore = useTaskStore();

const createTask = () => {
  
  dialogVisible.value = true;
};

const dialogVisible = ref(false);

const handleClose = () => {
  dialogVisible.value = false;
};

// 处理文件上传时的变化（比如添加到已上传文件列表等）
const handleUploadChange = (file, fileList) => {
  uploadedFiles.value = fileList;
};

// 在真正上传前可以做一些校验等操作
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    ElMessage.error("只能上传 JPG 或者 PNG 格式的图片哦");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error("图片大小不能超过 2MB");
    return false;
  }
  return true;
};

function confirm() {
  if (taskTitle.value.length > 0) {
    const task = {
      id: Date.now().toString(),
      title: taskTitle.value,
      status: "To-Do",
      timestamp: new Date().toISOString(),
      desc: taskDescription.value,
      src: uploadedFiles.value[0].name
    };
    taskStore.addTask(task);
  }
  taskTitle.value = "";
  dialogVisible.value = false
}
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
}
.button {
  margin-left: 10px;
  background-color: green;
  border-radius: 10px;
  width: 150px;
  height: 30px;
}
.upload {
  margin-top: 10px;
}
</style>