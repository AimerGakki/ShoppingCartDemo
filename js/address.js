new Vue({
    el: '.container',
    data: {
        addressList:[]

    },
    mounted: function(){
        this.$nextTick(function() {
			getAddress();
		  })
    },
    methods: {
        getAddress: function() {
            let _this =this;
            _this.$http.get('data/address.json',{id:456}).then(response => {
                var res = response.data;
                if (res.status == 0) {
                    _this.addressList = res.result;
                }
                
            })
        }
    }
})