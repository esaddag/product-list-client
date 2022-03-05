<script setup>
import { watch, ref, watchEffect, watchPostEffect } from "vue";

const productList = ref("");
const pagination = ref({
  page: 0,
  pageSize: 5,
  totalElements: 1,
  totalPage: 1,
});

let page = ref(1);
const pageSize = ref(5);
const totalElements = ref(10);
const totalPage = ref(2);

const cart = ref([])
const emit = defineEmits(['cart'])
emit("cart", cart.value)

const props = defineProps({
  msg: Object,
  filterClick: Object
  })

const count = ref(0)
async function fetchData() {
  productList.value = null;
  //console.log("page: "+page.value)
  const res = await fetch(
    "http://localhost:8081/product/products?page=" +
      (page.value) +
      "&size=" +
      pageSize.value,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization":"Bearer "+localStorage.getItem("access_token")},
    }
  );

  //console.log(props.msg)
  let catalogRes = await res.json();
  productList.value = catalogRes.data;
  pagination.value = catalogRes.pagination;
  page.value= catalogRes.pagination.page
  totalElements.value = catalogRes.pagination.totalElements;
  totalPage.value = catalogRes.pagination.totalPages;
  pageSize.value = catalogRes.pagination.pageSize;

  
}

async function fetchFilteredData(){
   const filteredRes = await fetch(
    "http://localhost:8080/product/search/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.msg)
    }
  )

  let filterRes = await filteredRes.json();
  productList.value = filterRes.data;
  pagination.value = filterRes.pagination;
  page.value= filterRes.pagination.page
  totalElements.value = filterRes.pagination.totalElements;
  totalPage.value = filterRes.pagination.totalPages;
  pageSize.value = filterRes.pagination.pageSize;

  
}

function updatePage(value) {
    const targetPage= value.target.innerText
    //console.log(targetPage)
    if(targetPage=="‹"){
        page.value = page.value-1;
    }else if(targetPage=="›"){
        page.value = page.value+1;
    }else if(targetPage==="\u00AB"){
        (page.value)=0
    }else if(targetPage==="\u00BB"){
        page.value = totalPage.value
        //console.log("total: "+totalPage.value)
        //console.log("page: "+page.value)
    }else{
        (page.value)=parseInt(targetPage)
    }

    fetchData()
}

function addToCart(product){
  let exists = false
  cart.value.forEach(function (el) {
    if(el.id == product.id){
      el.count++
      exists = true
    }
    
  });

  if(!exists)
  {
    let currentProduct = product
    currentProduct.count = 1
    cart.value.push(currentProduct)
    
  }

  // console.log(cart.value)
  
}

fetchData();

watch(props, () => {count.value = props.filterClick.count})
watch(count, ()=>{
  console.log(props.msg); 
  const isEmpty = Object.values(props.msg).every(x => x === null || x === '');
  
  if(!isEmpty){
    console.log("filter")
    fetchFilteredData()
  }else{
    fetchData()
  }
  })

</script>

<template>
  <main>
    <!-- <h1>{{ filterClick }}</h1> -->
    <div class="row">
      <div class="col">
        
        <table id=mytable class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Kategori</th>
              <th scope="col">Alt Kategori</th>
              <th scope="col">Üretici Firma</th>
              <th scope="col">Ürün Grubu</th>
              <th scope="col">Ürün Tipi</th>
              <th scope="col">Ürün Adı</th>
              <th scope="col">Ürün Kodu</th>
              <th scope="col">Boyut</th>
              <th scope="col">Renk</th>
              <th scope="col">Fiyat</th>
              <th scope="col">İşlemler</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productList" :key="product.id">
              <th scope="row">{{product.id}}</th>
              <td>{{ product.category }}</td>
              <td>{{ product.subCategory }}</td>
              <td>{{ product.manufacturer }}</td>
              <td>{{ product.productGroup }}</td>
              <td>{{ product.productType }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.productCode }}</td>
              <td>{{ product.size }}</td>
              <td>{{ product.color }}</td>
              <td>{{ product.purchasePrice }}</td>
              <td><button @click="addToCart(product)" type="button" class="btn btn-primary"><i class="bi bi-cart-plus"></i></button></td>
            </tr>
          </tbody>
        </table>

        <b-pagination v-model="page" :total-rows="totalElements" :per-page="pageSize" aria-controls="my-table" @page-click="updatePage">
        </b-pagination>
        
      </div>
    </div>
  </main>
</template>
