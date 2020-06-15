<template>
  <div class="title-select">
    <span class="title"> {{ title }} </span>
    <el-select class="select" v-model="selectValue" placeholder="请选择" size="small">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: String,
    options: Array,
    value: String
  },
  data() {
    return {
      selectValue: this.value || this.options[0].value
    }
  },
  watch: {
    value(val) {
      this.selectValue = this.value;
    }
  },
  updated() {
    this.$emit('update:value', this.selectValue);
  }
}
</script>

<style lang='scss' scoped>
.title-select {
  display: flex;
  align-items: center;
  .title {
    width: 18%;
    font-size: 16px;
  }
  .select {
    flex: 1;
  }
  // 改element ul select上的样式
  .el-select {
    width: 100%;
  }
}
</style>
