<template>
	<view class="leftWindow" :style="data.config && data.config.style?data.config.style:{}">
		{{data.config.style}}
	</view>
</template>

<script setup lang="ts">
import { onShow } from '@/source/hook/uniapp';
import { ComponentInternalInstance, computed, getCurrentInstance, inject, reactive, watch } from '@vue/composition-api';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const isTabBar = computed(() => {
	if (__uniConfig.tabBar.list.findIndex(item => item.pagePath == proxy.$route.meta.pagePath) == -1) return false;
	return true;
});

const data = reactive<Data>({
	config: {}
});
watch(isTabBar, value => {
	if (!getApp().$children[0].hideTabBar) {
		uni.hideTabBar()
	}
	if (value) {
		updateCssVar(60);
		data.config = {
			style: {
				backgroundColor: __uniConfig.tabBar.backgroundColor
			}
		}
	} else {
		const tmp = require.context('@/pages', true, /leftWindow\.(json|vue)$/);
		const tmpPath = /pages\/(.*)\/.*/.exec(proxy.$route.meta.pagePath);
		if (tmpPath && tmpPath.length == 2) {
			for (let i = 0; i < tmp.keys().length; i++) {
				if (new RegExp(`./${tmpPath[1]}/leftWindow.json`).test(tmp.keys()[i])) {
					const configTmp = tmp(tmp.keys()[i]);
					if (configTmp.width) {
						updateCssVar(configTmp.width);
						data.config = configTmp
					} else {
						updateCssVar(0);
					}
					break;
				}
			}
		}
	}
}, { immediate: true, deep: true })
function updateCssVar(width: number) {
	document.documentElement.style.setProperty('--window-left', `${width}px`)
}
onShow(() => {
	console.log(10010)
})

interface Data {
	config: {
		style?: {}
	}
}
</script>

<style lang="scss">
.leftWindow {
	flex: 1;
}
</style>
