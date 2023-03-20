<template>
	<view style="background-color: #f4f5f7;height: 100vh;">
		<view class="item" v-for="item in rows" @click="edit(item)">
			<view style="display: flex;flex-direction: column;">
				<view><text>{{item.name}}</text></view>
				<view><text>{{item.cardId}}</text></view>
			</view>
			<image class="edit" src="../../static/edit.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rows: null
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/passengers/AddPassenger'
			})
		},
		methods: {
			edit(item) {
				uni.setStorage({
					key: 'edit',
					data: item,
					success() {
						uni.navigateTo({
							url: '/pages/passengers/edit'
						})
					}
				})
			}
		},
		onShow() {
			let _this = this
			uni.getStorage({
				key: 'user',
				success(u) {
					console.log(u)
					uni.request({
						method: 'POST',
						url: _this.$BASE_URL + '/user/getPassengersByUid',
						data: {
							uid: u.data.uid
						},
						success: res => {
							console.log(res.data)
							_this.rows = res.data.rows
						},
						fail(res) {
							console.log(res)
						}
					})
				}
			})


		}
	}
</script>

<style>
	.item {
		position: relative;
		background-color: white;
		padding: 1em 1em 1em 2em;
		border-bottom: 1px #f4f5f7 solid;
	}

	.item>view>view:first-child {
		color: #3c99f9;
	}

	.item>view>view:last-child {
		color: #8f8f8f;
		font-size: 14px;
	}

	.edit {
		right: 1em;
		position: absolute;
		top: calc(50% - 7px);
		width: 14px;
		height: 14px;
	}
</style>
