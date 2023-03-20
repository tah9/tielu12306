
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/Guide/Guide","pages/home/home","pages/index/index","pages/home/selectStation","pages/order/OrderInfo","pages/order/order","pages/register/register","pages/order/order","pages/mine/mine","pages/trains/trains","pages/passengers/edit","pages/passengers/ChoosePassengers","pages/trains/SubmitOrder","pages/passengers/AddPassenger","pages/order/unFinished","pages/passengers/passengers","pages/pwd/pwd"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#3c99f9","backgroundColor":"#F8F8F8"},"tabBar":{"height":"44px","color":"#9ca1a7","selectedColor":"#2485c4","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/home.png","selectedIconPath":"static/home1.png","text":"首页"},{"pagePath":"pages/order/order","iconPath":"static/order.png","selectedIconPath":"static/order1.png","text":"订单"},{"pagePath":"pages/mine/mine","iconPath":"static/mine.png","selectedIconPath":"static/mine1.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"mobile","compilerVersion":"3.5.3","entryPagePath":"pages/Guide/Guide","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/Guide/Guide","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"uni-app","navigationStyle":"custom"}},{"path":"/pages/home/selectStation","meta":{},"window":{"navigationBarTitleText":"车站选择","enablePullDownRefresh":false}},{"path":"/pages/order/OrderInfo","meta":{},"window":{"navigationBarTitleText":"订单详情","enablePullDownRefresh":false}},{"path":"/pages/order/order","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"订单","enablePullDownRefresh":false}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"","navigationBarTextStyle":"black","navigationBarBackgroundColor":"white"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/trains/trains","meta":{},"window":{"navigationBarTitleText":"车票查询","enablePullDownRefresh":false}},{"path":"/pages/passengers/edit","meta":{},"window":{"navigationBarTitleText":"个人资料","titleNView":{"buttons":[{"fontWeight":"normal","text":"删除","fontSize":"14"}]}}},{"path":"/pages/passengers/ChoosePassengers","meta":{},"window":{"navigationBarTitleText":"选择乘车人","titleNView":{"buttons":[{"fontWeight":"normal","text":"完成","fontSize":"14"}]}}},{"path":"/pages/trains/SubmitOrder","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/passengers/AddPassenger","meta":{},"window":{"navigationBarTitleText":"添加乘车人"}},{"path":"/pages/order/unFinished","meta":{},"window":{"navigationBarTitleText":"未完成"}},{"path":"/pages/passengers/passengers","meta":{},"window":{"navigationBarTitleText":"乘车人","titleNView":{"buttons":[{"fontWeight":"normal","text":"添加","fontSize":"14"}]}}},{"path":"/pages/pwd/pwd","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
