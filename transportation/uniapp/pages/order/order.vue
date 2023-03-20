<template>
	<view style="background-color: #f0eff4;padding-bottom: 1em;min-height: 100vh;">
		<v-tabs bgColor="#3c99f8" :fixed="true" color="white" activeColor="white" lineColor="white" v-model="curIndex"
			:tabs="['已取消','待支付','已支付','历史']" :scroll="false" @change="getOrder"></v-tabs>
		<view style="background-color: #3c99f8;height: 10px;"></view>
		<view class="order" v-for="order in rows" @click="orderInfo(order)">
			<view class="order-time">
				<text style="margin-right: 6px;">下单日期:</text>
				<uni-dateformat :date="order.datetime" format="yyyy年MM月dd日 hh:mm:ss"></uni-dateformat>
			</view>
			<view class="main">
				<view class="row-one">
					<image style="width: 16px;height: 16px;margin-right: 12px;" src="../../static/ordertrain.png">
					</image>
					<view>
						<text>{{order.info.train.data.trainId}}</text>
					</view>
					<view>
						<text>{{order.info.train.startData.stationName}}</text>
					</view>
					<view><text>——</text></view>
					<view>
						<text>{{order.info.train.endData.stationName}}</text>
					</view>
				</view>
				<view class="row-main">
					<view style="display: flex;align-items: center;">
						<view style="text-align-last:justify;text-align:justify;width: 4em;">
							<text>订单号</text>
						</view>
						<view>
							<text>
								：{{order.oid}}
							</text>
						</view>
						<view style="margin-left: auto;color: #1eac83;">
							<text>{{getState(order.state)}}</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: 4px;">
						<view style="text-align-last:justify;text-align:justify;width: 4em;">
							<text>发车时间</text>
						</view>
						<view>
							<text>
								：{{order.info.train.startData.startTime}}
							</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: 4px;">
						<view style="text-align-last:justify;text-align:justify;width: 4em;">
							<text>总张数</text>
						</view>
						<view>
							<text>
								：{{order.info.passengers.length}}张
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curIndex: 1,
				rows: null,
			}
		},
		onShow() {
			this.getOrder(1)
		},
		methods: {
			orderInfo(order) {
				uni.setStorage({
					key: 'order',
					data: order,
					success() {
						if (order.state === 0) {
							uni.navigateTo({
								url: '/pages/order/unFinished'
							})
						} else {
							uni.navigateTo({
								url: '/pages/order/OrderInfo'
							})
						}
					}
				})


			},
			getState(state) {
				if (state === 0) {
					return '待支付'
				} else if (state === 1) {
					return '已支付'
				} else {
					return '已取消'
				}
			},
			getOrder(index) {
				let _this = this
				uni.getStorage({
					key: "user",
					success: u => {
						uni.request({
							method: 'POST',
							data: {
								uid: u.data.uid
							},
							url: _this.$BASE_URL + '/user/getOrdersByUid',
							success: res => {
								let last = []
								for (let i = 0; i < res.data.rows.length; i++) {
									let item = res.data.rows[i]
									if ((item.state === -1 && index === 0) ||
										(item.state === 0 && index === 1) ||
										(item.state === 1 && index === 2) ||
										(index === 3)) {
										item.info = JSON.parse(item.info)
										last.push(item)
									}
								}

								_this.rows = last
							}

						})
					}
				})

			}
		},
	}
</script>

<style scoped>
	.row-main {
		background-color: #fafafa;
		padding: 1em 2em 1em 3em;
		font-size: 13px;
		color: #7f7f7f;
	}

	.main {
		background-color: white;
		margin: 0 8px;
		border-radius: 8px;
	}

	.row-one {
		padding: 1em;
		display: flex;
		align-items: center;
	}

	.row-one>view {
		margin-right: 8px;
	}

	.order-time {
		border-radius: 99px;
		font-size: 12px;
		padding: 5px;
		font-weight: bold;
		background-color: #fff0da;
		color: #dda15c;
		margin: 8px;
	}

	.order {}
</style>
