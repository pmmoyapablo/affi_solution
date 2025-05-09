// --- Constants ---
const PROVIDERS = {
    PROVIDER_1: "PROVIDER_1",
  };
  
  const PRODUCT_STATUSES = {
    PENDING: "PENDING",
    ERROR: "ERROR",
    CANCELLED: "CANCELLED",
    REJECTED: "REJECTED",
    PROVIDER_PENDING: "PROVIDER_PENDING",
    WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT",
    WAITING_FOR_SHIPMENT: "WAITING_FOR_SHIPMENT",
  };
  
  const ORDER_STATUSES = {
    RESERVED: "RESERVED",
    SOLD: "SOLD",
  };
  
  const PAYMENT_TYPES = {
    PAYPAL: "PAYPAL",
    BANK_TRANSFER: "BANK_TRANSFER",
    CREDIT_CARD: "CREDIT_CARD",
    DEBIT_CARD: "DEBIT_CARD",
  };
  
  const RESELLERS = {
    RESELLER_X: "RESELLER_X",
    RESELLER_Y: "RESELLER_Y",
    RESELLER_Z: "RESELLER_Z",
  };
  
  const COUNTRIES = {
    FRANCE: "FR",
  };
  
  const MESSAGES = {
    NOT_CONFIRMED_PROVIDER_1: "no confirmado con provider 1",
    CANCELLED: "cancelado",
    CANNOT_PROCESS_ORDER: "pedido no pudo ser procesado",
    WAITING_TRANSFER: "esperando transferencia",
    CREDIT_PAYMENT: "pago con crédito", // Usado para PAYPAL o CREDIT_CARD en 'associated'
    DEBIT_PAYMENT: "pago con débito",
    NO_AUTH_REQUIRED: "no requiere autorización",
    PAYMENT_CONFIRMED_PENDING_SHIPMENT: "pago confirmado pendiente de envío",
    PENDING_CHARGE: "pendiente de cobro",
    PROVIDER_ERROR: "error proveedor",
    CONFIRMED_RESELLER_X: "confirmado con reseller X",
    CONFIRMED: "confirmado",
    CANCELLED_OR_REJECTED: "cancelado o rechazado",
    WAITING_PAYPAL: "esperando paypal", // Específico para !associated
    WAITING_CARD: "esperando tarjeta", // Específico para !associated (CREDIT_CARD o DEBIT_CARD)
    WAITING_AUTH: "esperando autorización",
    WAITING_SHIPMENT: "esperando envío",
    CONFIRMED_SPECIAL_RESELLER: "confirmado reseller especial",
  };
  
  // Mock para la prueba (se mantiene igual)
  function getPaymentMethods(order) {
    return {
      selectedMethod: order.payment || null,
      debit: order.payment && order.payment.type === PAYMENT_TYPES.DEBIT_CARD,
      authRequired: order.payment && order.payment.requiresAuth,
    };
  }
  
  // --- Helper Functions ---
  
  function determinePaymentMethodType(order, paymentMethodsInfo) {
    const selectedType = paymentMethodsInfo.selectedMethod?.type;
    if (selectedType) {
      return selectedType;
    }
    if (order.country === COUNTRIES.FRANCE && order.id < 745) {
      return PAYMENT_TYPES.PAYPAL;
    }
    return undefined; // O null, para indicar que no hay un método de pago determinado
  }
  
  function handleProvider1Notifications(order, messages) {
    if (
      order.productStatus === PRODUCT_STATUSES.PENDING ||
      order.productStatus === PRODUCT_STATUSES.ERROR
    ) {
      messages.push(MESSAGES.NOT_CONFIRMED_PROVIDER_1);
    }
    if (order.productStatus === PRODUCT_STATUSES.CANCELLED) {
      messages.push(MESSAGES.CANCELLED);
    }
  }
  
  function handleAssociatedOrderNotifications(order, paymentMethodType, paymentMethodsInfo, messages) {
    switch (order.productStatus) {
      case PRODUCT_STATUSES.PROVIDER_PENDING:
      case PRODUCT_STATUSES.PENDING:
      case PRODUCT_STATUSES.WAITING_FOR_PAYMENT:
        if (paymentMethodType === PAYMENT_TYPES.BANK_TRANSFER) {
          messages.push(MESSAGES.WAITING_TRANSFER);
        } else if (
          paymentMethodType === PAYMENT_TYPES.PAYPAL ||
          paymentMethodType === PAYMENT_TYPES.CREDIT_CARD
        ) {
          messages.push(MESSAGES.CREDIT_PAYMENT);
        } else if (paymentMethodsInfo && paymentMethodsInfo.debit) {
          messages.push(MESSAGES.DEBIT_PAYMENT);
        } else if (paymentMethodsInfo && !paymentMethodsInfo.authRequired) {
          messages.push(MESSAGES.NO_AUTH_REQUIRED);
        }
        break;
      case PRODUCT_STATUSES.WAITING_FOR_SHIPMENT:
        if (paymentMethodsInfo && paymentMethodsInfo.debit) {
          messages.push(MESSAGES.PAYMENT_CONFIRMED_PENDING_SHIPMENT);
        } else {
          messages.push(MESSAGES.PENDING_CHARGE);
        }
        break;
      case PRODUCT_STATUSES.ERROR:
        messages.push(MESSAGES.PROVIDER_ERROR);
        break;
      case PRODUCT_STATUSES.CANCELLED:
      case PRODUCT_STATUSES.REJECTED:
        messages.push(MESSAGES.CANCELLED_OR_REJECTED);
        break;
      default:
        // Considerar si hay un order.status relevante aquí
        if (order.status === ORDER_STATUSES.RESERVED || order.status === ORDER_STATUSES.SOLD) {
          if (order.reseller === RESELLERS.RESELLER_X) {
            messages.push(MESSAGES.CONFIRMED_RESELLER_X);
          } else {
            messages.push(MESSAGES.CONFIRMED);
          }
        }
        break;
    }
  }
  
  function handleNonAssociatedOrderNotifications(order, paymentMethodType, paymentMethodsInfo, messages) {
    switch (order.productStatus) {
      case PRODUCT_STATUSES.PROVIDER_PENDING:
      case PRODUCT_STATUSES.PENDING:
        if (paymentMethodType === PAYMENT_TYPES.BANK_TRANSFER) {
          messages.push(MESSAGES.WAITING_TRANSFER);
        } else if (paymentMethodType === PAYMENT_TYPES.PAYPAL) {
          messages.push(MESSAGES.WAITING_PAYPAL);
        } else if (
          paymentMethodType === PAYMENT_TYPES.CREDIT_CARD ||
          paymentMethodType === PAYMENT_TYPES.DEBIT_CARD
        ) {
          messages.push(MESSAGES.WAITING_CARD);
        } else if (paymentMethodsInfo && paymentMethodsInfo.authRequired) {
          messages.push(MESSAGES.WAITING_AUTH);
        } else {
          messages.push(MESSAGES.PENDING_CHARGE);
        }
        break;
      case PRODUCT_STATUSES.WAITING_FOR_SHIPMENT:
        messages.push(MESSAGES.WAITING_SHIPMENT);
        break;
      case PRODUCT_STATUSES.CANCELLED:
        messages.push(MESSAGES.CANCELLED);
        break;
      case PRODUCT_STATUSES.ERROR:
        messages.push(MESSAGES.PROVIDER_ERROR);
        break;
      default:
        // Considerar si hay un order.status relevante aquí
         if (order.status === ORDER_STATUSES.RESERVED || order.status === ORDER_STATUSES.SOLD) {
          if ([RESELLERS.RESELLER_Y, RESELLERS.RESELLER_Z].includes(order.reseller)) {
            messages.push(MESSAGES.CONFIRMED);
          } else {
            messages.push(MESSAGES.CONFIRMED_SPECIAL_RESELLER);
          }
        }
        break;
    }
  }
  
  
  // --- Main Refactored Function ---
  function getOrderNotification(order) {
    const messages = [];
    const paymentMethodsInfo = getPaymentMethods(order);
    const paymentMethodType = determinePaymentMethodType(order, paymentMethodsInfo);
  
    if (order.provider === PROVIDERS.PROVIDER_1) {
      handleProvider1Notifications(order, messages);
      // Nota: En el original, si provider era PROVIDER_1, no se ejecutaba más lógica.
      // Si se quisiera que SÍ se ejecutase el resto, no debería haber un return aquí.
      // Tal como estaba, el flujo terminaba aquí si se cumplía la condición.
      // Para mantener la funcionalidad original, el flujo no debe continuar si el provider es PROVIDER_1
      // por lo que los mensajes de PROVIDER_1 son exclusivos.
      return messages;
    }
  
    if (!order.locator) {
      messages.push(MESSAGES.CANNOT_PROCESS_ORDER);
      return messages; // Guard clause
    }
  
    // El `else` implícito de `!order.locator`
    if (order.associated) {
      handleAssociatedOrderNotifications(order, paymentMethodType, paymentMethodsInfo, messages);
    } else {
      handleNonAssociatedOrderNotifications(order, paymentMethodType, paymentMethodsInfo, messages);
    }
  
    return messages;
  }