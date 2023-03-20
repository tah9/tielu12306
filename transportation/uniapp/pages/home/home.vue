<template>
	<view>
		<swiper :autoplay='true' :interval='8000'>
			<swiper-item v-for="(item, index) in ['../../static/homelogo1.png','../../static/homelogo2.png']"
				:key="index">
				<view class="swiper-item">
					<image :src="item" mode="widthFix" class="image"></image>
				</view>
			</swiper-item>
		</swiper>
		<view style="position: absolute;top: 0;left: 0;right: 0;height: 50px;
		background: linear-gradient(rgba(0, 0, 0,.5), rgba(0,0,0,0);"></view>
		<view style="background: linear-gradient(rgb(239, 186, 136), rgba(0,0,0,0);height: 30px;"></view>
		<view class="main">
			<view class="main_top">
				<view @click="toSelectStation(0)"><text>{{station.curStation}}</text></view>
				<view class="center-logo" ref="logo" @click="switchStation()">
					<image src="../../static/switch.png"></image>
					</image>
					<image src="../../static/centerlogo.png"></image>
				</view>

				<view @click="toSelectStation(1)"><text>{{station.targetStation}}</text></view>
			</view>
			<uni-datetime-picker type="date" :value="station.curDate" :start="new Date().getTime()"
				:end="new Date().getTime()+86400000*14" @change="changeDate">
				<view style="align-items: center;display:flex">
					<uni-dateformat class="date" format="MM月dd日" :date="station.curDate"></uni-dateformat>
					<view><text>{{weekDay()}}</text></view>
				</view>
			</uni-datetime-picker>
			<view class="btn" style="width: 95%;margin-left:2.5%;" @click="query">查询车票</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				station: {
					curDate: '',
					curStation: '',
					targetStation: ''
				}
			}
		},
		methods: {
			weekDay() {
				return '周' + "日一二三四五六".charAt(new Date(this.station.curDate).getDay())
			},
			changeDate(date) {
				this.station.curDate = date
				uni.setStorage({
					key: 'station',
					data: this.station
				})
			},
			query() {
				uni.navigateTo({
					url: '../trains/trains',
					animationType: 'pop-in',
					animationDuration: 0
				})
			},
			switchStation() {
				let _this = this
				this.$nextTick(function() {
					// this.$refs['logo'].rotate(180)
				})
				console.log(_this.$refs.logo)
				let temp = this.station.curStation
				this.station.curStation = this.station.targetStation
				this.station.targetStation = temp
				uni.setStorage({
					key: 'station',
					data: _this.station
				})
			},
			toSelectStation(type) {
				uni.setStorage({
					key: 'type',
					data: type,
					success() {
						uni.navigateTo({
							url: '../home/selectStation',
							animationType: 'pop-in',
							animationDuration: 0
						})
					}
				})
			}
		},
		onShow() {
			let _this = this
			uni.getStorage({
				key: 'user',
				success() {
					uni.getStorage({
						key: 'station',
						success(res) {
							_this.station = res.data
						},
						fail() {
							_this.station.curStation = '北京'
							_this.station.targetStation = '上海'
							_this.station.curDate = new Date().getTime()
							uni.setStorage({
								key: 'station',
								data: _this.station
							})
						}
					})
				},
				fail() {
					uni.navigateTo({
						url: '/pages/index/index',
						animationDuration:0
					})

				}
			})

		}
	}
</script>

<style scoped>
	.date {
		margin: 8px;
		font-size: 1.3em;
		font-weight: bold;
	}

	.main {
		margin: -2em 1em 1em 1em;
		width: calc(100% - 2em);
		position: relative;
		z-index: 99;
		box-sizing: border-box;
		padding: 8px;
		border-radius: 6px;
		background-color: white;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}

	.center-logo {
		width: 1.1em;
		height: 1.1em;
		border-radius: 50%;
		display: grid;
	}

	.center-logo>* {
		grid-row-start: 1;
		grid-column-start: 1;
		width: 1em;
		height: 1em;
	}

	.center-logo>image:nth-child(1) {
		transform: scale(1.5) rotate(-8deg);
	}

	.center-logo>image:nth-child(2) {}


	.image {
		height: 230px;
		width: 100%;
	}

	.main_top {
		margin-bottom: 8px;
		margin-top: 8px;
		align-items: center;
		padding: 0 8px;
		box-sizing: border-box;
		font-size: 1.3em;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.main_top>view:nth-child(odd) {
		flex: 1;
		overflow: hidden;
	}

	.main_top>view:nth-child(3) {
		text-align: right;
	}
</style>
