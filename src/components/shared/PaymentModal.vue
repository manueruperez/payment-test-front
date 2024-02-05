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
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
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
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PaymentStepper from "./PaymentStepper.vue";

export default defineComponent({
  name: "BuyCarrtView",
  components: {
    PaymentStepper,
  },
  methods: {
    handleClose() {
      // Usando la API de Bootstrap para cerrar el modal
      const modalElement = document.getElementById("staticBackdrop");
      if (modalElement) {
        // eslint-disable-next-line no-undef
        const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtiene la instancia del modal
        if (modalInstance) {
          modalInstance.hide(); // Cierra el modal
        }
      }
    },
  },
});
</script>
