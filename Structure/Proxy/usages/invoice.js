import { createObservable } from "./observable";
const calculateTotal = (invoice) => {
  return invoice.subtotal - invoice.discount + invoice.tax;
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20,
}

let total = calculateTotal(invoice);

const obsInvoice = createObservable(invoice, ({ prop, prev, curr }) => {
  total = calculateTotal(invoice);
  console.info(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`);
});

obsInvoice.subtotal = 200; // TOTAL: 210 (subtotal changed: 100 -> 200)
obsInvoice.discount = 20; //TOTAL: 200 (discount changed: 10 -> 20)
obsInvoice.discount = 20;
obsInvoice.tax = 30; //TOTAL: 210 (tax changed: 20 -> 30)

