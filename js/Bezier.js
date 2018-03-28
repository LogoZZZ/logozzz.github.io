//三次曲线
var Bezier=function(x0,y0,x1,y1,x2,y2,x3,y3){
    this.x0=x0;
    this.y0=y0;
    this.bx0=3.0 * x0; //3x0
    this.by0=3.0 * y0; //3y0
    this.bx1=3.0 * x1; //3x1
    this.by1=3.0 * y1; //3y1
    this.bx2=3.0 * x2; //3x2
    this.by2=3.0 * y2; //3y2
    this.x3=x3;
    this.y3=y3;
    //以上是公式中除t以外的数据 公式：(3x1-3x2+x3-x0)t^3+(3x0-6x1+3x2)t^2+(3x1-3x0)t+x0
    this.btx1=this.bx1 - this.bx2 + this.x3 - this.x0;  //公式(3x1-3x2+x3-x0)的部分
    this.btx2=this.bx0 - (2*this.bx1) + this.bx2;  //公式(3x0-6x1+3x2)的部分
    this.btx3=this.bx1-this.bx0;  //公式(3x1-3x0)的部分
    //以下是将以上x变为y的部分
    this.bty1=this.by1 - this.by2 + this.y3 - this.y0;  //公式(3y1-3y2+y3-y0)的部分
    this.bty2=this.by0 - (2*this.by1) + this.by2;  //公式(3y0-6y1+3y2)的部分
    this.bty3=this.by1-this.by0;  //公式(3y1-3y0)的部分
}
Bezier.prototype={
    getY:function(t){
        this.t3=t*t*t;
        this.t2=t*t;
        return (this.bty1*this.t3 + this.bty2*this.t2 + this.bty3*t + this.y0) 
    },//获取对应时间y的值
    getX:function(t){
        this.t3=t*t*t;
        this.t2=t*t;
        return (this.btx1*this.t3 + this.btx2*this.t2 + this.btx3*t + this.x0)
    },//获取对应时间x的值
    so:function(t){
        return this.getY(this.getX(t));
    }//获取对应x值时y的值
}
