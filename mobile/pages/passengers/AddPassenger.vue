<template>
	<view>
		<view style="margin: 1em;">
			<text>基本信息</text>
		</view>
		<view style="margin-left: 2em;">
			<view class="item">
				<view><text>证件类型:</text></view>
				<view><text>中国居民身份证</text></view>
			</view>
			<view class="item">
				<view><text>姓名&emsp;&emsp;:</text></view>
				<input v-model="name" placeholder="请输入姓名" />
			</view>
			<view class="item">
				<view><text>证件号码:</text></view>
				<input v-model="cardId" placeholder="请输入证件号" />
			</view>
			<view class="item">
				<view><text>手机号码:</text></view>
				<input v-model="phone" placeholder="请填写乘客手机号码" />
			</view>

		</view>
		<view class="btn" @click="submit()">完成</view>
	</view>
</template>

<script>
	export default {
		onShow() {

		},
		data() {
			return {
				phone: '',
				name: '',
				cardId: ''
			}
		},
		methods: {
			submit() {
				
				if (this.phone === '' || this.name === '' || this.cardId === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入完整信息！',
					})
					return
				}
				let _this = this
				uni.getStorage({
					key:'user',
					success:u=>{
						uni.request({
							method: 'POST',
							url: _this.$BASE_URL + '/user/insertPassenger',
							data: {
								uid: u.data.uid,
								phone: _this.phone,
								name: _this.name,
								cardId: _this.cardId
							},
							success() {
								uni.showToast({
									icon: 'none',
									title: '添加成功！',
									success() {
										setTimeout(() => {
											uni.navigateBack()
										}, 1000)
									}
								})
							}
						})
					}
				})
				
			}
		},
	}
</script>

<style scoped>
	.item {
		padding: 1em 0;
		display: flex;
		justify-content: space-between;
	}

	.item>*:last-child {
		color: gray;
		flex: 1;
		text-align: left;
		margin-left: 2em;
	}

	.item>*:first-child {
		white-space: pre-wrap;
	}
</style>
