// 在随机的位置显示随机的数字动画效果
function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $("#number-cell-"+i+"-"+j);//将number-cell元素放到变量中，操作方便
	numberCell.css("background-color",getNumberBackgroundColor(randNumber));//每个数字的背景色也不一样 getNumberBackgroundColor()是个函数 定义在support.js内
	numberCell.css("color",getNumberColor(randNumber));//每个数字的颜色getNumberColor()是个函数定义在support.js内
	numberCell.text(randNumber);//显示数字的值

	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}


// 移动数字的函数
function showMoveAnimation(fromX,fromY,toX,toY){
	$("#number-cell-"+fromX+"-"+fromY).animate({
		top:getPosTop(toX,toY),
		left:getPosLeft(toX,toY)
	},200);
}