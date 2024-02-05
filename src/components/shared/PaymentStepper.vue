<template>
  <div class="container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-steps :active="active" finish-status="success">
      <el-step title="ingresar medio de pago"></el-step>
      <el-step title="Verificar compra"></el-step>
      <el-step title="Resultado compra"></el-step>
    </el-steps>

    <transition name="fade" mode="out-in">
      <div :key="active">
        <CardForm
          @form-validation="handleCardStep"
          class="mt-5 step-content"
          v-if="active === 0"
        />
        <PurchaseSummary
          @purchase-validation="handlePurchaseSummaryStep"
          class="mt-5 step-content"
          v-if="active === 1"
        />
        <PurchaseResult
          v-if="active === 2"
          @continue="handlePurchaseResult"
          :isSuccess="paymentResult"
        />
      </div>
    </transition>
    <!-- <button type="button" class="btn btn-primary mt-3" @click="next">
      Continuar
    </button> -->
  </div>
  <el-loading></el-loading>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CardForm from "./CardForm.vue";
import PurchaseSummary from "./PurchaseSummary.vue";
import PurchaseResult from "./PurchaseResult.vue";
import { ElLoading } from "element-plus";

export default defineComponent({
  components: {
    CardForm,
    PurchaseSummary,
    ElLoading,
    PurchaseResult,
  },
  setup(prop, { emit }) {
    const active = ref(0);
    const fullscreenLoading = ref(false);
    const paymentResult = ref(false);

    let showNextButton = false;
    let cardData: any;
    const next = () => {
      if (active.value >= 2) active.value = 0;
      else active.value++;
    };

    const handleCardStep = (data: any) => {
      cardData = data.cardData;
      if (cardData && cardData.toString().endsWith("1")) {
        paymentResult.value = false;
      } else {
        paymentResult.value = true;
      }
      next();
    };

    const handlePurchaseSummaryStep = async (data: any) => {
      try {
        fullscreenLoading.value = true;
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        });
      } finally {
        fullscreenLoading.value = false;
        next();
      }
    };

    const handlePurchaseResult = (data: any) => {
      if (paymentResult.value === true) {
        emit("close");
      } else {
        next();
      }
    };

    return {
      active,
      next,
      showNextButton,
      handleCardStep,
      cardData,
      handlePurchaseSummaryStep,
      fullscreenLoading,
      handlePurchaseResult,
      paymentResult,
    };
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
