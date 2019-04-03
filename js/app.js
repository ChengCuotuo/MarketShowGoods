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
    hoverMiniCart();
    clickProductTabs();
    moveMiniImg ();
    hoverMiniImg ();
    bigImg ();

    /*
    * 11.放大镜，当鼠标在中图上移动时，显示对应大图的镀金部分区域
    * */
    function bigImg () {
        var $mediumImg = $('#mediumImg');
        var $mask = $('#mask'); //小黄快遮罩
        var $maskTop = $('#maskTop');
        var $largeImgContainer = $('#largeImgContainer');
        var $loading = $('#loading');
        var $largeImg = $('#largeImg');
        var maskWidth = $mask.width();
        var maskHeight = $mask.height();
        var maskTopWidth = $maskTop.width();
        var maskTopHeight = $maskTop.height();

        $maskTop.hover(function(){
            //显示
            $mask.show();
            //动态加载对应的大图
            var src = $mediumImg.attr('src').replace('-m.jpg', '-l.jpg');
            $largeImg.attr('src', src);
            $largeImgContainer.show();
            //图片加载完成的时间监听
            $largeImg.on('load', function(){
                //得到大图的尺寸
                var largeWidth = $largeImg.width();
                var largeHeight = $largeImg.height();
                //给大图容器设置尺寸，也就是显示最多的是大图尺寸的四分之一
                $largeImgContainer.css({
                    width : largeWidth / 2,
                    height : largeHeight / 2
                });
                //显示大图
                $largeImg.show();
                //隐藏加载进度条
                $loading.hide();
                //console.log($largeImg.width(), $largeImg.height());
                //绑定鼠标移动 mousemove监听
                $maskTop.mousemove(function(event){  //需要获取 event 的坐标
                    /*
                    * 1.移动小黄快
                    * 2.移动大图
                    * */
                    /*
                    * 1.移动小黄快
                    * */
                    //计算小黄快的 left 和 top 值
                    var left = 0;
                    var top = 0;
                    //事件坐标
                    var eventLeft = event.offsetX;
                    var eventTop = event.offsetY;
                    left = eventLeft - maskWidth/2;
                    top = eventTop - maskHeight/2;

                    //left在[0, maskTopWidth-maskWidth]
                    if (left < 0){
                        left = 0;
                    } else if (left > maskTopWidth - maskWidth) {
                        left = maskTopWidth - maskWidth;
                    }
                    //top在[0, maskTopHeight-maskHeight]
                    if (top < 0){
                        top = 0;
                    } else if (top > maskTopHeight-maskHeight) {
                        top = maskTopHeight-maskHeight;
                    }
                    //给mask重新定位
                    $mask.css({
                        left : left,
                        top : top
                    });
                    /*
                    * 2.移动大图
                    * */

                    //得到大图的坐标
                    left = -left * largeWidth / maskTopWidth;
                    top = -top * largeHeight / maskTopHeight;
                    //设置大图的坐标
                    $largeImg.css({
                        left : left,
                        top : top
                    })

                });
            });
        }, function(){
            $mask.hide();
            //$largeImg.hide();
            $largeImgContainer.hide();
        })
    }

    /*
    *10.当鼠标悬停再某个小图标上，再上方显示对应的中图
    * */
    function hoverMiniImg () {
        $('#icon_list>li').hover(function(){
            //this.children()[0].className = 'hoveredThumb';
            var $img = $(this).children();
            $img.addClass('hoveredThumb');
            //显示对应的中图
            var src = $img.attr('src').replace('.jpg', '-m.jpg');
            $('#mediumImg').attr('src', src);
        }, function(){
            $(this).children().removeClass('hoveredThumb');
        })
    }

    /*
    * 9.点击向右/左，移动当前展示商品的小图片
    * */
    function moveMiniImg () {
        var $as = $('#preview>h1>a');
        var $backward = $as.first();
        var $forward = $as.last();
        var $Ul = $('#icon_list');
        var SHOW_COUNT = 5;
        var imgCount = $Ul.children('li').length;
        var moveCount = 0;//移动的次数(向右为正, 向左为负)
        var liWidth = $Ul.children(':first').width();

        // 初始化更新
        if(imgCount>SHOW_COUNT) {
            // $forward[0].className = 'forward'
            $forward.attr('class', 'forward')
        }


        // 给向右的按钮绑定点击监听
        $forward.click(function () {
            // 判断是否需要移动, 如果不需要直接结束
            if(moveCount===imgCount-SHOW_COUNT) {
                return
            }
            moveCount++;
            //更新向左的按钮
            $backward.attr('class', 'backward');
            // 更新向右的按钮
            if(moveCount===imgCount-SHOW_COUNT) {
                $forward.attr('class', 'forward_disabled')
            }
            // 移动ul
            $Ul.css({
                left: -moveCount * liWidth
            })
        });

        // 给向左的按钮绑定点击监听
        $backward.click(function () {
            // 判断是否需要移动, 如果不需要直接结束
            if(moveCount===0) {
                return
            }
            moveCount--;
            //更新向右的按钮
            $forward.attr('class', 'forward');
            // 更新向左的按钮
            if(moveCount===0) {
                $backward.attr('class', 'backward_disabled')
            }
            // 移动ul
            $Ul.css({
                left: -moveCount * liWidth
            })
        })

    }

    /*
    * 8.点击切换产品选项（商品的详情显示出来）
    * */
    function clickProductTabs () {
        var $lis = $('#product_detail>ul>li');
        var $contents = $('#product_detail>div:gt(0)');
        $lis.click(function(){
            $lis.removeClass('current');
            this.className = 'current';
            //隐藏所有的 $contents
            $contents.hide();
            //显示当前对应的content
            var index = $(this).index();
            $contents.eq(index).show();
            //$contents[index].style.display='block';
            //get(index)获取的是一个 DOM 元素，eq(index)筛选得到一个 jQuery 对象
            //$contents.get(index).style.display='block';
        })
    }

    /*
    * 7.鼠标移入移除显示迷你购物车
    * */
    function hoverMiniCart () {
        $('#minicart').hover(function(){
            this.className = 'minicart';
            $(this).children(':last').show();
        }, function(){
            this.className = '';
            $(this).children(':last').hide();
        })
    }

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
    function share () {
        var isOpen = false //标识当前的状态(初始为关闭)
        var $shareMore = $('#shareMore');
        var $parent = $shareMore.parent()
        var $as = $shareMore.prevAll('a:lt(2)');
        var $b = $shareMore.children();

        $shareMore.click(function () {

            if(isOpen) { // 去关闭
                isOpen = false;
                $parent.css('width', 155);
                $as.hide();
                $b.removeClass('backword')
            } else { // 去打开
                isOpen = true;
                $parent.css('width', 200);
                $as.show();
                $b.addClass('backword');
            }

            // isOpen = !isOpen
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