/**
 * Created by itcast on 2017/9/29.
 */
//-------------------关于食物begin-----------------------------------------------------------------
;(function (window) {
  //食物，有x、y坐标，还有width、height宽高，还有颜色，所以我们说食物就应该是一个对象。
  //每个食物都要显示在地图。 所以把食物显示在地图上的这个方法，写在原型里

  //0.声明一个数组，用来保存显示食物的那个div
  var list = [];

  //1.构造函数来创建食物
  function Food(x,y,width,height,color){
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 20;
    this.height = height || 20;
    this.color = color || "green";
  }

  //2.在原型中添加显示食物的方法。
  Food.prototype.render = function (map) {
    //显示新位置食物之前，把老位置的食物给删掉
    remove();

    //随机产生食物的坐标
    this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
    this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
    //console.log(this.x);
    //如何把这个食物显示在这个地图上？ 可以创建一个div，让这个div拥有这个食物的所有显示信息，
    var div1 = document.createElement("div");
    div1.style.position = "absolute";
    div1.style.left = this.x + "px";
    div1.style.top = this.y + "px";
    div1.style.width = this.width + "px";
    div1.style.height = this.height + "px";
    div1.style.backgroundColor = this.color ;
    //让这个div装进这个地图中。
    map.appendChild(div1);

    //把这个div装进数组中
    list.push(div1);
  }

  //4.移出食物的方法
  function remove(){
    for(var i = list.length-1; i >= 0; i--){
      list[i].parentNode.removeChild(list[i]);
      list.pop();
    }
  }



  //3.把构造函数暴露出去
  window.Food = Food;

}(window));
//-------------------关于食物end-----------------------------------------------------------------
;(function (window) {
  //蛇，也有坐标，也有宽高，也有颜色，所以蛇也应该是一个对象。 用构造函数创建蛇对象。
  //蛇要显示在地图上， 蛇显示的方法也应该是写在原型中

  //0.声明一个数组，用来保存显示蛇的那些个div
  var list = [];

  var colorArr = ["skyblue","yellowgreen","greenyellow","purple","yellow","orange","hotpink","pink"];


  //1.构造函数
  function Snake(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction  || "right";
    //蛇，蛇一开始是由三节组成的。
    this.body = [
      {x:3,y:1,color:"red"},
      {x:2,y:1,color:"pink"},
      {x:1,y:1,color:"skyblue"}
    ];
  }


  //4.让蛇动起来
  Snake.prototype.move = function (food,map) {
    //每一个蛇身体都要动
    var i  = this.body.length - 1; //这个i就是蛇身体最后一个的下标
    for(;i > 0;i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }

    //蛇头也要移动-蛇头根据方向移动
    switch (this.direction){
      case "left":
        this.body[0].x--;
        break;
      case "right":
        this.body[0].x++;
        break;
      case "top":
        this.body[0].y--;
        break;
      case "bottom":
        this.body[0].y++;
        break;
    }

    //判断蛇有没有吃到食物- 就是看蛇头的坐标和食物的坐标是否重合。
    var foodX = food.x;
    var foodY = food.y;
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    if(foodX == headX && foodY == headY){
      //表示吃到了食物-吃到了食物就要长一节身体。
      var obj = this.body[this.body.length-1];
      this.body.push({
        x:obj.x,
        y:obj.y,
        color:colorArr[Math.floor(Math.random()*8)]
      });
      //吃了食物，就应该有新的食物生成。
      food.render(map); //实际上就是让这个食物对象，在一个新的位置显示。
    }
  }




  //2.在蛇的原型中添加一个在地图上显示的方法
  Snake.prototype.render = function (map) {
    //显示新位置上的蛇之前，把老位置上的蛇给删掉。
    remove();

    //蛇是由很多个节组成的，每一节都要显示在地图上。所以我们要找到这每一节。
    for(var i = 0 ; i < this.body.length; i++){
      var unit = this.body[i]; //这里的unit就是蛇的每一节。
      //每一节对应一个div，让这个div拥有这每一节的显示信息，
      var div1 = document.createElement("div");
      div1.style.position = "absolute";
      div1.style.left = unit.x * this.width + "px";
      div1.style.top = unit.y * this.height + "px";
      div1.style.width = this.width + "px";
      div1.style.height = this.height + "px";
      div1.style.backgroundColor = unit.color;
      //然后把这个div添加到地图map中。
      map.appendChild(div1);
      //把这个div装进数组list中
      list.push(div1);
    }
  }

  //5.删除蛇的方法-私有方法
  function remove(){
    //遍历出蛇的每一节，让每一节的父亲map把他给移除掉。
    for(var i = list.length-1; i >=0 ; i--){
      list[i].parentNode.removeChild(list[i]);
      list.pop();
    }
  }


  //3.把构造函数给暴露出去
  window.Snake = Snake;
}(window));
//------------------------------------------------------------------------------------

;(function (window) {
  //所有的关于游戏逻辑的代码都写在个对象里
  //游戏对象里面有什么？ 食物、蛇、地图、让游戏开始的方法

  //0.先声明一个变量that，用来保存用构造函数创建出来的那个game对象
  var that = null;

  //1.构造函数
  function Game(map){
    this.food = new Food();
    this.snake = new Snake();
    this.map  = map;
    that = this;
  }

  //2.游戏开始的方法。
  Game.prototype.start = function () {
    //a.让蛇和食物都显示出来
    this.food.render(this.map);
    this.snake.render(this.map);

    //b.让蛇移动
    //this.snake.move();
    //this.snake.render(this.map); //蛇移动后产生了新的坐标，要让蛇根据新的坐标重新显示。
    runSnake();

    //c.让蛇根据键盘按键来移动
    bindKey();
  }

  //让蛇根据键盘按键来移动
  function bindKey(){
    document.addEventListener("keydown", function (e) {
      e = e || window.event;
      //console.log(e.keyCode);
      switch (e.keyCode){
        case 37:
          this.snake.direction = "left";
          break;
        case 38:
          this.snake.direction = "top";
          break;
        case 39:
          this.snake.direction = "right";
          break;
        case 40:
          this.snake.direction = "bottom";
          break;
      }
    }.bind(that),false);
  }




  //4.蛇自动移动起来 - 私有方法
  function runSnake(){
    //用计时器一直调用蛇的move方法。
    var timerID = setInterval(function () {
      //console.log(this); // window ,window中肯定没有蛇。
      //console.log(this.snake); //undefined， 为什么这里输出的是undefined。
      //this.snake.move(); //报错 ，说move前面是undefined。
      //this.snake.render(this.map);


      //调用这个方法要改变这个this，让这个this从window指向那个Game对象。
      this.snake.move(this.food,this.map);
      this.snake.render(this.map);


      //判断蛇有没有撞到墙-判断蛇头的坐标有没有撞到墙
      var headX = this.snake.body[0].x * this.snake.width;
      var headY = this.snake.body[0].y * this.snake.height;
      if(headX >= this.map.offsetWidth || headY >= this.map.offsetHeight){
        alert("Game Over!");
        clearInterval(timerID);
      }
      if(headX < 0  || headY < 0){
        alert("Game Over!");
        clearInterval(timerID);
      }
    }.bind(that),200);
  }



  //3.把创建游戏对象的构造函数Game给暴露出去
  window.Game = Game;
}(window));