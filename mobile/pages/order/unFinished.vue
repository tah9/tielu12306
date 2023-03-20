<template>
	<view style="background-color: #f3f3f3;height: 100vh;" v-if="order">
		<view
			style="display: flex;justify-content: space-between;color: white;padding: 6px 1em;background-color: #3c99f9;">
			<view style="display: flex;align-items: center;">
				<image style="width: 14px;height: 14px;margin-right: 4px;margin-bottom: -2px;"
					src="../../static/wait.png"></image>
				<view><text>未完成</text></view>
			</view>
			<view style="display: flex;">
				<view style="font-size: 12px;margin-top:4px;margin-right: 3px;"><text>剩余:</text></view>
				<countdown v-if="order" @finish="timeOver()" :time="order.datetime+10*60*1000-new Date().getTime()"
					:autoStart="true">
					<template v-slot="{minute, second}">
						<view>{{minute}}分{{second}}秒</view>
					</template> 
				</countdown>
			</view>
		</view>
		<view class="bg"></view>
		<view style="margin-top: -150px;"></view>
		<view class="card top-tips">
			<text>为了保证您顺利出行，请提前了解上、下站所在地政府有关防控政策、持相关有效证明乘车，并在车站和列车上全程佩戴口罩，感谢支持和配合。</text>
		</view>
		<view class="card main">
			<view class="top">
				<view class="column">
					<view><text>{{order.info.train.startData.startTime}}</text></view>
					<view><text>{{order.info.train.startData.stationName}}</text></view>

				</view>
				<view class="column" style="text-align: center;">
					<view style="display: flex;align-items: center;justify-content: center;margin-bottom: -18px;">
						<image style="width: 1em;height: 1em;margin-right: 6px;margin-bottom: -5px;"
							src="../../static/card.png">
						</image>
						<view><text style="font-size: 14px;">{{order.info.train.data.trainId}}</text></view>

					</view>

					<image mode="widthFix" style="width: 5em;margin-bottom: -8px;" src="../../static/arrow-right.jpg">
					</image>
					<view><text>{{order.info.train.time}}</text></view>
				</view>
				<view class="column">
					<view><text>{{order.info.train.endData.endTime}}</text></view>
					<view><text>{{order.info.train.endData.stationName}}</text></view>

				</view>
			</view>
			<view style="font-size: 12px;margin-top: 1em;"><text>发车时间：{{order.info.timeData.curDate}}</text></view>

			<view class="passengers">
				<view class="item" v-for="item in order.info.passengers">
					<view style="display: flex;flex-direction: column;">
						<view><text>{{item.name}}</text></view>
						<view><text>中国居民身份证</text></view>
						<view><text>01车&emsp;无座</text></view>
					</view>
					<view style="position: absolute;color: #f27c1d;right: 0.5em;top: 5px;font-size: 14px;">
						￥{{order.info.trainPrice}}
					</view>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view><text style="color: #808080;">取消订单</text></view>
			<view>
				<span style="font-size: 12px;color: gray;">总金额:</span>
				<span style="font-size: 12px;color: #f27c1d;">￥</span>
				<text style="color: #f27c1d;">{{order.info.allPrice}}</text>
			</view>
			<view @click="submit()"><text>立即支付</text></view>
		</view>
	</view>
</template>

<script>
	import countdown from '../../components/countdown-timer.vue'
	export default {
		onBackPress() {
			uni.switchTab({
				url: '/pages/order/order'
			});
			return true
		},
		methods: {
			timeOver() {
				uni.showToast({
					icon: 'none',
					title: '订单超时',
				})
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
			submit() {
				let _this = this
				uni.request({
					method: 'POST',
					data: {
						oid: _this.order.oid
					},
					url: _this.$BASE_URL + '/user/payOrder',
					success() {
						uni.showToast({
							icon: 'none',
							title: '支付成功！',
							success() {
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/order/order'
									})
								}, 1000)
							}
						})
					}
				})
			}
		},
		created() {
			let _this = this
			uni.getStorage({
				key: 'order',
				success: res => {
					_this.order = res.data
				},
			})
		},
		data() {
			return {
				order: null
			}
		},
		components: {
			countdown
		}
	}
</script>

<style scoped>
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 44px;
		line-height: 44px;
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 0 1em;
		background-color: white;
	}

	.bottom>view:last-child {
		width: 6em;
		border-radius: 4px;
		color: white;
		text-align: center;
		background-color: #f27c1d;
	}

	.main {
		margin-top: 8px !important;
		background-color: white;
		padding: 1em;
		margin-bottom: 50px;
	}

	.bg {
		width: 100%;
		height: 150px;
		background: linear-gradient(#3c99f9, rgba(0, 0, 0, 0));
	}

	.card {
		border-radius: 8px;
		margin: 4px 8px;
	}

	.top-tips {
		background-color: #fef7f1;
		padding: 6px 1em;
		line-height: 1.7em;
		font-weight: bold;
		font-size: 12px;
		color: #bd694e;
	}

	.top {
		display: flex;
		justify-content: space-between;
	}

	.column {}

	.column>view:nth-child(1) {
		font-size: 1.25em;
		font-weight: bold;
	}

	.column>view:nth-child(2),
	.column>view:nth-child(3) {
		font-size: 14px;
		color: gray;
	}

	.station {
		font-size: 12px;
		color: gray;
	}

	.item {
		position: relative;
		padding-top: 5px;
		padding-bottom: 3px;
		border-top: 1px solid #f6f6f6;
		background-color: white;
	}

	.item>view>view:first-child {
		color: black;
	}

	.item>view>view:nth-child(2) {
		color: #8f8f8f;
		font-size: 14px;
		margin: 3px 0;
	}

	.item>view>view:last-child {
		font-size: 14px;
	}

	.passengers {
		overflow: hidden;
		background-color: white;
		margin: 1em 8px 0 8px;
		border-radius: 8px;
	}
</style>
