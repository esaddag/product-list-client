<script setup>
import { watch, ref } from "vue";

const properties = ref({
  categories: "",
  subCategories: "",
  brands: "",
  productGroups: "",
  productNames: "",
  productCodes: "",
  sizes: "",
});

const filter = ref({
  category: "",
  subCategory: "",
  brand: "",
  productGroup: "",
  productName: "",
  size: "",
});

const filterClick = ref({ count: 0 });

const emit = defineEmits(["filter", "filterClick"]);

async function fetchProperties() {
  const res = await fetch(
    import.meta.env.VITE_API_ENDPOINT + "/catalog/filters",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(localStorage.getItem("access_token")),
      },
    }
  );
  let propertiesRes = await res.json();
  properties.value.categories = propertiesRes.categories;
  properties.value.subCategories = propertiesRes.subCategories;
  properties.value.brands = propertiesRes.brands;
  properties.value.sizes = propertiesRes.sizes;
  properties.value.productGroups = propertiesRes.productGroups;
  console.log(properties);
}

function submit() {
  //console.log(filter.value);
  filterClick.value.count++;
  //console.log(filterClick.value.count)
}

/* function clearFilter() {
  let filterList = document.getElementsByClassName("filter-form").;
  filterList.forEach((element) => {
    element.reset();
  });
} */

emit("filter", filter.value);
emit("filterClick", filterClick.value);
fetchProperties();
</script>
<template>
  <main class="pt-1">
    <div class="accordion" style="background: azure" id="accordionExample">
      <div class="accordion-item">
        <h2
          class="accordion-header"
          style="background: azure"
          id="headingOne"
        ></h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <form v-on:submit.prevent="submitForm">
              <div class="form-row">
                <div class="col-6">
                  <div class="form-row">
                    <div class="form-group col-md-3">
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
                        class="filter-form-input"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="inputSubCategory">AltKategori</label>
                      <Multiselect
                        mode="single"
                        :close-on-select="true"
                        :searchable="true"
                        v-model="filter.subCategory"
                        :native="false"
                        :options="properties.subCategories"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="inputManufacturer">Firma</label>
                      <Multiselect
                        mode="single"
                        :close-on-select="true"
                        :searchable="true"
                        v-model="filter.brand"
                        :native="false"
                        :options="properties.brands"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="inputProductGroup">Ürün Grubu</label>
                      <Multiselect
                        mode="single"
                        :close-on-select="true"
                        :searchable="true"
                        v-model="filter.productGroup"
                        :native="false"
                        :options="properties.productGroups"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="inputProductSize">Ölçü</label>
                      <Multiselect
                        mode="single"
                        :close-on-select="true"
                        :searchable="true"
                        v-model="filter.size"
                        :native="false"
                        minChars="1"
                        :options="properties.sizes"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="inputProductName">Ürün Adı</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="filter.productName"
                        id="inputProductName"
                        placeholder=""
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="inputProductCode">Ürün Kodu</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="filter.productCode"
                        id="inputProductName"
                        placeholder=""
                      />
                    </div>
                    <div
                      class="
                        form-group
                        col-md-2
                        d-flex
                        align-items-end
                        justify-content-center
                      "
                    >
                      <button
                        type="submit"
                        @click="submit"
                        class="btn btn-primary flex-grow-1"
                      >
                        Filtrele <i class="bi bi-filter"></i>
                      </button>
                    </div>
                    <!-- <div //todo: add clear filter feature
                      class="
                        form-group
                        col-md-1
                        d-flex
                        align-items-end
                        justify-content-center
                      "
                      style="padding-left: 0; margin-left: 0 !important"
                    >
                      <button
                        type="submit"
                        @click="clearFilter"
                        class="btn btn-danger flex-grow-1"
                      >
                        <i class="bi bi-x-circle"></i>
                      </button>
                    </div>  -->
                  </div>
                </div>
              </div>

              <!-- <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputProductCode">Ürün Kodu</label>
                  <input
                    v-model="filter.productCode"
                    type="text"
                    class="form-control"
                    id="inputProductCode"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputSize">Ölçü</label>
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
              </div> -->
              <div class="form-row">
                <!-- <div class="form-group col-md-4">
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
                </div> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
