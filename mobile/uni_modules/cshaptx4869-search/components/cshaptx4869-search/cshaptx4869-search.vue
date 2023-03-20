<template>
	<view class="search-panel">
		<!-- 检索框 -->
		<view class="search-panel-base">
			<view class="left">
				<icon type="search" size="16" class="search-icon" />
				<input-autocomplete class="unit-item__input search-input" 
					v-model="keyword" type="text" :placeholder="placeholder" highlightColor="#FF0000"
					:stringList="autocompleteStringList" @selectItem="nameClick">
				</input-autocomplete>
			</view>
		</view>

		<!-- 其他 -->
		<view   class="search-panel-more">
			<!-- 历史记录 -->
			<view class="search-more-title">
				<text>最近常用</text>
			</view>
			<view class="search-keywords" v-if="historyKeywords.length>0">
				<text class="search-keyword" v-for="(item,index) in historyKeywords" :key="index"
					@click="nameClick(item)">{{item}}</text>
			</view>
			<view v-else class="search-null">暂无</view>

			<!-- 热门搜索 -->
			<view class="search-more-title" v-if="hotKeywords.length>0">
				<text>热门车站</text>
			</view>
			<view class="search-keywords" v-if="hotKeywords.length>0 && showHotKeywords">
				<text class="search-keyword" v-for="(item,index) in hotKeywords" :key="index"
					@click="nameClick(item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import inputAutocomplete from '@/components/input-autocomplete/input-autocomplete.vue';
	export default {
		components: {
			inputAutocomplete
		},
		data() {
			return {
				keyword: '',
				showHotKeywords: true,
				historyKeywords: [],

			}
		},
		created() {
			uni.getStorage({
				key: this.historyStoreKey,
				success: res => {
					this.historyKeywords = JSON.parse(res.data);
				},
				fail: err => {

				}
			})
		},
		props: {
			autocompleteStringList: {
				type: Array
			},
			placeholder: {
				value: String,
				default: '请输入搜索内容'
			},
			historyStoreKey: {
				value: String,
				default: 'searchHistoryList'
			},
			borderColor: {
				value: String,
				default: '#FF0000'
			},
			textColor: {
				value: String,
				default: '#FF0000'
			},  
			maxHistoryKeywordNumber: {
				value: Number,
				default: 10
			},
			hotKeywords: {
				value: Array,
				default: []
			}
		},
		methods: {  
			nameClick(name){
				this.keyword=name
				this.saveKeyword()
			},
			saveKeyword() {
				if (!this.keyword) {
					return false;
				}
				let _this=this
				uni.getStorage({
					key: this.historyStoreKey,
					success: res => {
						let oldData = JSON.parse(res.data)
						let findIndex = oldData.indexOf(this.keyword)
						findIndex !== -1 && oldData.splice(findIndex, 1)
						oldData.unshift(this.keyword)
						//最多10个纪录
						oldData.length > this.maxHistoryKeywordNumber && oldData.pop()
						this.historyKeywords = oldData
						uni.setStorage({
							key: this.historyStoreKey,
							data: JSON.stringify(oldData),
							success() { 
								_this.$emit('search', _this.keyword)
							}
						});
					},
					fail: err => {
						let oldData = [this.keyword]
						uni.setStorage({
							key: this.historyStoreKey,
							data: JSON.stringify(oldData)
						});
						this.historyKeywords = oldData
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-panel {

		.search-panel-base {
			height: 100rpx;
			display: flex;
			padding: 6rpx 20rpx;
			background-color: #3c99f9;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 999;
			width: calc(100% - 40rpx);

			.left {
				flex: 1;
				background-color: white;
				height: 60upx;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				border: 1rpx solid #f2f2f2;

				.search-icon {
					flex: none;
					width: 30rpx;
					height: 30rpx;
				}

				.search-input {
					flex: 1;
					font-size: 14px !important;
					height: 100%;
					background-color: #ffffff;
					padding: 0 20rpx;
				}

				.search-del-icon {
					width: 35rpx;
					height: 35rpx;
				}
			}
		}

		.search-panel-more {
			margin-top: 100rpx;
			padding: 10rpx 20rpx;

			.search-more-title {
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-weight: 600;
				font-size: 26rpx;

			}

			.search-null {
				text-align: center;
				color: #8799a3;
			}

			.search-keywords {
				display: grid;
				margin-right: 25rpx;
				grid-template-columns: repeat(3, 33%);

				.search-keyword {
					overflow: hidden;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					line-height: 60rpx;
					background-color: #f0f1f5;
					padding: 0rpx 10rpx;
					border-radius: 8rpx;
					margin: 10rpx 25rpx 15rpx 0;
					color: #313131;
				}
			}
		}
	}
</style>
