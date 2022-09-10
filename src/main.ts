import VueCompositionAPI from '@vue/composition-api';
import { VueConstructor } from 'vue'
import { mixins } from '@/source/hook/uniapp'


import { Configuration } from './source/bootstrap';
import { VueClass } from 'vue-class-component/lib/declarations';
@Configuration({})
export class MainConfiguration {
    async onReady(Vue:VueConstructor) { 
        Vue.mixin(mixins)
        Vue.use(VueCompositionAPI);
        Vue.config.productionTip = false
    }
}