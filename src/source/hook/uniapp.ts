import Vue from "vue";
import { ComponentInternalInstance, getCurrentInstance } from "@vue/composition-api";

export const mixins: PageInstance = {
    onInit(query?) {
        if (this['onInit'] && typeof this['onInit'] == 'function') {
            if (query) {
                this['onInit'](query);
            } else {
                this['onInit']();
            }
        }
    },
    onLoad(query?) {
        if (this['onLoad'] && typeof this['onLoad'] == 'function') {
            if (query) {
                this['onLoad'](query);
            } else {
                this['onLoad']();
            }
        }
    },
    onShow() {
        if (this['onShow'] && typeof this['onShow'] == 'function') {
            this['onShow']();
        }
    }
}

/**
 * 生命周期回调 监听页面初始化
 *
 * 页面初始化时触发。一个页面只会调用一次，可以在 onInit 的参数中获取打开当前页面路径中的参数。
 * @param query 打开当前页面路径中的参数
 *
 * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
 */
export const onInit = (cb: ((query?: AnyObject) => void)) => {
    callback('onInit', cb);
}

/**
 * 生命周期回调 监听页面加载
 *
 * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
 * @param query 打开当前页面路径中的参数
 *
 * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
 */
export const onLoad = (cb: ((query?: AnyObject) => void)) => {
    callback('onInit', cb);
}

export const onShow = (cb: (() => void)) => {
    callback('onShow', cb);
}

function callback(name: keyof PageInstance, cb: any) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance & { proxy: PageInstance };
    if (!proxy[name]) {
        proxy[name] = cb
    }
}

type PageInstance = Page.PageInstance;