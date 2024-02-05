<template>
  <div class="container" v-loading.fullscreen.lock="fullscreenLoading">
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
import { defineComponent, Ref, ref } from "vue";
import CardForm from "./CardForm.vue";
import PurchaseSummary from "./PurchaseSummary.vue";
import PurchaseResult from "./PurchaseResult.vue";
import { ElLoading } from "element-plus";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    CardForm,
    PurchaseSummary,
    ElLoading,
    PurchaseResult,
  },
  setup(prop, { emit }) {
    const store = useStore();
    const active = ref(0);
    let paymentResult = ref(false);
    const fullscreenLoading = ref(false);

    let showNextButton = false;
    let cardData: any;
    const next = () => {
      if (active.value >= 2) active.value = 0;
      else active.value++;
    };

    const handleCardStep = (data: any) => {
      cardData = data.cardData;
      showNextButton = true;
      next();
    };

    const handlePurchaseSummaryStep = async (data: any) => {
      try {
        paymentResult.value = await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (cardData && cardData.endsWith("1")) {
              reject(false);
            } else {
              store.dispatch("clearCart");
              resolve(true);
            }
          }, 2000);
        });
      } catch (error) {
        paymentResult.value = false;
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
