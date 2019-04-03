/*
* 1.对哪个（些）元素绑定监听？
* 2.绑定什么监听？
* 3.对哪个（些）进行DOM修改？
* */

$(function(){
    showhide();
    hoverSubMenu();
    search();
    share();
    address();
    clickTabs();

    /*
    *6.点击切换地址
    * */
    function clickTabs(){
        $('#store_tabs>li').click(function(){
            $('#store_tabs>li').removeClass('hover');
            //$('#store_tabs>li').attr('class');
            this.className = 'hover';
            //$(this).addClass('hover');
        })
    }

    /*
    * 5.鼠标移入移除切换地址的显示隐藏
    * */
    function address(){
        $('#store_select').hover(function(){
            $(this).children(':gt(0)').show();
        }, function(){
            $(this).children(':gt(0)').hide();
        }).children(':last').click(function(){
            $(this).parent().children(':gt(0)').hide();
        })
    }

    /*
    *  4.点击显示或者隐藏更多的分享图标
    * */
    function share(){
        var isOpen = false; //标识当前的状态，初始为关闭
        $('#shareMore').click(function() {
            var $shareMore = $('#shuuareMore');
            var $parent = $shareMore.parent(); //父标签
            var $as = $shareMore.prevAll('a:lt(2)');
            var $b = $shareMore.children();

            if (isOpen){ //去关闭
                $parent.css('width', '155');
                $as.hide();
                $b.removeClass('backword');
                isOpen = false;
            } else { //去打开
                $parent.css('width', '200');
                $as.show();
                $b.removeClass('backword');
                isOpen = true;
            }

        })
    }

    /*
     * 3.输入搜索关键字，列表显示匹配的结果
     * */
    function search(){
        // focus 和 keyup时间，事件的内容是一致的，使用 on 可以同时监控两个事件，用空格隔开
        $('#txtSearch').on('focus keyup', function(){
            //如果输入框中有文本才显示列表
            var txt = this.value.trim(); //获取去除两边空格之后的文本框中的文本
            if(txt){
                $('#search_helper').show();
            }
        }).blur(function(){
            //隐藏列表
            $('#search_helper').hide();
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
});