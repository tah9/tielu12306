<template>
	<view>
		<name-list-view ref="sortPickerList" @clickData="clickData"></name-list-view>
	</view>
</template>

<script>
	import nameListView from './nickro-sortPickerList.vue'
	export default {
		components: {
			nameListView,
		},
		data() {
			return {
				list: null,
			}
		},
		methods: {

			clickData(name) {
				uni.getStorage({
					key: 'type',
					success(res) {
						uni.getStorage({
							key: 'station',
							success(s) {
								//获取出发站
								if (res.data === 0) {
									s.data.curStation = name
								}
								//获取目的站
								else {
									s.data.targetStation = name
								}
								if (s.data.targetStation === s.data.curStation) {
									uni.showToast({
										icon: 'none',
										title: '出发站与终点站不能相同！',
									})
									return
								}
								uni.setStorage({
									key: 'station',
									data: s.data,
									success() {
										uni.navigateBack()
									}
								})
							}
						})
					}
				})

			}
		},
		mounted() {
			this.$nextTick(function() {
				this.$refs["sortPickerList"].initPage()
			})
		}
	}
</script>

<style scoped>
</style>
