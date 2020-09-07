<template>
  <div class="edit_container">
    <!-- 富文本插件 -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "RichText",
  props: {
    propsValue: {
      type: String,
    },
  },
  components: { quillEditor },
  data() {
    return {
      content: "",
      // 富文本编辑器参数
      editorOption: {},
    };
  },
  computed: {},
  watch: {
    content(val) {
      this.emitInput(val);
    },
    // 监听父组件的传值
    propsValue: {
      handler(newValue, oldValue) {
        console.log(newValue);
        if (newValue === oldValue || !newValue) {
          return;
        }
        if (typeof newValue === "string") {
          this.content = newValue;
        } else {
          console.log("RichText 参数传递错误！");
        }
      },
    },
  },
  mounted() {},
  methods: {
    /**
     * 功能函数 *
     */
    // 传值给父组件
    emitInput(val) {
      this.$emit("onchange", val);
    },
    // 准备编辑器
    onEditorReady(editor) {},
    // 失去焦点事件
    onEditorBlur() {},
    // 获得焦点事件
    onEditorFocus() {},
    // 内容改变事件
    onEditorChange() {},
  },
};
</script>

<style lang="less">
.edit_container {
  .ql-toolbar.ql-snow {
    line-height: 20px;
  }
}
</style>
