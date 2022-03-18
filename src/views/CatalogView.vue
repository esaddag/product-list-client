<script setup>
import CatalogList from "@/components/CatalogList.vue";
import CatalogFilter from "@/components/CatalogFilter.vue";
import Cart from "@/components/Cart.vue";
import { ref } from "vue";

const filt = ref({});
const filterC = ref();
const cList = ref();

</script>

<template>
  <div class="container-fluid" style="width: 100%">
    <div class="row">
      <div class="col">
        <nav
          class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark m-0"
        >
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img src="../assets/gulyakalogo.png"  height="40" class="d-inline-block align-top" alt="">
              
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
                ><span aria-hidden="true">&times;</span></button>

              </div>
              
              <div class="modal-body" >
                <Cart :cartList="cList" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
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
