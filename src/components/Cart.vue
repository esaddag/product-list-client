<script setup>
import { watch, ref } from "vue";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const props = defineProps(["cartList", "saleInfo"]);
const listSize = ref();
const total_card_price = ref(0);
const total_cash_price = ref(0);
const total_sale_price = ref(0);
const total_min_price = ref(0);
const current_payment = ref(0);
const alertText = ref();

// watch cart list and calculate total price for each item
// and list size for empty cart warning
watch(props, () => {
  total_card_price.value = 0;
  total_cash_price.value = 0;
  total_min_price.value = 0;

  props.cartList.forEach((val) => {
    if (!val.count > 0) {
      val.count = 1;
    }
    //console.log(val.cashPrice);
    total_card_price.value += Number(val.count * val.cardPrice);
    total_cash_price.value += Number(val.count * val.cashPrice);
    total_min_price.value += Number(val.count * val.minPrice);
  });

  listSize.value = props.cartList.length;
});

// remove item from cart list by id
function removeFromCart(id) {
  for (var i = 0; i < props.cartList.length; i++) {
    if (props.cartList[i].id === id) {
      props.cartList.splice(i, 1);
    }
  }
}

// add product manually
// if price is null show warning
let timeoutDuration;

const manualProduct = ref({});
function addManualProduct() {
  if (!manualProduct.value.cashPrice || !manualProduct.value.cardPrice) {
    alertText.value = " Fiyat alanları boş olamaz!";
    timeoutDuration = 5000;
    document.getElementById("manualAlert").hidden = false;
    document.getElementById("manualAlert").style.opacity = "100%";
    setTimeout(() => {
      document.getElementById("manualAlert").style.opacity = "0";
      document.getElementById("manualAlert").hidden = true;
    }, timeoutDuration);
    console.log(timeoutDuration);
  } else if (!manualProduct.value.productName || !manualProduct.value.brand) {
    alertText.value = " Ürün adı ve firma alanı boş olamaz!";
    timeoutDuration = 5000;
    document.getElementById("manualAlert").hidden = false;
    document.getElementById("manualAlert").style.opacity = "100%";
    setTimeout(() => {
      document.getElementById("manualAlert").style.opacity = "0";
      document.getElementById("manualAlert").hidden = true;
    }, timeoutDuration);
    console.log(timeoutDuration);
  } else {
    manualProduct.value.minPrice = manualProduct.value.cashPrice;
    const mp = JSON.parse(JSON.stringify(manualProduct.value));
    props.cartList.push(mp);
    console.log(timeoutDuration);
  }
}
// clear manu
function refreshManualProduct() {
  manualProduct.value = {};
}

function printSale() {
  console.log(typeof total_sale_price.value);
  if (total_sale_price.value < total_min_price.value) {
    timeoutDuration = 5000;
    document.getElementById("minPriceAlert").hidden = false;
    document.getElementById("minPriceAlert").style.opacity = "100%";
    setTimeout(() => {
      document.getElementById("minPriceAlert").style.opacity = "0";
      document.getElementById("minPriceAlert").hidden = true;
    }, timeoutDuration);

    total_sale_price.value = total_min_price.value;
    document.getElementById("total_sale_price").focus();
  } else {
    total_sale_price.value = total_sale_price.value * 1;
    printCart();
  }
}

