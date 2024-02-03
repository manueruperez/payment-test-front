<template>
  <div class="no-content d-flex justify-content-center align-items-center">
    <div class="text-center">
      <!-- To do -->
      <!-- <img
        src="@/assets/no-content.png"
        alt="No Content"
        class="img-fluid"
        style="max-width: 200px"
      /> -->
      <p class="mt-3">{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoContent",
  props: {
    message: {
      type: String,
      default: "No hay contenido disponible.",
    },
  },
});
</script>

<style scoped>
.no-content {
  min-height: 300px;
}
</style>
