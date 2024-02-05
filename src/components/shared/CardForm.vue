<template>
  <div
    class="ms-auto me-auto d-flex justify-content-center align-items-center"
    style="height: 200px; width: 200px"
  >
    <i
      v-if="cardType === 'Desconocido' || cardType === ''"
      class="bx bxs-credit-card-alt"
      style="font-size: 200px"
    ></i>
    <i
      v-else-if="cardType === 'Visa'"
      class="bx bxl-visa"
      style="font-size: 200px"
    ></i>
    <i
      v-else-if="cardType === 'Mastercard'"
      class="bx bxl-mastercard"
      style="font-size: 200px"
    ></i>
  </div>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    @submit.prevent="validateCard()"
  >
    <el-form-item prop="cardOwner">
      <el-input
        v-model="form.cardOwner"
        placeholder="Nombre del titular"
      ></el-input>
    </el-form-item>
    <el-form-item prop="cardNumber">
      <el-input
        v-model="form.cardNumber"
        placeholder="Ingrese el número de la tarjeta"
        type="text"
        maxlength="19"
        @input="detectCardType(form.cardNumber)"
      ></el-input>
    </el-form-item>
    <el-form-item prop="cardCVC">
      <el-input
        v-model="form.cardCVC"
        placeholder="Ingrese el CVC"
        type="text"
        maxlength="3"
      ></el-input>
    </el-form-item>
    <el-form-item prop="cardYear">
      <el-input
        v-model="form.cardYear"
        placeholder="Año"
        type="text"
        maxlength="4"
      ></el-input>
    </el-form-item>
    <el-form-item prop="cardMonth">
      <el-input
        v-model="form.cardMonth"
        placeholder="Mes"
        type="text"
        maxlength="2"
      ></el-input>
    </el-form-item>
    <el-form-item class="text-center">
      <button
        :disabled="disableSubmitButton"
        class="ms-auto me-auto btn btn-primary mt-3"
        native-type="submit"
      >
        Validar Tarjeta
      </button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, FormInstance } from "element-plus";

export default defineComponent({
  name: "CreditCardForm",
  components: {
    ElForm,
    ElFormItem,
    ElInput,
  },
  setup(props, { emit }) {
    const formRef = ref<FormInstance | null>(null);
    const cardType = ref("");
    let disableSubmitButton = false;
    const form = reactive({
      cardNumber: "",
      cardCVC: "",
      cardYear: "",
      cardMonth: "",
      cardOwner: "",
    });

    const rules = {
      cardNumber: [
        {
          required: true,
          message: "Por favor ingrese el número de la tarjeta",
          trigger: "blur",
        },
        {
          validator: (rule: any, value: any, callback) => {
            const regex = /^\d{13,19}$/;

            if (!regex.test(value)) {
              callback(new Error("Formato de número de tarjeta inválido"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
      cardCVC: [
        {
          required: true,
          message: "Por favor ingrese el CVC",
          trigger: "blur",
        },
        {
          validator: (rule: any, value: any, callback) => {
            const regex = /^\d{3}$/;

            if (!regex.test(value)) {
              callback(new Error("Formato de CVC inválido"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
      cardYear: [
        {
          required: true,
          message: "Por favor ingrese el año",
          trigger: "blur",
        },
        {
          validator: (rule: any, value: any, callback) => {
            const regex = /^\d{4}$/;
            const currentYear = new Date().getFullYear();

            if (!regex.test(value)) {
              callback(
                new Error("Formato de año inválido, debe ser de 4 dígitos.")
              );
            } else if (parseInt(value) < currentYear) {
              callback(
                new Error("El año debe ser igual o mayor al año actual.")
              );
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
      cardMonth: [
        {
          required: true,
          message: "Por favor ingrese el mes",
          trigger: "blur",
        },
        {
          validator: (rule: any, value: any, callback) => {
            const regex = /^\d{1,2}$/;
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            const selectedYear = parseInt(form.cardYear);

            if (!regex.test(value) || value < 1 || value > 12) {
              callback(
                new Error(
                  "Formato de mes inválido. Ingrese un valor entre 01 y 12."
                )
              );
            } else if (
              selectedYear === currentYear &&
              parseInt(value) < currentMonth
            ) {
              callback(
                new Error("El mes debe ser igual o mayor al mes actual.")
              );
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
      cardOwner: [
        {
          required: true,
          message: "Por favor ingrese el nombre del titular",
          trigger: "blur",
        },
      ],
    };

    const detectCardType = (number: string) => {
      const regexMap = [
        { type: "Visa", regex: /^4[0-9]{12}(?:[0-9]{3})?$/ },
        { type: "Mastercard", regex: /^5[1-5][0-9]{14}$/ },
        // { type: "American Express", regex: /^3[47][0-9]{13}$/ },
        // { type: "Discover", regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
        // Añade otras tarjetas según sea necesario
      ];

      const matchedCard = regexMap.find((card) =>
        card.regex.test(number.toString())
      );
      cardType.value = matchedCard ? matchedCard.type : "Desconocido";
      return matchedCard ? matchedCard.type : "Desconocido";
    };

    const validateCard = () => {
      if (!formRef.value) return;
      formRef.value.validate((valid) => {
        if (valid) {
          emit("form-validation", {
            valid: true,
            cardData: form,
            cardType: cardType.value,
          });
          disableSubmitButton = true;
        }
      });
    };

    return {
      formRef,
      form,
      rules,
      validateCard,
      cardType,
      detectCardType,
      disableSubmitButton,
    };
  },
});
</script>
