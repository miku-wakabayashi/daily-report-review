<template>
  <div class="select-reviewer">
    <el-select v-model="reviewerName" @change="reviewerChangeEvent(reviewerName)">
      <el-option
        v-for="reviewer in reviewers"
        :key="reviewer.id"
        :label="reviewer.name"
        :value="reviewer.name"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    reviewers: { default: [], required: true}
  },
  data() {
    return {
      reviewerName: ''
    }
  },
  methods: {
    reviewerChangeEvent(name) {
      this.$emit('reviewer-selected', name)
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 200px;
  margin-bottom: 8px;
}
</style>