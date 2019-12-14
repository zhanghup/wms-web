<template>
  <div :style="{padding}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "router",
  props: {
    padding: { type: String, default: "5px" }
  }
};
</script>
