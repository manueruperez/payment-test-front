<template>
  {{ isSuccess }}
  <div class="text-center my-4">
    <div v-if="isSuccess">
      <i class="bx bx-check-circle" style="color: green; font-size: 48px"></i>
      <p>¡Tu compra fue exitosa!</p>
    </div>
    <div v-else>
      <i class="bx bx-x-circle" style="color: red; font-size: 48px"></i>
      <p>La compra no pudo realizarse.</p>
    </div>
    <button @click="emitContinue" class="btn btn-primary mt-3">
      Continuar
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isSuccess: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    emitContinue() {
      this.$emit("continue");
    },
  },
});
</script>
