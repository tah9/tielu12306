<template>
	<view>
		<view style="margin: 1em;">
			<text>基本信息</text>
		</view>
		<view style="margin-left: 2em;" v-if="passenger">
			<view class="item">
				<view><text>证件类型:</text></view>
				<view><text>中国居民身份证</text></view>
			</view>
			<view class="item">
				<view><text>姓名&emsp;&emsp;:</text></view>
				<view><text>{{passenger.name}}</text></view>
			</view>
			<view class="item">
				<view><text>证件号码:</text></view>
				<view><text>{{passenger.cardId}}</text></view>
			</view>
			<view class="item">
				<view><text>手机号码:</text></view>
				<view><text>{{passenger.phone}}</text></view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap() {
			let _this = this
			uni.request({
				url: _this.$BASE_URL + '/user/deletePassenger',
				data: {
					pid: _this.passenger.pid
				},
				method:'POST',
				success() {
					uni.showToast({
						icon: 'none',
						title: '删除成功！',
						complete() {
							setTimeout(()=>{
							uni.navigateBack()
							},1000)
						}
					})
				}
			})
		},
		created() {
			let _this = this
			uni.getStorage({
				key: 'edit',
				success: res => {
					_this.passenger = res.data
				}
			})
		},
		data() {
			return {
				passenger: null
			}
		},
	}
</script>

<style scoped>
	.item {
		padding: 1em 0;
		display: flex;
		justify-content: space-between;
	}

	.item>*:last-child {
		color: gray;
		flex: 1;
		text-align: left;
		margin-left: 2em;
	}

	.item>*:first-child {
		white-space: pre-wrap;
	}
</style>
