<script setup>
import { watch, ref } from "vue";

const properties = ref({
  categories: "",
  subCategories: "",
  manufacturers: "",
  productGroups: "",
});


const filter = ref({
  category: "",
  subCategory: "",
  manufacturer: "",
  productGroup: "",
  productType: "",
  productName: "",
  productCode: "",
  size: "",
  color: "",
  minPrice: "",
  maxPrice: "",
});

const filterClick = ref({count: 0});

const emit = defineEmits(['filter', 'filterClick'])

async function fetchProperties() {
  const res = await fetch("http://localhost:8080/product/properties", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let propertiesRes = await res.json();
  properties.value.categories = propertiesRes[0];
  properties.value.subCategories = propertiesRes[1];
  properties.value.manufacturers = propertiesRes[2];
  properties.value.productGroups = propertiesRes[3];
}

function submit() {
  //console.log(filter.value);
  filterClick.value.count++;
  //console.log(filterClick.value.count)

}
emit("filter", filter.value)
emit("filterClick", filterClick.value )
fetchProperties();
</script>
<template>
  <main class="pt-1">

    <div class="accordion" style="background:azure;" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" style="background:azure;" id="headingOne">
      
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body" >
        <form v-on:submit.prevent="submitForm">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputCategory">Kategori</label>
                  <!--<select
                    v-model="filter.category"
                    id="inputCategory"
                    class="form-control"
                  >
                    <option selected>Seçiniz...</option>
                    <option v-for="category in properties.categories" :key="category">
                      {{ category }}
                    </option>
                    <option>...</option>
                  </select>-->
                  <Multiselect
                mode="single"
                :close-on-select="true"
                :searchable="true"
              v-model="filter.category"
              :native="false"
              :options="properties.categories"
            />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputSubCategory">AltKategori</label>
                  <!-- <select
                    v-model="filter.subCategory"
                    id="inputSubCategory"
                    class="form-control"
                  >
                    <option selected>Seçiniz...</option>
                    <option
                      v-for="subCategory in properties.subCategories"
                      :key="subCategory"
                    >
                      {{ subCategory }}
                    </option>
                  </select> -->
                  <Multiselect
                mode="single"
                :close-on-select="true"
                :searchable="true"
              v-model="filter.subCategory"
              :native="false"
              :options="properties.subCategories"
            />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputManufacturer">Üretici Firma</label>
                  <!--<select
                    v-model="filter.manufacturer"
                    id="inputManufacturer"
                    class="form-control"
                  >
                    <option selected>Seçiniz...</option>
                    <option
                      v-for="manufacturer in properties.manufacturers"
                      :key="manufacturer"
                    >
                      {{ manufacturer }}
                    </option>
                  </select>-->
                  <Multiselect
                mode="single"
                :close-on-select="true"
                :searchable="true"
              v-model="filter.manufacturer"
              :native="false"
              :options="properties.manufacturers"
            />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputProductGroup">Ürün Grubu</label>
                <!-- <select
                    v-model="filter.productGroup"
                    id="inputProductGroup"
                    class="form-control"
                  >
                    <option selected>Seçiniz...</option>
                    <option
                      v-for="productGroup in properties.productGroups"
                      :key="productGroup"
                    >
                      {{ productGroup }}
                    </option>
                  </select>-->
                  <Multiselect
                mode="single"
                :close-on-select="true"
                :searchable="true"
              v-model="filter.productGroup"
              :native="false"
              :options="properties.productGroups"
            />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputProductType">Ürün Tipi</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.productType"
                    id="inputProductType"
                    placeholder=""
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputProductName">Ürün Adı</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.productName"
                    id="inputProductName"
                    placeholder=""
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputProductCode">Ürün Kodu</label>
                  <input v-model="filter.productCode" type="text" class="form-control" id="inputProductCode" />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputSize">Boyut</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.size"
                    id="inputSize"
                    placeholder=""
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputColor">Renk</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter.color"
                    id="inputColor"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputMinFiyat">Min Fiyat</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="filter.minPrice"
                    id="inputMinFiyat"
                    placeholder=""
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputMaxFiyat">Max Fiyat</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="filter.maxPrice"
                    id="inputMaxFiyat"
                    placeholder=""
                  />
                </div>
                
                <div class=" form-group col-md-4 d-flex align-items-end justify-content-center">
                  <button type="submit" @click="submit" class="btn btn-primary flex-grow-1">
                Filtrele <i class="bi bi-filter"></i>
              </button></div>
              </div>
              
        </form>
      </div>
    </div>
  </div>
    </div>

   
  </main>
</template>
