<template>
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Comprar carrito
  </button>

  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Pago de productos
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <PaymentStepper @close="handleClose" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PaymentStepper from "./PaymentStepper.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "BuyCartView",
  components: {
    PaymentStepper,
  },
  setup() {
    const store = useStore();
    const handleClose = () => {
      const closeButton = document.querySelector(
        "#staticBackdrop .btn-close"
      ) as HTMLElement;
      store.dispatch("clearCart");
      if (closeButton) closeButton.click();
    };
    return { handleClose };
  },
});
</script>
