<script setup>
import { watch, ref } from "vue";

const properties = ref({
  categories: "",
  subCategories: "",
  manufacturers: "",
  productGroups: "",
});

const filter = ref({
  category: [],
  subCategory: [],
  manufacturer: [],
  productGroup: [],
  productType: "",
  productName: "",
  productCode: "",
  size: "",
  color: "",
  minPrice: "",
  maxPrice: "",
});

const emit = defineEmits(["filter"])
emit("filter", filter.value)

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

async function submit(parameters) {
  console.log(filter.value);
}

fetchProperties();
</script>
<template>
  <main>
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
        mode="tags"
        :close-on-select="false"
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
        mode="tags"
        :close-on-select="false"
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
        mode="tags"
        :close-on-select="false"
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
        mode="tags"
        :close-on-select="false"
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
        
        <div class="form-group col-md-4"></div>
      </div>
      <button type="submit" v-on:click="submit" class="btn btn-primary">
        Filtrele
      </button>
    </form>
  </main>
</template>
