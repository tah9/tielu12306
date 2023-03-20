<template>
	<view>
		<scroll-view class="wxaSortPickerList" scroll-y="true" :style="{height: scrollHeight + 'px'}"
			:scroll-into-view="wxaSortPickerData.wxaSortPickertoView">
			<searchPanel placeholder="请输入城市/车站名" :maxHistoryKeywordNumber="6"
				:hotKeywords="'北京 上海 广州 天津 重庆 成都 长沙 哈尔滨 杭州'.split(' ')"
				 @search="wxaSortPickerItemTap" 
				:autocompleteStringList="autocompleteStringList"/>
			<block v-for="(item,index) in wxaSortPickerData.textData" :key="index">
				<view :id="item.tag" v-if="item.textArray.length>0" class="wxaSortPickerTag">{{item.tag}}</view>
				<view class='wxaSortPickerItem-box'>
					<block v-for="(child,inde) in item.textArray" :key="inde">
						<view class="wxaSortPickerItem" @tap="wxaSortPickerItemTap(child.name)">
							{{child.name}}
						</view>
					</block>
				</view>
			</block>
		</scroll-view>

		<scroll-view style="width:20px;" class="wxaSortPickerTemTags">
			<block v-for="(item,idx) in charsABC" :key="idx">
				<view :data-tag="item" class="wxaSortPickerTemTag" @tap="wxaSortPickerTemTagTap">{{item}}</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import searchPanel from '@/uni_modules/cshaptx4869-search/components/cshaptx4869-search/cshaptx4869-search'

	export default {
		props: {
			phones: Object
		},
		components: {
			searchPanel,
		},
		data() {
			return {
				autocompleteStringList:null,
				charsABC: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				wxaSortPickerData: {
					wxaSortPickertoView: '',
					view: {
						scrollHeight: '500px'
					},
					textData: require('../../static/stations.json'),
					dataType: 'dataType'
				},
				scrollHeight: 0
			}
		},
		mounted() {
			let autoStrings=[]
			let json=this.wxaSortPickerData.textData
			for (let i = 0; i < json.length; i++) {
				let array=json[i].textArray
				for (let j = 0; j < array.length; j++) {
					autoStrings.push(array[j].name)
				}
			}
			this.autocompleteStringList=autoStrings
			
			let windowHeight = uni.getSystemInfoSync().windowHeight

			// #ifndef APP-PLUS
			this.scrollHeight = windowHeight
			//#endif

			//#ifdef APP-PLUS
			this.scrollHeight = windowHeight
			//#endif
		},
		methods: {  
			initPage: function() {
				var that = this
				that.init()
			},
			init: function() {
				var that = this
				var temData = that.wxaSortPickerData;
				if (typeof temData == 'undefined') {
					temData = {};
				}
				/* that.wxaSortPickerUpper = wxaSortPickerUpper;
				that.wxaSortPickerLower = wxaSortPickerLower;
				that.wxaSortPickerScroll = wxaSortPickerScroll;
				that.wxaSortPickerTemTagTap = wxaSortPickerTemTagTap; */

				that.setViewWH(that);

			},
			wxaSortPickerItemTap(name) {
				var that = this;
				// console.log(e)
				// console.log(child)
				// var data = {
				// 	label: e.target.dataset.text,
				// 	value: e.target.dataset.value
				// }
				that.$emit('clickData', name)
			},
			wxaSortPickerTemTagTap: function(e) {
				var that = this;
				var temData = that.wxaSortPickerData;
				temData.wxaSortPickertoView = e.target.dataset.tag;
				that.wxaSortPickerData = temData
			},
			makePy: function(str) {
				var that = this;
				if (typeof(str) != "string")
					throw new Error(-1, "函数makePy需要字符串类型参数!");
				var arrResult = new Array(); //保存中间结果的数组  
				for (var i = 0, len = str.length; i < len; i++) {
					//获得unicode码  
					var ch = str.charAt(i);
					//检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理  
					arrResult.push(that.checkCh(ch));
				}
				//处理arrResult,返回所有可能的拼音首字母串数组  
				return that.mkRslt(arrResult);
			},
			checkCh: function(ch) {
				var that = this;
				var uni = ch.charCodeAt(0);
				//如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数  
				if (uni > 40869 || uni < 19968)
					return ch; //dealWithOthers(ch);
				//检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母  
				return (that.oMultiDiff[uni] ? that.oMultiDiff[uni] : (that.strChineseFirstPY.charAt(uni - 19968)));
			},

			// 
			getPosition: function(obj) {
				var top = 0;
				var left = 0;
				var width = obj.offsetWidth;
				var height = obj.offsetHeight;
				while (obj.offsetParent) {
					top += obj.offsetTop;
					left += obj.offsetLeft;
					obj = obj.offsetParent;
				}
				return {
					"top": top,
					"left": left,
					"width": width,
					"height": height
				};
			},
			query: function(text) {
				var that = this
				var str = that.trim(text);
				if (!str) return;
				var arrRslt = that.makePy(str);
				return arrRslt;
			},
			wxaSortPickerUpper: function(e) {
				//console.dir(e);
			},
			wxaSortPickerLower: function(e) {
				//console.dir(e);
			},
			wxaSortPickerScroll: function(e) {
				//console.log(e.detail.scrollTop);
			},
			setViewWH: function(that) {
				var that = this
				uni.getSystemInfo({
					success: function(res) {
						var windowHeight = res.windowHeight;
						var temData = that.wxaSortPickerData;
						if (typeof temData == 'undefined') {
							temData = {};
						}
						var view = {};
						that.scrollHeight = windowHeight; // windowHeight
						temData.view = view;
						that.wxaSortPickerData = temData
					}
				})
			}
		}
	}
</script>

<style>
	.wxaSortPickerTemTags {
		position: fixed;
		top: calc(50% + 18px);
		right: 20upx;

		color: #3c99f9;
		transform: translate(0, -50%);
	}

	.wxaSortPickerTemTag {
		text-align: center;
		padding: 4px 2upx;
		font-size: 26upx;
		font-weight: bold;
		line-height: 24upx;
	}

	.wxaSortPickerFixedTag {
		position: fixed;
		width: 100%;
	}

	.wxaSortPickerTag {
		background-color: #f0f1f5;
		font-size: 32upx;
		font-weight: bold;
		color: #46595F;
		height: 60upx;
		line-height: 60upx;
		padding: 0 32upx;
	}

	.wxaSortPickerItem-box {
		background-color: #fff;
		padding: 0 32upx;
	}

	.wxaSortPickerItem {
		height: 88upx;
		line-height: 88upx;
		border-bottom: 1px solid #DEE4E4;
		color: #313131;
		font-size: 32upx;
	}

	.wxaSortPickerItem:last-child {
		border-bottom: none;
	}
</style>
