<template>
	<view class="content">
		100861
	</view>
</template>

<script setup lang="ts">
import { getCurrentInstance } from '@vue/composition-api';
import { onShow } from '@/source/hook/uniapp'
onShow(()=>{
	console.log(10086)
})
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 200rpx auto 50rpx auto;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
