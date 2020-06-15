<template>
  <div class="title-input">
    <span class="title"> {{ title }} </span>
    <el-input 
      class="input"
      size="small" 
      :type="type" 
      :rows="rows"
      :placeholder="lastPlaceholder"
      v-model="input"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: String,
    type: String,
    placeholder: String,
    rows: Number,
    value: String
  },
  data() {
    return {
      input: this.value
    }
  },
  watch: {
    value(val) {
      this.input = val;
    }
  },
  computed: {
    lastPlaceholder() {
      return this.placeholder || "请输入内容";
    }
  },
  updated() {
    this.$emit('update:value', this.input)
  }
}
</script>

<style lang='scss' scoped>
.title-input {
  display: flex;
  align-items: center;
  .title {
    width: 18%;
    font-size: 16px;
  }

  .input {
    flex: 1;
  }
}
</style>
