function getOrderNotification(order) {
  let messages = [];
  let paymentMethod;
  let paymentMethods;

  paymentMethods = getPaymentMethods(order);
  const selected = paymentMethods.selectedMethod;
  if (!selected) {
    if (order.country === "FR" && order.id < 745) {
      paymentMethod = "PAYPAL";
    }
  } else {
    paymentMethod = selected.type;
  }

  if (order.provider === "PROVIDER_1") {
    if (order.productStatus === "PENDING" || order.productStatus === "ERROR") {
      messages.push("no confirmado con provider 1");
    }
    if (order.productStatus === "CANCELLED") {
      messages.push("cancelado");
    }
  } else if (!order.locator) {
    messages.push("pedido no pudo ser procesado");
  } else {
    if (order.associated) {
      if (
        order.productStatus === "PROVIDER_PENDING" ||
        order.productStatus === "PENDING" ||
        order.productStatus === "WAITING_FOR_PAYMENT"
      ) {
        if (paymentMethod === "BANK_TRANSFER") {
          messages.push("esperando transferencia");
        } else if (
          paymentMethod === "PAYPAL" ||
          paymentMethod === "CREDIT_CARD"
        ) {
          messages.push("pago con crédito");
        } else if (paymentMethods && paymentMethods.debit) {
          messages.push("pago con débito");
        } else if (paymentMethods && !paymentMethods.authRequired) {
          messages.push("no requiere autorización");
        }
      } else if (order.productStatus === "WAITING_FOR_SHIPMENT") {
        if (paymentMethods && paymentMethods.debit) {
          messages.push("pago confirmado pendiente de envío");
        } else {
          messages.push("pendiente de cobro");
        }
      } else if (order.productStatus === "ERROR") {
        messages.push("error proveedor");
      } else if (order.status === "RESERVED" || order.status === "SOLD") {
        if (order.reseller === "RESELLER_X") {
          messages.push("confirmado con reseller X");
        } else {
          messages.push("confirmado");
        }
      } else if (
        order.productStatus === "CANCELLED" ||
        order.productStatus === "REJECTED"
      ) {
        messages.push("cancelado o rechazado");
      }
    } else {
      if (
        order.productStatus === "PROVIDER_PENDING" ||
        order.productStatus === "PENDING"
      ) {
        if (paymentMethod === "BANK_TRANSFER") {
          messages.push("esperando transferencia");
        } else if (paymentMethod === "PAYPAL") {
          messages.push("esperando paypal");
        } else if (
          paymentMethod === "CREDIT_CARD" ||
          paymentMethod === "DEBIT_CARD"
        ) {
          messages.push("esperando tarjeta");
        } else if (paymentMethods && paymentMethods.authRequired) {
          messages.push("esperando autorización");
        } else {
          messages.push("pendiente de cobro");
        }
      } else if (order.productStatus === "WAITING_FOR_SHIPMENT") {
        messages.push("esperando envío");
      } else if (order.productStatus === "CANCELLED") {
        messages.push("cancelado");
      } else if (order.productStatus === "ERROR") {
        messages.push("error proveedor");
      } else if (order.status === "RESERVED" || order.status === "SOLD") {
        if (["RESELLER_Y", "RESELLER_Z"].includes(order.reseller)) {
          messages.push("confirmado");
        } else {
          messages.push("confirmado reseller especial");
        }
      }
    }
  }

  return messages;
}

// Mock para la prueba
function getPaymentMethods(order) {
  return {
    selectedMethod: order.payment || null,
    debit: order.payment && order.payment.type === "DEBIT_CARD",
    authRequired: order.payment && order.payment.requiresAuth,
  };
}