function printCart() {
  var doc = new jsPDF({ putOnlyUsedFonts: false });
  doc.addFont("src/assets/Roboto-Regular.ttf", "Roboto-Regular", "normal");

  doc.setFont("Roboto-Regular", "normal"); // set font
  var myImage = new Image();
  myImage.src = "../../src/assets/glogo.png";

  myImage.onload = function () {
    doc.setLanguage("tr-TR");

    doc.addImage(myImage, "png", 10, 10, 60, 20);

    doc.setFontSize(30);
    doc.text("Satış Sözleşmesi", 90, 25);

    doc.setFontSize(10);
    doc.text("İsim - Soyisim:", 15, 45);
    doc.text("T.C. Kimlik No:", 15, 55);
    doc.text("Cep Telefonu:", 15, 65);
    doc.text("Ev Telefonu", 15, 75);
    doc.text("Email", 15, 85);
    doc.text("Teslimat Adresi", 80, 45);
    doc.text("İrtibat Adresi", 80, 65);
    doc.text("Satış Elemanı", 145, 45);
    doc.text("Sözleşme No", 145, 55);
    doc.text("Sözleşme Tarihi", 145, 65);
    doc.text("Ödeme Tipi", 145, 75);

    let newSaleInfo = JSON.stringify(props.saleInfo, (k, v) =>
      v && typeof v === "object" ? v : "" + v
    );

    newSaleInfo = JSON.parse(newSaleInfo);
    doc.setFontSize(12);
    if (newSaleInfo.customerName) {
      doc.text(newSaleInfo.customerName + "", 15, 50);
    }
    if (newSaleInfo.customerSurname) {
      doc.text(newSaleInfo.customerSurname + "", 15, 60);
    }
    if (newSaleInfo.TC) {
      doc.text(newSaleInfo.TC + "", 15, 70);
    }
    if (newSaleInfo.phone) {
      doc.text(newSaleInfo.phone + "", 15, 80);
    }
    if (newSaleInfo.email) {
      doc.text(newSaleInfo.email + "", 15, 90);
    }

    if (newSaleInfo.deliveryAddress) {
      doc.text(newSaleInfo.deliveryAddress + "", 80, 50);
    }
    if (newSaleInfo.contactAddress) {
      doc.text(newSaleInfo.contactAddress + "", 80, 70);
    }

    if (newSaleInfo.salesPerson) {
      doc.text(newSaleInfo.salesPerson + "", 145, 50);
    }
    if (newSaleInfo.saleDate) {
      doc.text(newSaleInfo.saleDate + "", 145, 60);
    }
    if (newSaleInfo.saleNo) {
      doc.text(newSaleInfo.saleNo + "", 145, 70);
    }
    if (newSaleInfo.paymentType) {
      doc.text(newSaleInfo.paymentType + "", 145, 80);
    }

    let newCList = JSON.stringify(props.cartList, (k, v) =>
      v && typeof v === "object" ? v : "" + v
    );

    newCList = JSON.parse(newCList);

    doc.setFont("Roboto-Regular", "normal"); // set font

    let data = [];
    newCList.forEach((element) => {
      data.push([
        element["productCode"],
        element["brand"] + " - " + element["productName"],
        element["count"],
        element["salePrice"],
      ]);
    });

    data.push([
      {
        content: "TOPLAM",
        colSpan: 3,
        styles: { halign: "center", fontSize: 15 },
      },
      {
        content: total_sale_price.value.toFixed(2),
        styles: { fontSize: 13 },
      },
    ]);

    data.push([
      {
        content: "PEŞİNAT",
        colSpan: 3,
        styles: { halign: "center", fontSize: 15 },
      },
      {
        content: (current_payment.value * 1).toFixed(2),
        styles: { fontSize: 13 },
      },
    ]);

    data.push([
      {
        content: "KALAN TUTAR",
        colSpan: 3,
        styles: { halign: "center", fontSize: 15 },
      },
      {
        content: (total_sale_price.value - current_payment.value).toFixed(2),
        styles: { fontSize: 15 },
      },
    ]);

    console.log(newCList[0]);
    console.log(data);

    doc.autoTable(["Ürün Kodu", "Ürün Adı", "Adet", "Fiyat"], data, {
      styles: { font: "Roboto-Regular" },
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 100 },
        2: { cellWidth: 15 },
        3: { cellWidth: 40 },
      },
      startY: 100,
    });
    doc.save("test.pdf");
  };
}
</script>

