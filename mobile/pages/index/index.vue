<template>
	<view class="content">
		<view class="avatorWrapper" style="margin-top: 20%;">
			<view class="avator">
				<image class="img" src="../../static/train.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<uni-forms >
				<uni-forms-item name="phone">
					<input class="input" type="text" value="" v-model="phone" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<input class="input" type="password" value="" v-model="password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>

			<view class="loginBtn" @click="submit()">
				<text class="btnValue">登录</text>
			</view>
		</view>
		<view class="forgotBtn">
			<navigator url="../register/register"><text>- 注册 -</text></navigator>
		</view>

	</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				phone: '17811122211',
				password: '123456789',
			}
		},
		onLoad() {

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
					url: _this.$BASE_URL + '/public/login',
					method: "POST",
					data:{
						phone:_this.phone,
						password:_this.password
					},
					success: res => {
						if(res.data.code===200){
							uni.setStorage({
								key:'user',
								data:res.data.user,
								complete() {
									uni.switchTab({
										url:'/pages/home/home'
									})
								}
							})
						}else{
							uni.showToast({
								icon: 'none',
								title: '账号或密码错误！',
							})
						}
					},
					fail:e=>{
						console.log(e)
					}
				})
			},
		}
	}
</script>



<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		margin-top: 16px;
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 400upx;
		height: 300upx;
		overflow: hidden;
	}

	.avator .img {
		width: 100%
	}

	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}

	.input {
		flex: 1;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		padding: 10px;
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
</style>
