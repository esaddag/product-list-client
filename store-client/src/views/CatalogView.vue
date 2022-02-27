<script setup>
import CatalogList from "@/components/CatalogList.vue";
import CatalogFilter from "@/components/CatalogFilter.vue";
import { ref } from 'vue'


const filter = ref()

</script>

<template>
  <main>
    <CatalogFilter @filter="(msg) => filter = msg" />
<p>{{ filter }}</p>
    <br />
    <CatalogList  :msg="filter" />
  </main>
</template>
