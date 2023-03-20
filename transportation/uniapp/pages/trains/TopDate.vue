<template>
	<view class="top">
		<view style="flex: 1;" @click="preClick()"><text>{{preText}}</text></view>
		<uni-datetime-picker type="date" :start="new Date().getTime()" :end="new Date().getTime()+86400000*14"
			:value="station.curDate" @change="changeDate">
			<view class="date">
				<uni-dateformat format="MM月dd日" :date="station.curDate"></uni-dateformat>
				<view><text>{{weekDay()}}</text></view>
				<image src="../../static/date.png"></image>
			</view>
		</uni-datetime-picker>
		<view style="flex: 1;text-align: right;" @click="sufClick()"><text>{{sufText}}</text></view>
	</view>
</template>

<script>
	export default {
		created() {
			let _this = this
			uni.getStorage({
				key: 'station',
				success(res) {
					_this.station = res.data 
					_this.updatePreAndSufText()
				}
			})
		},
		data() {
			return {
				preText: '',
				sufText: '',
				station: {
					curDate: '',
					curStation: '',
					targetStation: ''
				},
			}
		},
		methods: {
			updatePreAndSufText() {
				let _this = this
				let curDate = new Date(_this.station.curDate)
				curDate.setHours(0, 0, 0, 0)
				let curTime = curDate.getTime()
				let nowDate = new Date()
				nowDate.setHours(0, 0, 0, 0)
				let now = nowDate.getTime()
				if (now === curTime) {
					_this.preText = ''
				} else {
					_this.preText = '前一天'
				}
				if (curTime === now + 86400000 * 14) {
					_this.sufText = ''
				} else {
					_this.sufText = '后一天'
				}
				_this.$emit('dateUpdate', _this.station)
			},
			preClick() {
				if (this.preText === '') {
					return
				}
				this.station.curDate = new Date(this.station.curDate).getTime() - 86400000
				this.save()

			},
			sufClick() {
				if (this.sufText === '') {
					return
				}
				this.station.curDate = new Date(this.station.curDate).getTime() + 86400000
				this.save()
			},
			weekDay() {
				return '周' + "日一二三四五六".charAt(new Date(this.station.curDate).getDay())
			},
			changeDate(date) {
				this.station.curDate = date
				this.save()
				this.updatePreAndSufText()
			},
			save() {
				uni.setStorage({
					key: 'station',
					data: this.station
				})
				this.updatePreAndSufText()
			}
		},
	}
</script>

<style scoped>
	.top {
		padding:0 1em;
		font-size: 14px;
		box-sizing: border-box;
		height: 44px;
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #3c99f9;
	}

	.date {
		border-radius: 4px;
		align-items: center;
		padding: 3px 4px;
		font-size: 13px;
		display: flex;
		background-color: white;
		width: 110px;
		justify-content: space-between;
		color: #3c99f9;
		margin-left: calc(50% - 55px);
	}

	.date image {
		width: 1em;
		height: 1em;
	}
</style>
