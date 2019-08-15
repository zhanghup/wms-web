<template>
  <div id="app">
    <layout/>
  </div>
</template>

<script>
import layout from "./components/layout/index";
import { setInterval } from 'timers';
export default {
  name: "App",
  components:{layout}
};
</script>


