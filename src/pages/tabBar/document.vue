<template>
    <view class="document">
        <view class="splie" v-for="(item,index) in data.view" :key="index"
            :style="item.type != 'editor'?{minWidth:`${item.width}px`}:{flex:1}">
            <view class="content">
                <view class="header">
                    123
                </view>
                <view class="main">

                </view>
                <view v-if="item.type == 'folder'" class="bottom">bottom</view>
            </view>
            <view v-if="item.type != 'editor'" class="vertical" @mousedown="mousedown"></view>
        </view>
    </view>
</template>


<script setup lang="ts">
import { onShow } from '@/source/hook/uniapp';
import { reactive } from '@vue/composition-api';
const data = reactive({
    view: [{
        type: 'folder',
        width: 200
    }, {
        type: 'file',
        width: 200
    }, {
        type: 'editor'
    }]
});
function mousedown(event:Event) {
    
}
</script>

<style lang="scss">
.document {
    flex: 1;
    flex-direction: row;

    .splie {
        flex-direction: row;
        position: sticky;
        border-right: 1px solid rgba($color: #000000, $alpha: 0.05);

        .content {
            flex: 1;

            .header {
                border-bottom: 1px solid rgba($color: #000000, $alpha: 0.05);
            }

            .main {
                flex: 1;
            }

            .bottom {
                border-top: 1px solid rgba($color: #000000, $alpha: 0.05);
                padding: 10px;
            }
        }

        .vertical {
            width: 4px;
            height: 100%;
            position: absolute;
            right: 0;
        }
    }
}
</style>
