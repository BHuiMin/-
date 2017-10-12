/**
 * Created by itcast on 2017/9/29.
 */
(function (window) {
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