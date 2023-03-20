<template>
	<view>
		<image src="../../static/guide.jpg" class="main"></image>
		<view class="skip-btn" @click="skip()">跳过 &nbsp;{{number}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number: 3
			}
		},
		methods: {
			skip() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		onShow() {
			let _this = this
			let running = setInterval(() => {
				if (this.number > 0) {
					this.number -= 1
					return
				}
				_this.skip()
				clearInterval(running)

			}, 1000, 500)
		}
	}
</script>

<style scoped>
	.main {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
	}

	.skip-btn {
		border-radius: 999px;
		position: fixed;
		top: 2em;
		text-align: center;
		width: 4em;
		font-size: 14px;
		padding: 4px;
		color: white;
		right: 2em;
		background-color: #9b978b;
	}
</style>
