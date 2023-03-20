<template>
	<view>
		<view style="color:red"><text>{{tip}}</text></view>
		<uni-easyinput v-model="o" placeholder="请输入原密码"></uni-easyinput>
		<uni-easyinput v-model="n1" placeholder="请输入新密码"></uni-easyinput>
		<uni-easyinput v-model="n2" placeholder="请确认密码"></uni-easyinput>
		<view class="btn" @click="submit()">确认修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				o: '',
				n1: '',
				n2: '',
				tip: ''
			}
		},
		methods: {
			submit() {
				if (this.o === '' || this.n1 === '' || this.n2 === '') {
					this.tip = '请输入完整信息!'
					return
				}
				if (this.n1 !== this.n2) {
					this.tip = '两次密码输入不一致!'
					return
				}
				let _this = this
				uni.getStorage({
					key: 'user',
					success: res => {
						let user = res.data
						uni.request({
							url: _this.$BASE_URL + '/public/upPwd',
							method: 'POST',
							data: {
								phone: user.phone,
								opassword: _this.o,
								npassword: _this.n1
							},
							success:res=>{
								if(res.data.code===400){
									_this.tip='原密码错误'
									return
								}
								else{
									_this.tip='修改成功'
								}
							}
						})
					}
				})

			}
		}
	}
</script>

<style scoped>

</style>
