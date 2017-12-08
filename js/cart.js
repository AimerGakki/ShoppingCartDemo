var vm = new Vue({
	el: '#app',
	data: {
		productList: [],
		totalMoney:0,
		checkAllFlag:false,
		delFlag:false,
		curProduct: ''
		
	},
	filters: {
		formatMoney: function(value) {
			return '￥' + value.toFixed(2)
		}
	},
	mounted: function() {
		
		this.$nextTick(function() {
			this.cartView();
		  })
		
	},
	methods: {
		cartView: function() {
			//this作用域发生变化
			let _this = this;
			//$http.get用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象
			this.$http.get("data/cartData.json", {"id": 123}).then(res => {
				_this.productList = res.data.result.list;

			});
		},

		changeNumber: function(product,a) {
			if(a>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity = 1;
				}
			};
			this.calMoney();
		},

		selectProduct: function(item) {
			if(typeof item.checked == 'undefined'){
				Vue.set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			};
			this.calMoney();
			
		},

		checkAll: function(flag){
			this.checkAllFlag = flag;
			var _this = this;
			this.productList.forEach(function(item,index) {
				if(typeof item.checked == 'undefined'){
					_this.$set(item,'checked',_this.checkAllFlag);
				}else{
					item.checked = _this.checkAllFlag;
				}	
			});
			this.calMoney();
		},

		calMoney: function() {
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item,index) {
				if(item.checked) {
					_this.totalMoney += item.productQuantity * item.productPrice;
				}
			})
		},
		delConfirm: function(item) {
		this.delFlag = true;
		this.curProduct = item;
	},

		delProduct: function() {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			/**
			 * if (this.curProduct.checked) {
				this.
			}
			*/
			this.delFlag = false;
			this.calMoney();
	}

		
	}
	
})

Vue.filter('money',function(value,type) {
	return '￥' + value.toFixed(2) + type
})