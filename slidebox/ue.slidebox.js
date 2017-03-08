var ue = window.ue||{};
ue.slideBox = function(options){
	var defaults = {
		target : "",                   	//外层容器
		items : "",						//切换的项
		speed : 500,					//切换速度
		navigation : "",				//导航的项
		delay : 3000,					//切换间隔
		curClass : "active",			//当前项的类
		trigger : "click",				//触发切换的方式
		autoplay : true,				//是否自动播放
		nextbtn : "",
		prevbtn : ""
	};

	var opt = $.extend({},defaults,options);

	var slideNum = $(opt.items).length,
		mainLi = $(opt.items),
		navLi = $(opt.navigation),
		conWidth = $(opt.target).width();

	mainLi.css("left",conWidth);
	mainLi.eq(0).css("left",0);

	function slidePro(){
		var curIndex = $(opt.target).find("."+opt.curClass).index(),
			nextIndex = curIndex+1;
		if(nextIndex == slideNum){
			nextIndex = 0;	
			// $(".main li").eq(curIndex).animate({left:400},1000);
		}
		navLi.eq(curIndex).removeClass(opt.curClass);
		navLi.eq(nextIndex).addClass(opt.curClass);
		mainLi.eq(curIndex).removeClass(opt.curClass).animate({left:-conWidth},opt.speed);
		mainLi.eq(nextIndex).addClass(opt.curClass).css("left",conWidth).animate({left:0},opt.speed);
	}

	function tabSlide(index){
		if(opt.autoplay){
			clearInterval(slide);
		}
		if(index>=slideNum){
			index = 0;
		}
		if(index<0){
			index = slideNum-1;
		}
		var curIndex = $(opt.target).find("."+opt.curClass).index();
		if(index == curIndex){
			return;
		}
		if(index<curIndex){
			mainLi.eq(index).addClass(opt.curClass).css("left",-conWidth).stop().animate({left:0},opt.speed);
			mainLi.eq(curIndex).removeClass(opt.curClass).animate({left:conWidth},opt.speed);
		}else{
			mainLi.eq(index).addClass(opt.curClass).css("left",conWidth).stop().animate({left:0},opt.speed);
			mainLi.eq(curIndex).removeClass(opt.curClass).animate({left:-conWidth},opt.speed);
		}
		
		navLi.eq(curIndex).removeClass(opt.curClass);
		navLi.eq(index).addClass(opt.curClass);
		if(opt.autoplay){
			slide = setInterval(slidePro,3000);
		}
	}

	if(opt.autoplay){
		slide = setInterval(slidePro,opt.delay);
	}
	
	navLi.bind(opt.trigger,function(){
		var nextIndex = $(this).index();
		tabSlide(nextIndex);
	});

	if(opt.nextbtn){
		$(opt.nextbtn).bind("click",function(){
			var curIndex = $(opt.target).find("."+opt.curClass).index()+1;
			tabSlide(curIndex);
		})
	}

	if(opt.prevbtn){
		$(opt.prevbtn).bind("click",function(){
			var curIndex = $(opt.target).find("."+opt.curClass).index()-1;
			tabSlide(curIndex);
		})
	}
	
}