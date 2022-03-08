<script setup>
import {watch, ref } from "vue";



const props = defineProps(["cartList"])
const listSize = ref()

watch(props, () => {listSize.value = props.cartList.length})

function removeFromCart(id){
    // console.log(id)
     for( var i = 0; i < props.cartList.length; i++){ 
    
        if ( props.cartList[i].id === id) { 
    
            props.cartList.splice(i, 1); 
        }
    
    }
    
}

</script>

<template>
    <main>
        <!-- <p>{{cartList}}</p>  -->
        <div v-if="listSize>0">
            
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
              <th scope="col">Adet</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in cartList" :key="product.id">
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
              <!-- <td><button @click="addToCart(product)" type="button" class="btn btn-primary"><i class="far fa-eye">sepetten çıkar</i></button></td> -->
              <td>
                   
                <div class="row"  >
                    <!-- <button type="button" class="btn btn-danger"><i class="bi bi-dash-square"></i></button> -->
                    <input style="width:60px" type="number" id="quantity" name="quantity" class="form-control input-number" v-model="product.count" min="1">
                    <button type="button" id="removeBtn" @click="removeFromCart(product.id)" class="btn btn-danger ml-1"><i class="bi bi-trash"></i></button>
                    <!-- <button type="button" class="btn btn-success"><i class="bi bi-plus-square"></i></button> -->
                </div>
                    
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <div v-else>
            <div class="alert alert-warning" role="alert">
            Sepetinizde ürün bulunmamaktadır!
            </div>
        </div>
        
    </main>
</template>