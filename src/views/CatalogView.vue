<script setup>
import CatalogList from "@/components/CatalogList.vue";
import CatalogFilter from "@/components/CatalogFilter.vue";
import Cart from "@/components/Cart.vue";
import { ref } from "vue";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const filt = ref({});
const filterC = ref();
const cList = ref();
const saleInfo = ref({});

function printCart() {
  const doc = new jsPDF();
  //doc.addImage("../assets/glogo.png", "PNG", 15, 40, 180, 180);

  var myImage = new Image();
  myImage.src = "../../src/assets/glogo.png";
  myImage.onload = function () {
    doc.setLanguage("tr-TR");
    /*var reader = new FileReader();

    var file;
    let myFont;
    fs.readFile("../../src/assets/Roboto-Regular.ttf", function (err, file) {
      if (err) {
        throw err;
      }
      myFont = reader.readAsBinaryString(file);
    });

    doc.addFileToVFS("Roboto-Regular.ttf", myFont);
    doc.addFont("Roboto-Regular.ttf", "MyFont", "normal");
    doc.setFont("MyFont");*/
    doc.addImage(myImage, "png", 10, 10, 60, 20);
    doc.text("Satis Sözlesmesi", 60, 15);

    doc.setFontSize(10);
    doc.text("isim-soyisim:", 15, 50);
    doc.text("T.C. Kimlik No:", 15, 60);
    doc.text("Cep Telefonu:", 15, 70);
    doc.text("Ev Telefonu", 15, 80);
    doc.text("Teslimat Adresi", 80, 50);
    doc.text("İrtibat Adresi", 80, 70);
    doc.text("SözleşmeNo", 80, 70);
    doc.text("Sözleşme Tarihi", 80, 70);
    doc.text("Satış Elemanı", 80, 70);

    doc.setFontSize(15);
    doc.text(saleInfo.value.customerName + "", 15, 55);
    doc.text(saleInfo.value.customerName + "", 15, 65);
    doc.text(saleInfo.value.customerName + "", 15, 75);
    doc.text(saleInfo.value.customerName + "", 15, 85);
    let newCList = JSON.stringify(cList.value, (k, v) =>
      v && typeof v === "object" ? v : "" + v
    );
    console.log(doc.getFontList());
    doc.table(
      10,
      100,
      JSON.parse(newCList),
      [
        {
          id: "productCode",
          name: "productCode",
          prompt: "ÜRÜN KODU",
          width: 20,
          align: "center",
          padding: 0,
        },
        {
          id: "productName",
          name: "productName",
          prompt: "ÜRÜN ADI",
          width: 100,
          align: "center",
          padding: 0,
        },
        {
          id: "count",
          name: "count",
          prompt: "ADET",
          width: 15,
          align: "center",
          padding: 0,
        },
        {
          id: "cardPrice",
          name: "cardPrice",
          prompt: "FİYAT",
          width: 35,
          align: "center",
          padding: 0,
        },
      ],
      { autoSize: true }
    );

    //doc.autoTable({ head: ["productName"], body: cList.value });
    doc.save("test.pdf");
  };
}
</script>

<template>
  <div class="container-fluid" style="width: 100%">
    <div class="row">
      <div class="col">
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark m-0">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img
                src="../assets/gulyakalogo.png"
                height="40"
                class="d-inline-block align-top"
                alt=""
              />
            </a>
            <form class="d-flex justify-content-evenly">
              <button
                class="btn btn-info m-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Ürün Filtreleme
              </button>
              <button
                type="button"
                class="btn btn-primary m-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Sepete git
              </button>
            </form>
          </div>
        </nav>
        <CatalogFilter
          @filter="(msg) => (filt = msg)"
          @filterClick="(filterClickData) => (filterC = filterClickData)"
        />
        <!-- <p>{{ cList }}</p> -->
        <br />
        <!-- <h1>{{ saleInfo }}</h1> -->
        <CatalogList
          :msg="filt"
          :filterClick="filterC"
          @cart="(cartListData) => (cList = cartListData)"
        />

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl" style="max-width: 90%">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sepet</h5>
                <button
                  type="button"
                  class="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <Cart :cartList="cList" :saleInfo="saleInfo" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="printCart()"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
