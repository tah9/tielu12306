<template>
	<view class="item" v-if="trainData" @click="clickTrain()">
		<view class="item-row">
			<view class="time"><text>{{startData.startTime}}</text></view>
			<view style="font-weight: bold;font-size: 14px;"><text>{{trainData.trainId}}</text></view>
			<view class="time"><text>{{endData.endTime}}</text></view>
		</view>
		<view class="item-row">
			<view style="display: flex;align-items: center;">
				<view class="tag" :style="'background-color:'+startData.color">
					<text>{{startData.tag}}</text>
				</view>
				<view class="station"><text>{{startData.stationName}}</text></view>
			</view>
			<view class="center-time" @click.stop="timeClick()">

				<text>{{time}}</text>
				<image class="arrow" src="../../static/arrow.png" :style="open?'transform: rotate(180deg);':''"></image>
			</view>
			<view style="display: flex;align-items: center;">
				<view class="tag" :style="'background-color:'+endData.color">
					<text>{{endData.tag}}</text>
				</view>
				<view class="station"><text>{{endData.stationName}}</text></view>
			</view>
		</view>
		<view style="font-size: 13px;padding: 5px 1em 2px 1em;border-top: #f0f0f0 1px solid;margin-top: 5px;">
			<text>无座:</text>
			<span style="color:#44a083;margin-left: 3px;">有</span>
		</view>
		<view class="table" v-if="open">
			<view class="table-header">
				<view><text>站名</text></view>
				<view><text>到时</text></view>
				<view><text>发时</text></view>
				<view><text>停留</text></view>
			</view>
			<view class="table-row" v-for="(row,index) in trainData.stations">
				<view class="table-row-left">
					<view class="cricle">
						<image class="cricle-image" :src="cricleImg(index)"></image>
						<view class="up" :style="'background:'+getUpColor(index)"></view>
						<view class="down" :style="'background:'+getDownColor(index)"></view>
					</view>
					<view>
						<text>{{row.stationName}}</text>
					</view>
				</view>
				<view>
					<text>{{row.endTime}}</text>
				</view>
				<view>
					<text>{{row.startTime}}</text>
				</view>
				<view>
					<text>{{row.stopTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startData: null,
				endData: null,
				startIndex: null,
				endIndex: null,
				time: ''
			}
		},
		methods: {
			timeClick() {
				this.$emit('timeClick')
			},
			clickTrain() {
				let train = {
					data: this.trainData,
					startData: this.startData,
					endData: this.endData,
					time: this.time,
					stationSize: this.endIndex - this.startIndex
				}
				this.$emit('click', train)
			},
			getUpColor(index) {
				if (index === 0) {
					return 'white'
				} else if (index <= this.startIndex || index > this.endIndex) {
					return '#bcbcbc'
				} else {
					return '#3c99f9'
				}
			},
			getDownColor(index) {
				//只有最后一站是白色
				if (index === this.trainData.stations.length - 1) {
					return 'white'
				} else if (index < this.startIndex || index >= this.endIndex) {
					return '#bcbcbc'
				} else {
					return '#3c99f9'
				}
			},
			cricleImg(index) {
				if (index === this.startIndex ||
					index === this.endIndex) {
					return '../../static/curCricle.png'
				} else if (index >= this.startIndex && index <= this.endIndex) {
					return '../../static/blurCricle.png'
				} else {
					return '../../static/grayCricle.png'
				}
			},
			getTime(train) {
				let _this = this
				let startStation = train.stations[this.startIndex]
				let endStation = train.stations[this.endIndex]
				let startDate = startStation.startTime.split(':')
				let endDate = endStation.startTime.split(':')


				function addHours(hour, arriveDate) {
					if (arriveDate === '当日到达') {
						return hour
					} else if (arriveDate === '次日到达') {
						return hour + 24
					} else if (arriveDate === '两日到达') {
						return hour + 48
					}
				}

				let startHour = addHours(parseInt(startDate[0]), startStation.arriveDate)
				let startMine = parseInt(startDate[1])
				let endHour = addHours(parseInt(endDate[0]), endStation.arriveDate)
				let endMine = parseInt(endDate[1])
 
				let temp = train.stations[this.endIndex].time.split(':')

				let lastMines = (endHour - startHour) * 60 + endMine - startMine

				let hour = parseInt(lastMines / 60)
				let mine = lastMines % 60

				return hour === 0 ? mine + '分钟' : hour + '时' + mine + '分钟'
			},
			curInfo(train) {
				let _this = this
				for (let i = 0; i < train.stations.length; i++) {
					let station = train.stations[i]
					if (station.stationName.indexOf(_this.station.curStation) !== -1) {
						_this.startIndex = i
						if (i === 0) {
							station['tag'] = '始'
							station['color'] = '#f98f2d'
						} else {
							station['tag'] = '过'
							station['color'] = '#4397ed'
						}
						return station
					}
				}
			},
			targetInfo(train) {
				let _this = this
				for (let i = 0; i < train.stations.length; i++) {
					let station = train.stations[i]
					if (station.stationName.indexOf(_this.station.targetStation) !== -1) {
						_this.endIndex = i
						if (i === train.stations.length - 1) {
							station['tag'] = '终'
							station['color'] = '#3ac68a'
						} else {
							station['tag'] = '过'
							station['color'] = '#4397ed'
						}
						return station
					}
				}
			},
		},
		props: {
			trainData: {
				type: Object
			},
			station: {
				type: Object
			},
			open: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.startData = this.curInfo(this.trainData)
			this.endData = this.targetInfo(this.trainData)
			this.time = this.getTime(this.trainData)
		}
	}
</script>

<style scoped>
	.cricle {
		position: relative;
		margin-right: 12px;
	}

	.up,
	.down {
		width: 1.4px;
		left: 5.3px;
		top: 0;
		background-color: #656668;
		height: 1em;
		position: absolute;
	}

	.down {
		top: 1em;
	}

	.table-row-left {
		display: flex;
		align-items: center;
	}


	.cricle-image {
		width: 12px;
		background-color: white;
		border-radius: 999px;
		z-index: 99;
		height: 12px;
	}


	.table {
		margin-top: 3px;
		text-align: center;
	}

	.table-header,
	.table-row {
		font-size: 14px;
		display: flex;
		line-height: 2em;
		color: #656668;
		background-color: #f4f9ff;
		height: 2em;
	}

	.table-row {
		color: black;
		background-color: white;
	}

	.table-header>view,
	.table-row>view {
		flex: 1;
	}

	.table-header>view:first-child,
	.table-row>view:first-child {
		flex: 2;
		text-align: start;
		box-sizing: border-box;
		padding-left: 2em;
	}

	.item-row {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 3px 1em;
	}

	.center-time {
		position: absolute;
		left: calc(50% - 3em - 4px);
		overflow: hidden;
		text-align: center;
		top: 0;
		width: calc(6em + 8px);
		border-top: 0.2px solid #a5a7aa;
		font-size: 12px;
		color: #656668;
	}

	.arrow {
		margin-left: 3px;
		width: 8px;
		margin-top: 4px;
		height: 8px;
	}

	.station {
		font-size: 14px;
	}

	.time {
		font-weight: bold;
	}

	.tag {
		margin-right: 2px;
		padding: 0 2px;
		color: white;
		font-size: 12px;
		border-radius: 4px;
	}

	.item {
		margin: 14px;
		border-radius: 6px;
		background-color: white;
		padding: 8px 0;
		box-sizing: border-box;
	}

	.item-top {
		display: flex;
		justify-content: space-between;
	}

	.item-top>view {
		flex: 1;
		margin: 0 1em;
	}
</style>
