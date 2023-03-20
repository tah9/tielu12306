<template>
	<view class="content">
		<h1 class="title">注册</h1>
		<view class="form">
			<uni-forms>
				<uni-forms-item name="iphone">
					<input class="input" type="text" value="" v-model="phone" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<input class="input" type="password" value="" v-model="password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>

			<view class="loginBtn" @click="submit">
				<text class="btnValue">注册</text>
			</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
			}
		},
		methods: {
			submit() {
				if (this.phone === '' || this.password === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入完整信息！',
					})
					return
				}
				let _this = this
				uni.request({
					url: _this.$BASE_URL + '/public/register',
					method: "POST",
					data: {
						phone: _this.phone,
						password: _this.password
					},
					success: res => {
						if (res.data.code === 200) {
							 uni.showToast({
							 	icon: 'none',
							 	title: '注册成功！',
								complete() {
									setTimeout(()=>{
										uni.navigateBack()
									},1000)
								}
							 })
						} else {
							uni.showToast({
								icon: 'none',
								title: '手机号已存在！',
							})
						}
					},
					fail: e => {
						console.log(e)
					}
				})
			},


		}
	}
</script>



<style>
	.content {
		width: 100vw;
		height: 100vh;
	}

	.title {
		margin-left: 100rpx;
		margin-top: 180rpx;
		color: #333333;
	}

	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}

	.inputWrapper {
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		border: 0.5px solid #a3a3a3;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}

	.inputWrapper .input {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}

	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #a3a3a3;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.loginBtn .btnValue {
		color: white;
	}

	.forgotBtn {
		text-align: center;
		color: #8d8d8d;
		font-size: 15px;
		margin-top: 20px;
	}

	.input {
		flex: 1;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		padding: 10px;
	}
</style>
