<template>
	<view>
		<TopDate @dateUpdate="dateUpdate"></TopDate>
		<view style="height: 8px;background-color: #3c99f9;"></view>
		<view class="main">
			<TrainItem @click="trainInfo" v-if="finish" v-for="(item,index) in rows" :trainData="item"
				:station="station" :open="openIndex===index" @timeClick="timeClick(index)"></TrainItem>
			<blank :station="station" v-if="rows&&rows.length===0"></blank>
		</view>
	</view>
</template>

<script>
	import blank from './blank.vue'
	import TrainItem from './TrainItem.vue'
	import TopDate from './TopDate.vue'
	export default {

		data() {
			return {
				openIndex: -1,
				finish: false,
				rows: null,
				station: null
			}
		},
		components: {
			blank,
			TopDate,
			TrainItem
		},
		methods: {
			trainInfo(train) {
				uni.setStorage({
					key: 'train',
					data: train,
					success() {
						uni.navigateTo({
							url: '/pages/trains/SubmitOrder'
						})
					}
				})

			},
			timeClick(index) {
				if (index !== this.openIndex) {
					this.openIndex = index
				} else {
					this.openIndex = -1
				}
			},

			dateUpdate(station) {
				uni.showLoading({
					title: '加载中'
				})
				uni.setNavigationBarTitle({
					title: station.curStation + '<>' + station.targetStation
				})
				let _this = this
				_this.finish = false
				_this.station = station
				//请求列车数据
				uni.request({
					method: 'POST',
					url: _this.$BASE_URL + '/user/getTrainsByCurAndTarget',
					data: station,
					success(res) {
						for (var i = 0; i < res.data.rows.length; i++) {
							res.data.rows[i].stations = JSON.parse(res.data.rows[i].stations)
						}
						_this.rows = res.data.rows
						_this.finish = true
						setTimeout(function() {
							uni.hideLoading();
						}, 1000);
					},

				})
			}

		},
		onShow() {
			let _this = this
			uni.removeStorage({
				key: 'passengers'
			})

		},
		created() {

		}
	}
</script>

<style scoped>
	.main {
		height: calc(100vh - 58px);
		overflow-y: scroll;
		margin-top: -10px;
		position: relative;
		border-radius: 12px 12px 0 0;
		z-index: 9;
		background-color: #f6f6f6;
	}
</style>
