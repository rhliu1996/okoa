<template>
	<view class="content" @click="to">
        1
	</view>
</template>


<script setup lang="ts">
import { onShow } from '@/source/hook/uniapp';
function to() {
	uni.navigateTo({url:'/pages/index/home'})
}
</script>

<style>

</style>
