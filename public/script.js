"use strict";
const add_receipt_items = document.querySelector("#add_receipt_items");
const add_invoice_items = document.querySelector("#add_invoice_items");
const invoicePage = document.querySelector(".invoice_page");
const receiptPage = document.querySelector(".receipt_page");
const invoice_item = document.querySelector(".invoice_item");
const receipt_item = document.querySelector(".receipt_item");
const selectReceiptBtn = document.querySelector(".receipt");
const selectInvoiceBtn = document.querySelector(".invoice");

// console.log(add_receipt_items);

const populate = function (element) {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("hi");

    const html = `  <div class="${element}">
        <div>
          <label>Description</label>
          <textarea name="description" cols="20" rows="2"></textarea>
        </div>
        <div>
          <label>Unit/Quantity</label>
          <input name="Unit" />
        </div>
        <div>
          <label>Price</label>
          <input type="text" name="price" />
        </div>
      </div>`;
    invoice_item.insertAdjacentHTML("afterend", html);
  });
};

selectInvoiceBtn.addEventListener("click", function (e) {
  e.preventDefault();
  receiptPage.style.display = "none";
  invoicePage.style.display = "block";
});

selectReceiptBtn.addEventListener("click", function (e) {
  e.preventDefault();
  receiptPage.style.display = "block";
  invoicePage.style.display = "none";
});

populate(add_receipt_items);
