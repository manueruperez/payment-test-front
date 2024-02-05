<template>
  <div class="container">
    <el-steps :active="active" finish-status="success">
      <el-step title="ingresar medio de pago"></el-step>
      <el-step title="Verificar compra"></el-step>
    </el-steps>

    <transition name="fade" mode="out-in">
      <div :key="active">
        <CardForm
          @form-validation="handleCardStep"
          class="mt-5 step-content"
          v-if="active === 0"
        />
        <PurchaseSummary class="mt-5 step-content" v-if="active === 1" />
      </div>
    </transition>
    <button
      v-if="showNextButton"
      type="button"
      class="btn btn-primary mt-3"
      @click="next"
    >
      Continuar
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CardForm from "./CardForm.vue";
import PurchaseSummary from "./PurchaseSummary.vue";

export default defineComponent({
  components: {
    CardForm,
    PurchaseSummary,
  },
  setup() {
    const active = ref(0);
    const showNextButton = false;
    const next = () => {
      if (active.value >= 2) active.value = 0;
      else active.value++;
    };
    return {
      active,
      next,
      showNextButton,
    };
  },
  methods: {
    handleCardStep(data: any) {
      console.log(data);
    },
  },
});
</script>

<style>
/* @keyframes blink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  animation: blink 2s ease-in-out;
} */
</style>
