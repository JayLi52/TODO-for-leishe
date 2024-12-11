<template>
  <div class="news">
    <el-image :class='["image", left && "order-2"]' src="" />
    <div :class='["content", left && "order-1"]'>
      <h2>Company News</h2>
      <p class="desc">Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.</p>
    </div>
  </div>
</template>

<script setup>
// 这个组件没有额外的逻辑，仅为展示公司
const props = defineProps({
  left: Boolean,
})
</script>

<style scoped>
.image {
  width: 50%;
  height: 250px;
  margin-right: 20px;
}
.content {
  text-align: start;
  width: 50%;
  order: 1;
}
.desc {
  height: 180px;
  overflow: hidden; 
  text-overflow: ellipsis; /* 文字溢出用省略号显示 */
  display: -webkit-box; /* 启用伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 排列方向为垂直方向 */
}
.news {
  margin-top: 20px;
  display: flex;
  width: 100%;
  max-width: 100%;
  max-height: 250px
}
.order-1 {
  order: 1;
}
.order-2 {
  order: 2;
}
</style>