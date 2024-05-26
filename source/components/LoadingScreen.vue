<template>
  <div v-loading="loading" element-loading-text="Loading..." class="loading-screen">
    <el-card>
      <el-card-body>
        <el-row type="flex" justify="center" align="middle">
          <el-col>
            <el-spinner size="large" />
          </el-col>
        </el-row>
      </el-card-body>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 2000;
}

.el-card {
  box-shadow: none;
  background-color: transparent;
}
</style>
