$(function(){
    showhide();

    /*
    * 1.鼠标移入显示，移出隐藏
    * 目标：手机京东、客户服务、网站导航、我的京东、去购物车结算、全部属性
    * */
    function showhide(){
        //对 name='show_hide' 的标签进行监听
        //绑定的监听是 hover
        //修改的是 id 为上面 name 属性值加上 _items 的标签
        $('[name=show_hide]').hover(function(){ //显示
            var id = this.id + "_items";
            $('#'+id).show();
        }, function(){//隐藏
            var id = this.id + "_items";
            $('#'+id).hide();
        })
    }
})