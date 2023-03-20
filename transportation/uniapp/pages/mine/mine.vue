<template>
	<view style="background-color: #f4f6fa;font-size: 0.9em;">
		<view class="top">
			<view class="background"></view>
		</view>
		<view class="user-card">
			<view class="card">
				<view class="top">
					<view class="userImage">
						<image src="../../static/av.png"></image>
					</view>
				</view>

				<view class="bottom">
					<view class="left">
						<view class="user-phone"> {{phone}} </view>
					</view>
					<view class="right flex-center">
						<!-- <uni-icons class="icon" type="right" size="20"></uni-icons> -->
					</view>
				</view>
			</view>
		</view>
		<view class="list-card">
			<view class="card" @click="toPassengers()">
				<view class="item">
					<view class="left flex-center">
						<image src="../../static/myIcon/1.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>乘车人</text>
					</view>
					<view class="right flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
			<view style="height: 1px;background-color: #f4f6fa;"></view>
			<view class="card" @click="toOrder()">
				<view class="item">
					<view class="left flex-center">
						<image src="../../static/myIcon/2.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>我的订单</text>
					</view>
					<view class="right flex-center">
						<uni-icons class="icon" type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="quit flex-center" @click="exit()">
			<view class="btn" style="margin: 0 1.5em;">
				退出登录
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				phone:null
			}
		},
		methods: {
			exit(){
				uni.removeStorage({
					key:'user',
					success() {
						uni.navigateTo({
							url:'/pages/index/index'
						})
					}
				})
				
			},
			toOrder(){
				uni.switchTab({
					url:'/pages/order/order'
				})
			},
			toPassengers() {
				uni.navigateTo({
					url: '/pages/passengers/passengers'
				})
			}
		},
		onShow() {
			let _this=this
			uni.getStorage({
				key:'user',
				success:res=>{
					_this.phone=res.data.phone
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		height: 250rpx;
		position: relative;

		.background {
			background-color: #5199ff;
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 180rpx;
			width: 100%;
		}
	}

	.icon {
		color: #96a1ae;
		font-size: 40rpx;
	}

	.user-card {
		height: 100rpx;
		padding: 0 15px;

		.card {
			position: relative;
			bottom: 62px;
			height: 250rpx;
			background-color: white;
			border-radius: 5px;

			.top {
				height: 30%;
				position: relative;

				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					background: white;
					width: 150rpx;
					height: 150rpx;
					border: #c0d1ff 2px solid;
					overflow: hidden;
					border-radius: 50%;
				}

				.userImage>image {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 80%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 1.6em;
						padding-left: 80rpx;
						height: 50%;
					}

					.user-phone {
						color: #96a1ae;
						padding-left: 80rpx;
						height: 50%;
						width: 100%;
						font-size: 0.9em;
					}
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.list-card {
		padding: 0 15px;

		.card {
			border-radius: 5px;
			position: relative;
			background-color: white;
			border-radius: 5px;
			padding: 5px 8px;

			.item {
				display: flex;
				height: 100rpx;

				.left {
					width: 15%;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.center {
					width: 65%;
					display: flex;
					justify-content: start;
					align-items: center;
					font-size: 1.1em;
				}

				.right {
					width: 20%;
					justify-content: flex-end;
				}
			}
		}
	}

	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}

	.quit {
		height: 100rpx;
		margin-top: 50px;

		// .btn {
		// 	background-color: #4f99ff;
		// 	border-radius: 30px;
		// 	width: 80%;
		// 	color: white;
		// 	font-size: 1.2em;
		// 	height: 100%;
		// }
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
