<template>
	<view v-if="station" style="display: flex;flex-direction: column;height: calc(100vh - 64px);" >
		<view style="padding:10vh 1.5em 0 1.5em;display: flex;color: #616161;">
			<view><text>很抱歉，按您的查询条件，当前未找到从
					<text style="font-weight: bold;margin: 0 3px;">{{station.curStation}}</text>
					到<text style="font-weight: bold;margin: 0 3px;">{{station.targetStation}}</text></text>
				的列车。
			</view>
		</view>
		<image mode="widthFix" src="../../static/train12306.jpg"></image>
	</view>
</template>

<script>
	export default{
		props:{
			station:{
				type:Object
			}
		},
		onShow() {
			
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		},
	}
</script>

<style scoped>
	
</style>