import Vue from 'vue'
import App from '@/App.vue'
export function Configuration(value: object) {
    return function (target: any) {
        const main = new target();
        (async () => {
            if (main.onConfigLoad) {
                await main.onConfigLoad();
            }

            if (main.onReady) {
                await main.onReady(Vue);
            }

            new App().$mount()
        })();
    }
}