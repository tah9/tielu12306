<template>
	<view style="background-color: #f3f3f3;height: 100vh;" v-if="order">
		<view
			style="display: flex;justify-content: space-between;color: white;padding: 6px 1em;background-color: #3c99f9;">
			<view style="display: flex;align-items: center;font-size: 14px;">
				<view style="margin-right: 3px;"><text>订单号:</text></view>
				<view><text>{{order.oid}}</text></view>
			</view>
			<view style="display: flex;align-items: center;font-size: 14px;">
				<view style="margin-right: 3px;"><text>下单时间:</text></view>
				<uni-dateformat format="yyyy.MM.dd" :date="order.datetime"></uni-dateformat>
			</view>
		</view>
		<view class="bg"></view>
		<view style="margin-top: -150px;"></view>

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
			<view style="font-size: 12px;margin-top: 1em;"><text>发车时间：<uni-dateformat format="yyyy年MM月dd日" :date="order.info.timeData.curDate">
					</uni-dateformat></text></view>

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

	</view>
</template>

<script>
	export default {
		methods: {},
		created() {
			let _this = this
			uni.getStorage({
				key: 'order',
				success: res => {
					if (typeof res.data.info === String)
						res.data.info = JSON.parse(res.data.info)
					_this.order = res.data
				}
			})
		},
		data() {
			return {
				order: null
			}
		},
		components: {}
	}
</script>

<style scoped>
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
