<template>
  <div class="news">
    <el-image :class='["image", left && "order-1"]' src="" />
    <div :class='["content", left && "order-2"]'>
      <h2>Company News</h2>
      <p>Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.Stay updated with the latest company announcements.</p>
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
  height: 20vw;
  margin-right: 20px;
  order: 2;
}
.content {
  text-align: start;width: 50%;
  order: 1;
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