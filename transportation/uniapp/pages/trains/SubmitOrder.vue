<template>
	<view style="background-color: #f6f6f6;height: 100vh;">
		<TopDate></TopDate>
		<view class="bg"></view>
		<view class="main" v-if="train">
			<view class="top">
				<view class="column">
					<view><text>{{train.startData.startTime}}</text></view>
					<view><text>{{train.startData.stationName}}</text></view>
					<view style="display: flex;align-items: center;margin-top: 6px;">
						<view class="tag" style="background-color:#f98f2d">
							<text>始</text>
						</view>
						<view class="station"><text>{{train.data.stations[0].stationName}}</text></view>
					</view>
				</view>
				<view class="column" style="text-align: center;">
					<view style="display: flex;align-items: center;justify-content: center;">
						<image style="width: 1em;height: 1em;margin-right: 6px;margin-bottom: -5px;"
							src="../../static/card.png">
						</image>
						<view><text style="font-size: 14px;">{{train.data.trainId}}</text></view>
					</view>

					<image mode="heightFix" style="height: 14px;margin-top: -8px;" src="../../static/arrow-right.jpg">
					</image>
					<view><text>{{train.time}}</text></view>
				</view>
				<view class="column">
					<view><text>{{train.endData.endTime}}</text></view>
					<view><text>{{train.endData.stationName}}</text></view>
					<view style="display: flex;align-items: center;margin-top: 6px;">
						<view class="tag" style="background-color:#3ac68a">
							<text>终</text>
						</view>
						<view class="station">
							<text>{{train.data.stations[train.data.stations.length-1].stationName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view style="border-bottom: 1px dashed #CCC;margin: 1em 0;"></view>
			<view class="seat">
				<icon type="success" size="16" color="#3c99f9" />
				<view><text>无座</text></view>
				<view><text>￥{{getPrice()}}</text></view>
				<view><text>有</text></view>
			</view>
		</view>
		<view style="height: calc(53vh + 2px);overflow: scroll;">

			<view class="passengers">
				<view class="item" v-for="item in passengers">
					<view style="display: flex;flex-direction: column;">
						<view><text>{{item.name}}</text></view>
						<view><text>{{item.cardId}}</text></view>
					</view>
					<image @click="del(item.pid)" src="../../static/del.png" class="del"></image>
				</view>
				<view class="check" @click="toChoose()">
					<icon type="cancel" color="#d17f3a" size="16" style="margin-right: 5px;transform: rotate(45deg);">
					</icon>
					<text style="color: #d17f3a;">选择乘车人</text>
				</view>
			</view>

			<view @click="submit()" class="btn" style="margin-top: 1em;margin-bottom: 3em;">提交订单</view>
		</view>
	</view>
</template>

<script>
	import TopDate from './TopDate.vue'
	export default {
		components: {
			TopDate
		},
		onShow() {
			let _this = this
			uni.getStorage({
				key: 'train',
				success(res) {
					_this.train = res.data
					uni.getStorage({
						key: 'passengers',
						success: res => {
							_this.passengers = res.data
						}
					})
				}
			})
		},
		data() {
			return {
				train: null,
				passengers: null
			}
		},
		methods: {
			verifyPassengers() {
				if (!this.passengers || this.passengers.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择乘车人！',
					})
					return false
				}
				return true
			},
			submit() {
				let _this = this

				if (this.verifyPassengers()) {
					let t = _this.getPrice()
					uni.getStorage({
						key: 'station',
						success(res) {
							uni.getStorage({
								key: 'user',
								success: u => {
									uni.request({
										url: _this.$BASE_URL + '/user/insertOrder',
										data: {
											uid: u.data.uid,
											info: JSON.stringify({
												train: _this.train,
												passengers: _this.passengers,
												timeData: res.data,
												trainPrice: t,
												allPrice: _this.passengers.length *t
											})
										},
										method: "POST",
										success: json => {
											json.data.order.info=JSON.parse(json.data.order.info)
											uni.setStorage({
												key: 'order',
												data: json.data.order,
												success() {
													uni.navigateTo({
														url: '/pages/order/unFinished'
													})
												}
											})
										},
									})
								}
							})
						}
					})
				}
			},
			del(pid) {
				for (let i = 0; i < this.passengers.length; i++) {
					if (this.passengers[i].pid === pid) {
						this.passengers.splice(i, 1)
					}
				}
				uni.setStorage({
					key: 'passengers',
					data: this.passengers
				})
			},
			toChoose() {
				uni.navigateTo({
					url: '/pages/passengers/ChoosePassengers'
				})
			},
			getPrice() {
				let name = this.train.data.trainId
				let tempArr = name.split('')
				let number = parseInt(tempArr[tempArr.length - 1])
				return 18 * this.train.stationSize + number
			}
		},
	}
</script>

<style scoped>
	.passengers {
		overflow: hidden;
		background-color: white;
		margin: 1em 8px;
		border-radius: 8px;
	}

	.check {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 45px;
		line-height: 45px;
	}

	.seat>icon {
		right: -2px;
		top: -2px;
		position: absolute;
	}

	.seat {
		padding: 3px;
		position: relative;
		overflow: hidden;
		flex-direction: column;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5em;
		height: 5em;
		background-color: #f6f9fe;
		border-radius: 8px;
		border: 1px #3c99f9 solid;
	}

	.bg {
		height: 100px;
		background: linear-gradient(#3c99f9, rgba(0, 0, 0, 0));
	}

	.main {
		border-radius: 8px;
		background-color: white;
		margin: -100px 8px 0 8px;
		padding: 1.5em;
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

	.del {
		width: 14px;
		height: 14px;
		position: absolute;
		right: 1em;
		top: calc(50% - 7px);
	}

	.item {
		position: relative;
		border-bottom: 1px solid #f6f6f6;
		background-color: white;
		padding: 14px 14px 10px 14px;
	}

	.item>view>view:first-child {
		color: black;
	}

	.item>view>view:last-child {
		color: #8f8f8f;
		font-size: 14px;
	}

	.tag {

		margin-right: 2px;
		padding: 0 2px;
		color: white;
		font-size: 12px;
		border-radius: 4px;
	}
</style>
