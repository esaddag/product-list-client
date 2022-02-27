import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue3 from 'bootstrap-vue-3';
import Pagination from 'v-pagination-3';
import vSelect from "vue-select"
//import vueformConfig from './../vueform.config'
import Multiselect from '@vueform/multiselect'

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3)
//app.use(vueformConfig)
app.component("Multiselect",Multiselect)
app.component('pagination', Pagination);
app.component("v-select", vSelect);
app.mount("#app");
