<template>
	<view class="leftWindow" :style="data.config && data.config.style?data.config.style:{}">
		<template v-if="isTabBar">
			<view class="tabBar">
				<view class="item" v-for="item in data.config.list"
					:class="$route.meta.pagePath == item.pagePath?'active':''" :key="item.pagePath" :title="item.text">
					{{item.text}}
				</view>
			</view>
		</template>
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
			},
			list: __uniConfig.tabBar.list
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
		list?: {
			pagePath: string;
			text: string;
		}[]
	}
}
</script>

<style lang="scss">
.leftWindow {
	flex: 1;

	.tabBar {
		padding: 10px;

		.item {
			aspect-ratio: 1/1;

			&:hover {
				background-color: rgba($color: #fff, $alpha: 0.1);
				border-radius: 4px;
			}
		}

		.active {
			background-color: rgba($color: #fff, $alpha: 0.1);
			border-radius: 4px;
		}

		.item+.item {
			margin-top: 10px;
		}
	}
}
</style>
