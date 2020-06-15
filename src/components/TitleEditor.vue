<template>
  <div class="title-editor">
    <span class="title"> {{ title }} </span>
    <el-input
      v-model="editorCnt"
      type="textarea"
      :rows="10"
      class="editor"
      @change="handleChangeEditorContent"
    ></el-input>
  </div>
</template>

<script>

export default {
  name: "TitleEditor",
  components: {},
  props: {
    title: String,
    value: String,
  },
  data() {
    return {
      editorCnt: this.value,
    };
  },
  watch: {
    value(val) {
      this.editorCnt = val;
    }
  },
  methods: {
    handleChangeEditorContent(cnt) {
      this.$emit("update:value", cnt);
    },
  }
};
</script>

<style lang="scss" scoped>
.title-editor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 18%;
    font-size: 16px;
  }
  .editor {
    width: 82%;
  }
}
</style>
