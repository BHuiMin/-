/**
 * Created by itcast on 2017/9/29.
 */
(function (window) {
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