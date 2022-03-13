<script setup>
import { watch, ref } from "vue";

const props = defineProps(["cartList"]);
const listSize = ref();

const total_price = ref(0);

watch(props, () => {
  total_price.value=0
  props.cartList.forEach((val) => {
    
    if(!val.count>0)
    {val.count=1}
    total_price.value += Number(val.count * val.purchasePrice);
  });

  listSize.value = props.cartList.length;
});

function removeFromCart(id) {
  // console.log(id)
  for (var i = 0; i < props.cartList.length; i++) {
    if (props.cartList[i].id === id) {
      props.cartList.splice(i, 1);
    }
  }
}
let timeoutDuration;
const manualProduct=ref({})
function addManualProduct(){
  
  if(!manualProduct.value.purchasePrice){
     timeoutDuration = 5000
     document.getElementById("nullPriceAlert").style.opacity="100%"
     setTimeout(()=>{document.getElementById("nullPriceAlert").style.opacity="0"}, timeoutDuration)
     console.log(timeoutDuration)

  }
  else{
const mp = JSON.parse(JSON.stringify(manualProduct.value)) 
  props.cartList.push(mp)
  console.log(timeoutDuration)
  }
  
}

function refreshManuelProduct(){
  manualProduct.value={}
}
</script>

<template>
  <main>
    <!-- <p>{{cartList}}</p>  -->
<div class="row sticky-top" style="height:1px">
  <div class="col-4"></div>
  <div class="alert mt-5 ml-3 col-4  alert-danger alert-dismissible fade in " id="nullPriceAlert" role="alert">
  <strong>Uyarı!</strong> Fiyat alanı boş olamaz!
</div></div>
    
    <div v-if="listSize <= 0">
      <div class="alert alert-warning" role="alert">
        Sepetinizde ürün bulunmamaktadır!
      </div>
    </div>
    <div class="card border-primary mb-3">
      
      <div class="card-body text-primary">
        <h5 class="card-title">Notlar</h5>
         <div class="form-group col">
      <textarea class="form-control" aria-label="With textarea"></textarea>
    </div>
      </div>
     
    </div>
    
    <div>
      <table id="mytable" class="table table-striped table-bordered w-auto">
        <thead>
          <tr class="table-primary text-center"><th colspan="13">Manuel Ürün Ekleme</th></tr>
          <tr class="table-primary">
            <th scope="row"></th>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
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
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
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
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-manufacturer"
                    name="manual-manufacturer"
                    class="form-control"
                    v-model="manualProduct.manufacturer"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-category"
                    name="manual-category"
                    class="form-control"
                    v-model="manualProduct.productGroup"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-category"
                    name="manual-category"
                    class="form-control"
                    v-model="manualProduct.productType"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-category"
                    name="manual-category"
                    class="form-control"
                    v-model="manualProduct.productName"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-category"
                    name="manual-category"
                    class="form-control"
                    v-model="manualProduct.productCode"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-category"
                    name="manual-category"
                    class="form-control"
                    v-model="manualProduct.size"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="text"
                    id="manual-category"
                    name="manual-category"
                    class="form-control"
                    v-model="manualProduct.color"
                  />
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                <div class="col">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    class="form-control input-number"
                    min="1"
                    v-model="manualProduct.purchasePrice"
                  />
                </div>
              </div>
            </td>
            <td>
               <div class="row justify-content-center">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                
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
                  @click="refreshManuelProduct()"
                  class="btn btn-info ml-1"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
                <!-- <button type="button" class="btn btn-success"><i class="bi bi-plus-square"></i></button> -->
              </div>
            </td>
            <td></td>
          </tr>
          <tr><th></th></tr>
          <tr class="thead-dark">
            <th style="max-width:20px" scope="col">#</th>
            <th scope="col">Kategori</th>
            <th scope="col">Alt Kategori</th>
            <th scope="col">Üretici Firma</th>
            <th scope="col">Ürün Grubu</th>
            <th scope="col">Ürün Tipi</th>
            <th scope="col">Ürün Adı</th>
            <th scope="col">Ürün Kodu</th>
            <th scope="col">Boyut</th>
            <th scope="col">Renk</th>
            <th scope="col">Adet Fiyat</th>
            <th style="min-width:120px" scope="col">Adet</th>
            <th scope="col">Toplam</th>
          </tr>
          
        </thead>
        <tbody>
          <tr v-for="product in cartList" :key="product.id">
            <th scope="row">{{ product.id }}</th>
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
            <!-- <td><button @click="addToCart(product)" type="button" class="btn btn-primary"><i class="far fa-eye">sepetten çıkar</i></button></td> -->
            <td>
              <div class="row justify-content-center">
                <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
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
            <td>{{ product.purchasePrice }}</td>
          </tr>
          <tr class="table-warning">
            <th class="text-right" colspan="12" scope="row"><h4>SEPET TOPLAM</h4></th>
            <td><h4>{{ total_price }}</h4></td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </main>
</template>

<style>



</style>