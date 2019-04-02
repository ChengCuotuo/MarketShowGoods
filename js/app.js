/*
* 1.对哪个（些）元素绑定监听？
* 2.绑定什么监听？
* 3.对哪个（些）进行DOM修改？
* */

$(function(){
    showhide();
    hoverSubMenu();

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

    /*
    * 2.鼠标移动切换二级当行菜单的切换显示和隐藏
    * */
    function hoverSubMenu(){
        $('#category_items>div').hover(function(){
            $(this).children(':last').show();
        }, function(){
            $(this).children(':last').hide();
        });
    }

});