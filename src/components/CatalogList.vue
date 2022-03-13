<script setup>
import { watch, ref, watchEffect, watchPostEffect } from "vue";
import router from "../router"
const productList = ref("");
const pagination = ref({
  page: 0,
  pageSize: 10,
  totalElements: 1,
  totalPage: 1,
});


const pageSizeOptions = ref([10, 20, 50, 100])
const sortOptions = ref([{"title":"Kategori", "value":"category"}, 
                         {"title":"Alt Kategori", "value":"subCategory"}, 
                         {"title":"Üretici Firma", "value":"manufacturer"},
                         {"title":"Ürün Grubu", "value":"productGroup"},
                         {"title":"Ürün Tipi", "value":"productType"},
                         {"title":"Ürün Adı", "value":"productName"},
                         {"title":"Ürün Kodu", "value":"productCode"},
                         {"title":"Boyut", "value":"size"},
                         {"title":"Renk", "value":"color"},
                         {"title":"Fiyat", "value":"purchasePrice"},
                         ])
let page = ref(1);
const pageSize = ref(10);
const totalElements = ref(10);
const totalPage = ref(2);

const sort = ref("id")

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
    import.meta.env.VITE_API_ENDPOINT+"/catalog/?page=" +
      (page.value) +
      "&size=" +
      pageSize.value,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization":"Bearer ".concat(localStorage.getItem("access_token"))},
    }
  )

  //console.log(props.msg)
  let catalogRes = await res.json();
  if(catalogRes.error_message && catalogRes.error_message.includes("The Token has expired")){
    router.push("/login")
  }
  productList.value = catalogRes.data;
  pagination.value = catalogRes.pagination;
  page.value= catalogRes.pagination.page
  totalElements.value = catalogRes.pagination.totalElements;
  totalPage.value = catalogRes.pagination.totalPages;
  pageSize.value = catalogRes.pagination.pageSize;
  try {
    document.getElementsByClassName("multiselect-clear")[0].remove()
  } catch (error) {
    
  }
}

async function fetchFilteredData(){
  
   const filteredRes = await fetch(
     
    import.meta.env.VITE_API_ENDPOINT+"/catalog/?page=" +
      (page.value) +
      "&size=" +
      pageSize.value,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization":"Bearer ".concat(localStorage.getItem("access_token")) },
      body: JSON.stringify(props.msg)
    }
  )

  let filterRes = await filteredRes.json();
  if(filterRes.error_message && filterRes.error_message.includes("The Token has expired")){
    router.push("/login")
  }
  productList.value = filterRes.data;
  pagination.value = filterRes.pagination;
  page.value= filterRes.pagination.page
  totalElements.value = filterRes.pagination.totalElements;
  totalPage.value = filterRes.pagination.totalPages;
  pageSize.value = filterRes.pagination.pageSize;
  try {
    document.getElementsByClassName("multiselect-clear")[0].remove()
  } catch (error) {
    
  } 

  
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

    fetchFilteredData()
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

  console.log(sort.value)
  
}

fetchData();

watch(props, () => {count.value = props.filterClick.count})
watch(count, ()=>{
  //console.log(props.msg); 
  const isEmpty = Object.values(props.msg).every(x => x === null || x === '');
  page.value=1
  if(!isEmpty){
    console.log("filter")    
    fetchFilteredData()
  }else{
    fetchData()
  }
  })

  watch(pageSize, fetchFilteredData)
watch(sort, ()=>{console.log(sort.value)})

  
  

</script>

<template>
  <main>
    <link href=https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/css/dataTables.bootstrap4.min.css rel=stylesheet>
    <!-- <h1>{{ filterClick }}</h1> -->
    <div class="row">
      <div class="col">
        <div class="row pb-2 pr-2 justify-content-end">
          <div class="col-md-2 pt-2 text-right">
            <p>Sıralama:</p>
          </div>
          <div class="col-md-2  pl-0">
          
          <select  v-model="sort" class="custom-select custom-select-md" aria-label="Default select example">
            <option v-for="sortOption in sortOptions" :key="sortOption.value" :value="sortOption.value">{{sortOption.title}}</option>
          </select>
            </div>
          <div class="col-md-2 pt-2 text-right">
            <p>Sayfa Başına Ürün Sayısı:</p>
          </div>
          <div class="col-md-1  pl-0">
          
          <Multiselect style=""
                :allow-empty="false"
                :close-on-select="true"
                :searchable="false"
                :clear-on-select="false"
              v-model="pageSize"
              :native="false"
              :options="pageSizeOptions"
            />
            </div></div>
        <table id=mytable class="table table-striped table-bordered">
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

        <b-pagination v-model="page" align="center" limit=10 last-number=false :total-rows="totalElements" :per-page="pageSize" aria-controls="my-table" @page-click="updatePage">
        </b-pagination>
        
      </div>
    </div>
  </main>
</template>
