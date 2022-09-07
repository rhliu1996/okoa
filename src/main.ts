import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue'
import App from './App.vue'
import { mixins } from '@/source/hook/uniapp'
Vue.mixin(mixins)
Vue.use(VueCompositionAPI);
Vue.config.productionTip = false

new App().$mount()
