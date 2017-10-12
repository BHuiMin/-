/**
 * Created by itcast on 2017/9/29.
 */
(function (window) {
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