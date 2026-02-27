import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';

async function loadPage(){
  await loadProductsFetch();
}
loadPage.then(()=>{

})

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  renderOrderSummary();
  renderPaymentSummary();
});

// new Promise((resolve) => {
//   //console.log('start promise')
//   loadProducts(() => {
//     //console.log('finished loading')
//     resolve("value1");
//   });
// }).then((value) => {
//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });

// loadProducts(() => {
// loadCart(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// })
// });
