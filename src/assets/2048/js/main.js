var board = new Array();//存放数据的即4*4的格子里的数据，此时它是一维数组
var score = 0;//存放游戏分数

$(document).ready(function(){
	newgame();
})// jia  zai

function newgame(){
	// 1.初始化棋盘格子
	init();
	// 2.在随机两个格子生成数字,生成数字的函数调用两次
	generaOneNumber();
	generaOneNumber();
}//newgame结束符


// 初始化棋盘格子
function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);//获取每个小格子节点
			// 设置每个小格子的位置
			gridCell.css("top",getPosTop(i,j));//上边的距离getPosTop(i,j)是函数定义在support.js内
			gridCell.css("left",getPosLeft(i,j));//左边的距离
		}
	}

	// 把board设为二维数组
	for (var i = 0; i < 4; i++){
		board[i] = new Array();//board成为二维数组
		// 初始化每个board的值
		for(var j = 0; j < 4; j++){
			board[i][j] = 0;
		}
	}

	updateBoardView();//调用函数，通知前端

	score = 0; //分数赋值为0

}// init 结束符



// 函数功能：根据board变量的值，对页面.number-cell的元素进行操作，
// .number-cell的元素在页面中没有，需要jQuery动态生成
// board值的每次变化都需要调用一次函数
function updateBoardView(){
	$(".number-cell").remove();//删掉已有的.number-cell元素
	// 根据当前的board值来生成.number-cell元素
	for(var i=0 ;i<4;i++){
		for(var j=0 ;j<4;j++){
			// 在棋盘格中添加.number-cell元素   
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+ i+ '-'+j+'"></div>');
			//问题1  引号的打法
			// '<div class="number-cell" id="number-cell-1-2"></div>'
			// 把1和2变成变量i和j，只需要加'+ i +'  '+ j +'
			// '<div class="number-cell" id="number-cell-'+i+'-'+ j +'"></div>'
			var theNumberCell = $("#number-cell-"+i+"-"+j);//将number-cell元素放到变量中，操作方便，然后去样式表添加样式
			
			if(board[i][j] == 0){//当为0时不显示
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i,j)+50);
				theNumberCell.css("left",getPosLeft(i,j)+50);
			}else{
				theNumberCell.css("width","100px");
				theNumberCell.css("height","100px");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));//每个数字的背景色也不一样 getNumberBackgroundColor()是个函数 定义在support.js内
				theNumberCell.css("color",getNumberColor(board[i][j]));//每个数字的颜色getNumberColor()是个函数定义在support.js内
				theNumberCell.text(board[i][j]);//显示数字的值
			}

		}//内层for 结束
	}//外层 for 结束
}//updateBoardView 结束符



// 函数功能：在随机1个格子内生成数字
function generaOneNumber(){
	// 先判断棋盘格内是否还有空间，有空间就能生成数字
	if(nospace(board)){ //nospace(board)是个函数，放在support.js中
		return false;
	}else{
		// 随机一个位置 并判断这个位置是否有数字了，如果有就找下一个位置，没有就Ok
		var randX = parseInt(Math.floor(Math.random()*4));
		var randY = parseInt(Math.floor(Math.random()*4));
		while(true){
			if(board[randX][randY] == 0){
				break;
			}else{
				randX = parseInt(Math.floor(Math.random()*4));
				randY = parseInt(Math.floor(Math.random()*4));
			}
		}
		// 随机一个数字
		var randNumber = Math.random()<0.5?2:4;
		// 在随机的位置显示随机的数字
		board[randX][randY] = randNumber;//在随机的位置更新这个数
		// 显示到页面需要一个动画效果，定义一个动画函数在此处调用,定义在move.js中
		showNumberWithAnimation(randX,randY,randNumber);
		return true;
	}
}//generaOneNumber结束符

// 游戏逻辑：基于用户的操作，进行响应
$(document).keydown(function(event){

	switch(event.keyCode){
		case 37:   //left
		if(moveLeft()){
			setTimeout(generaOneNumber,210);
			setTimeout(isgameover,300);
		}	
		break;

		case 38:   //top
		if(moveTop()){
			setTimeout(generaOneNumber,210);
			setTimeout(isgameover,300);
		}
		break;

		case 39:   //right
		if(moveRight()){
			setTimeout(generaOneNumber,210);
			setTimeout(isgameover,300);
		}
		break;

		case 40:   //down
		if(moveDown()){
			setTimeout(generaOneNumber,210);
			setTimeout(isgameover,300);
		}
		break;
		default:   
		break;
	}
})

// 向左移动函数
function moveLeft(){
	if(!canMoveLeft(board)){ //canMoveLeft(board)是个函数，放在support.js中
		return false;
	}

	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j] != 0){
				for(var k=0;k<j;k++){
					// 落脚的位置没有数字，并且移动的路上没有阻隔
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						// 移动
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)){
						// 移动
						showMoveAnimation(i,j,i,k);
						//叠加 做加法运算
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						upDateScore(score);
						continue;
					}
				}
			}
		}
	}

	// updateBoardView();//此时没有动画效果，因为for循环执行的速度快，动画来不及执行
	// setTimeout('updateBoardView()',200);//此时加函数名加了括号，就要加引号，作为一个函数块
	setTimeout(updateBoardView,200);//直接调用函数名时不加括号，表示调用一个函数
	// 定时器的时间和动画的时间要设置成一样的，否则会来回跑
	return true;	
}


// 向右移动函数
function moveRight(){
	if(!canMoveRight(board)){ //canMoveRight(board)是个函数，放在support.js中
		return false;
	}

	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){ //和左边不同，修改边界
			if(board[i][j] != 0){
				for(var k = 3 ; k > j ; k -- ){  //和左边不同，修改边界
					// 落脚的位置没有数字，并且移动的路上没有阻隔
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						// 移动
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)){
						// 移动
						showMoveAnimation(i,j,i,k);
						//叠加 做加法运算
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						upDateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView,200);
	
	return true;	
}

// 向上移动函数
function moveTop(){
	if(!canMoveTop(board)){ //canMoveTop(board)是个函数，放在support.js中
		return false;
	}

	for( var j = 0 ; j < 4 ; j ++ ){
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockTop( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockTop( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        upDateScore( score );
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


// 向下移动函数
function moveDown(){
	if(!canMoveDown(board)){ //canMoveTop(board)是个函数，放在support.js中
		return false;
	}
	//moveDown
    for( var j = 0 ; j < 4 ; j ++ ){
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockTop( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockTop( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        upDateScore( score );
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


// 游戏结束函数
function isgameover(){
	if(nospace(board) && nomove(board)){   //没有空间且都不能移动了才能结束游戏
		gameOver();
	}
}


function gameOver(){
	alert("游戏结束，大侠请重新来过");
}