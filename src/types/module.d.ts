declare module 'vue/types/vue' {
    interface Vue {
        $route: {
            meta: {
                pagePath: string;
            }
        }
    }
}

export {}