<template>
  <main>
    <!-- manuaL PRODUCT PRICE ALERT [START] -->
    <div class="row sticky-top" style="height: 1px">
      <div class="col-4"></div>
      <div class="ml-4 col-4">
        <div
          class="row alert mt-5 alert-danger alert-dismissible fade in"
          hidden
          id="manualAlert"
          role="alert"
        >
          <strong>Uyarı! </strong> {{ alertText }}
        </div>
        <div
          class="row alert mt-5 alert-danger alert-dismissible fade in"
          hidden
          id="minPriceAlert"
          role="alert"
        >
          <strong>Uyarı! </strong> Satış Fiyatı, Son Fiyat'tan küçük olamaz!
        </div>
      </div>
    </div>
    <!-- manuaL PRODUCT PRICE ALERT [END] -->

    <!-- EMPTY CART WARNING [START]-->
    <div v-if="listSize <= 0">
      <div class="alert alert-warning" role="alert">
        Sepetinizde ürün bulunmamaktadır!
      </div>
    </div>
    <!-- EMPTY CART WARNING [END] -->

    <!-- CART NOTE FIELD [START] -->
    <div class="row">
      <div class="col-8">
        <div class="card border-primary mb-3">
          <div class="card-body text-primary">
            <div class="row">
              <div class="form-group col-6">
                <h5 class="card-title">Müsteri</h5>
                <form>
                  <label for="inputCategory">İsim</label>
                  <input
                    type="text"
                    id="customer-name"
                    class="form-control"
                    v-model="saleInfo.customerName"
                  />

                  <label for="inputCategory">Soyisim</label>
                  <input
                    type="text"
                    id="customer-surname"
                    class="form-control"
                    v-model="saleInfo.customerSurname"
                  />

                  <label for="inputCategory">T.C.</label>
                  <input
                    type="number"
                    id="customer-tc"
                    class="form-control"
                    v-model="saleInfo.TC"
                  />

                  <label for="inputCategory">Cep Telefonu</label>
                  <input
                    type="tel"
                    id="customer-tel"
                    class="form-control"
                    v-model="saleInfo.phone"
                  />

                  <label for="inputCategory">Email</label>
                  <input
                    type="email"
                    id="customer-email"
                    class="form-control"
                    v-model="saleInfo.email"
                  />
                </form>
              </div>
              <div class="form-group col-6">
                <h5 class="card-title">Adres</h5>
                <form>
                  <label for="inputCategory">Teslimat Adresi</label>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    rows="5"
                    v-model="saleInfo.deliveryAddress"
                  ></textarea>
                  <br />
                  <label for="inputCategory">İrtibat Adresi</label>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    rows="5"
                    v-model="saleInfo.contactAddress"
                  ></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card border-warning mb-3">
          <div class="card-body text-warning">
            <div class="row">
              <div class="form-group col">
                <h5 class="card-title">SATIŞ BİLGİLERİ</h5>
                <form>
                  <label for="inputCategory">Satış Personeli</label>
                  <input
                    type="text"
                    id="salerperson"
                    class="form-control"
                    v-model="saleInfo.salesPerson"
                  />

                  <!-- <label for="inputCategory">Sözleşme Tarihi</label>
                  <input type="text" id="sales-date" class="form-control" /> -->

                  <label for="inputCategory">Termin Tarihi</label>
                  <input
                    type="text"
                    id="delivery-date"
                    class="form-control"
                    v-model="saleInfo.saleDate"
                  />

                  <label for="inputCategory">Sözleşme No</label>
                  <input
                    type="text"
                    id="sales-no"
                    class="form-control"
                    v-model="saleInfo.saleNo"
                  />

                  <label for="inputCategory">Ödeme Aracı</label>
                  <input
                    type="text"
                    id="paymrent-type"
                    class="form-control"
                    v-model="saleInfo.paymentType"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CART NOTE FIELD [END] -->

    <!-- CART TABLE [START] -->
    <form action="">
      <div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Nakit
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Kredi Kartı
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Vadeli
          </label>
        </div>
        <table id="mytable" class="table table-striped table-bordered w-auto">
          <thead>
            <!-- manuaL PRODUCT FIELD [START] -->
            <tr class="table-primary text-center">
              <th colspan="13">Manual Ürün Ekleme</th>
            </tr>
            <tr class="table-primary">
              <th scope="row"></th>
              <!-- <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-category"
                      name="manual-category"
                      class="form-control"
                      v-model="manualProduct.category"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-subCategory"
                      name="manual-subCategory"
                      class="form-control"
                      v-model="manualProduct.subCategory"
                    />
                  </div>
                </div>
              </td> -->
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-manufacturer"
                      name="manual-manufacturer"
                      class="form-control"
                      v-model="manualProduct.brand"
                    />
                  </div>
                </div>
              </td>
              <!-- <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-productGroup"
                      name="manual-productGroup"
                      class="form-control"
                      v-model="manualProduct.productGroup"
                    />
                  </div>
                </div>
              </td> -->
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-productName"
                      name="manual-productName"
                      class="form-control"
                      v-model="manualProduct.productName"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-productCode"
                      name="manual-productCode"
                      class="form-control"
                      v-model="manualProduct.productCode"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      id="manual-size"
                      name="manual-size"
                      class="form-control"
                      v-model="manualProduct.size"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col"></div>
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="number"
                      id="manual-cashPrice"
                      name="manual-cashPrice"
                      class="form-control input-number"
                      min="1"
                      v-model="manualProduct.cashPrice"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      type="number"
                      id="manual-cardPrice"
                      name="manual-cardPrice"
                      class="form-control input-number"
                      min="1"
                      v-model="manualProduct.cardPrice"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="row justify-content-center">
                  <button
                    type="button"
                    id="removeBtn"
                    @click="addManualProduct()"
                    class="btn btn-primary ml-1"
                  >
                    <i class="bi bi-plus-lg"></i>
                  </button>
                  <button
                    type="button"
                    id="removeBtn"
                    @click="refreshManualProduct()"
                    class="btn btn-info ml-1"
                  >
                    <i class="bi bi-arrow-clockwise"></i>
                  </button>
                  <!-- <button type="button" class="btn btn-success"><i class="bi bi-plus-square"></i></button> -->
                </div>
              </td>
              <td></td>
            </tr>

            <!-- manuaL PRODUCT FIELD [END] -->

            <!-- CART TABLE CONTENT FIELD [START] -->
            <tr class="thead-dark">
              <th style="max-width: 20px" scope="col">#</th>
              <!-- <th scope="col">Kategori</th>
              <th scope="col">Alt Kategori</th>
               -->
              <th scope="col">Firma</th>
              <!-- <th scope="col">Ürün Grubu</th> -->
              <th scope="col">Ürün Adı</th>
              <th scope="col">Ürün Kodu</th>
              <th scope="col">Ölçü</th>
              <th scope="col">Termin</th>
              <th scope="col">Peşin Fiyat</th>
              <th scope="col">KK Fiyat</th>
              <th scope="col">Son Fiyat</th>
              <th scope="col">Satış Fiyatı</th>
              <th style="min-width: 120px" scope="col">Adet</th>
              <!-- <th scope="col">Toplam</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in cartList" :key="product.id">
              <th scope="row">{{ product.id }}</th>
              <!-- <td>{{ product.category }}</td>
              <td>{{ product.subCategory }}</td> -->
              <td>{{ product.brand }}</td>
              <!-- <td>{{ product.productGroup }}</td> -->
              <td>{{ product.productName }}</td>
              <td>{{ product.productCode }}</td>
              <td>{{ product.size }}</td>
              <td><input type="date" /></td>
              <td>{{ product.cashPrice * product.count }}</td>
              <td>{{ product.cardPrice * product.count }}</td>
              <td>{{ product.minPrice * product.count }}</td>
              <td>
                {{
                  (product.salePrice = (
                    ((product.cardPrice * product.count) / total_card_price) *
                    total_sale_price
                  ).toFixed(2))
                }}
              </td>
              <!-- <td><button @click="addToCart(product)" type="button" class="btn btn-primary"><i class="far fa-eye">sepetten çıkar</i></button></td> -->
              <td>
                <div class="row justify-content-center">
                  <input
                    style="width: 60px"
                    type="number"
                    id="quantity"
                    name="quantity"
                    class="form-control input-number"
                    v-model="product.count"
                    min="1"
                  />
                  <button
                    type="button"
                    id="removeBtn"
                    @click="removeFromCart(product.id)"
                    class="btn btn-danger ml-1"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                  <!-- <button type="button" class="btn btn-success"><i class="bi bi-plus-square"></i></button> -->
                </div>
              </td>
              <!-- <td>{{ product.count * product.cashPrice }}</td> -->
            </tr>
            <tr class="table-warning">
              <th class="text-right" colspan="6" scope="row">
                <h4>SEPET TOPLAM</h4>
              </th>
              <td>
                <h4>{{ total_cash_price }}</h4>
              </td>
              <td>
                <h4>{{ total_card_price }}</h4>
              </td>
              <td>
                <h4>{{ total_min_price }}</h4>
              </td>
              <td>
                <h4>
                  <input
                    type="text"
                    :min="total_min_price"
                    id="total_sale_price"
                    class="form-control"
                    v-model="total_sale_price"
                  />
                </h4>
              </td>
            </tr>
            <tr class="table-warning">
              <th class="text-right" colspan="6" scope="row">
                <h4>PEŞİNAT</h4>
              </th>
              <td>
                <h4>
                  <input
                    type="text"
                    id="customer-name"
                    class="form-control"
                    v-model="current_payment"
                  />
                </h4>
              </td>
              <td>
                <input
                  type="text"
                  id="customer-name"
                  class="form-control"
                  v-model="current_payment"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="customer-name"
                  class="form-control"
                  v-model="current_payment"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="customer-name"
                  class="form-control"
                  v-model="current_payment"
                />
              </td>
            </tr>
            <tr class="table-warning">
              <th class="text-right" colspan="6" scope="row">
                <h4>KALAN</h4>
              </th>
              <td>
                <h4>{{ total_cash_price - current_payment }}</h4>
              </td>
              <td>
                <h4>{{ total_card_price - current_payment }}</h4>
              </td>
              <td>
                <h4>{{ total_min_price - current_payment }}</h4>
              </td>
              <td>
                <h4>{{ total_sale_price - current_payment }}</h4>
              </td>
            </tr>
          </tbody>
          <!-- CART TABLE CONTENT FIELD [END] -->
        </table>
      </div>
      <button
        type="button"
        id="printBtn"
        @click="printSale()"
        class="btn btn-primary ml-1"
      >
        <i class="bi bi-printer"></i>
        Yazdır
      </button>
    </form>
    <!-- CART TABLE [END] -->
  </main>
</template>

<style>
</style>