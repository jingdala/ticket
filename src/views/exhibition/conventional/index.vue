<template>
  <div class="app-container">
    <ConventionalHeader></ConventionalHeader>
    <ConventionalContent></ConventionalContent>
  </div>
</template>

<script>
import ConventionalHeader from "./component/ConventionalHeader";
import ConventionalContent from "./component/ConventionalContent";

export default {
  name: "Conventional",
  components: { ConventionalHeader, ConventionalContent },
  filters: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
