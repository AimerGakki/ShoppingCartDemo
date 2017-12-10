new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNumber: 3,
        currentIndex: 0,
        delAddressFlag: false,
        curAddress: '',
        shippingMethod: 1

    },
    mounted: function(){
        this.$nextTick(function() {
			this.getAddress();
		  });
    },
    computed: {
        filteredItems: function(){
            return this.addressList.slice(0,this.limitNumber);
        }
    },
    methods: {
        getAddress: function() {
            let _this =this;
            this.$http.get('data/address.json',{id:456}).then(response => {
                var res = response.data;
                if (res.status == '0') {
                    _this.addressList = res.result;
                }
                
            })
        },
        setDefalut: function(addressId) {
            this.addressList.forEach((address,index) => {
                if(address.addressId==addressId){
                    address.isDefault = true;
                } else{
                    address.isDefault = false;
                }
            });
        },
        delConfirm: function(item) {
            this.delAddressFlag = true;
            this.curAddress = item;
        },
        delAddress: function() {
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delAddressFlag = false;
        }
    }
})