<template>
	<view style="background-color: #f4f5f7;height: 100vh;">
		<view class="item" v-for="(item,index) in rows">
			<checkbox @click="clickBox(index)" :checked="chooseList[index]"></checkbox>
			<view style="display: flex;flex-direction: column;">
				<view><text>{{item.name}}</text></view>
				<view><text>{{item.cardId}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rows: null,
				chooseList: [],
			}
		},
		methods: {
			clickBox(index) {
				this.chooseList[index] = !this.chooseList[index]
			}
		},
		onNavigationBarButtonTap(e) {
			let last = []
			for (let i = 0; i < this.rows.length; i++) {
				if (this.chooseList[i]) {
					last.push(this.rows[i])
				}
			}
			uni.setStorage({
				key: 'passengers',
				data: last,
				success() {
					uni.navigateBack()
				}
			})
		},
		created() {
			let _this = this
			uni.getStorage({
				key:'user',
				success(u) {
					uni.request({
						method: 'POST',
						url: _this.$BASE_URL + '/user/getPassengersByUid',
						data: {
							uid: u.data.uid
						},
						success: res => {
							uni.getStorage({
								key: 'passengers',
								success: mans => {
									for (let i = 0; i < res.data.rows.length; i++) {
										let has=false
										for (let j = 0; j < mans.data.length; j++) {
											if (mans.data[j].pid === res.data.rows[i].pid) {
												has=true
											}
										}
										_this.chooseList.push(has)
									} 
								},
								fail() {
									for (let i = 0; i < res.data.rows.length; i++) {
										_this.chooseList.push(false)
									}
								},
								complete() {
									_this.rows = res.data.rows
								}
							})
						}
					})
				}
			})
			
		}
	}
</script>

<style scoped>
	checkbox {
		position: absolute;
		top: calc(50% - 1em);
		bottom: 0;
		margin-left: 1em;
		left: 0;
		height: 14px;
		width: 14px;
	}

	.item {
		position: relative;
		background-color: white;
		padding: 1em 1em 1em 3.5em;
	}

	.item>view>view:first-child {
		color: black;
	}

	.item>view>view:last-child {
		color: #8f8f8f;
	}
</style>
