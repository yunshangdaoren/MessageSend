$(".modu-head").click(function(){
	$(this).next().toggle(420);
	//获取到点击菜单的所有同胞菜单
	var siblings = $(this).parent().siblings();
	//遍历所有同胞菜单
	siblings.each(function(){
		//将每个同胞菜单的子菜单隐藏
		$(this).children().last().hide();
	})
});
