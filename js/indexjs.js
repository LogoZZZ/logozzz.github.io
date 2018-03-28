(function () {
    var _header=document.getElementById('header');
    var _barTop=document.getElementById('bar-top');
    var _barCentre=document.getElementById('bar-centre');
    var _ddCheight=document.documentElement.clientHeight;//可视窗高度
    var _bodyer=document.getElementById('bodyer');
    var _bodyerHeight=_bodyer.scrollHeight;//主体总高度
    var _body0=document.getElementsByTagName('body')[0];
    var _state=false;
    var _clentY=0;
    var _bodyerHide=_bodyerHeight-_ddCheight;//隐藏的高度
    var _barTopHeight=_bodyerHide/_bodyerHeight*_ddCheight;//隐藏高度所占百分比
    var _timer1=null;
    var _transYstart=0,_transYend=0,_tranZ;
    // var _bz=new Bezier(0,0);
    _barCentre.style.height=(_ddCheight/_bodyerHeight)*_ddCheight+'px';
    function _centreHeight() {
        _ddCheight=document.documentElement.clientHeight;
        _barCentre.style.height=(_ddCheight/_bodyerHeight)*_ddCheight+'px';
        _bodyerHide=_bodyerHeight-_ddCheight;
        _barTopHeight=_bodyerHide/_bodyerHeight*_ddCheight;
    }//计算bar—contre的height值

    function _transformVule(rel) {
        _bodyer.style['transform']='translateY('+rel+'px)';
        _bodyer.style['-ms-transform']='translateY('+rel+'px)';
        _bodyer.style['-moz-transform']='translateY('+rel+'px)';
        _bodyer.style['-webkit-transform']='translateY('+rel+'px)';
        _bodyer.style['-o-transform']='translateY('+rel+'px)';
    }//赋值
    var _ht=0,_wt;
    function _mouseMove(rel) {
        _wt=_ddCheight-parseInt(_barCentre.style.height);
        _ht=_ht-rel;
        if(_ht<=0){
            _ht=0;rel=0;
            _transYend=0;
        }else if(_ht>_wt){
            _ht=_wt;rel=0;
            _transYend=_bodyerHeight/_ddCheight*-_ht;
        }
        _barTop.style.height=_ht+'px';
        _transYend=_transYend+(_bodyerHeight/_ddCheight)*rel;

    }
    function _topReH() {
        _ht=_ddCheight/_bodyerHeight*-_transYend;
        _barTop.style.height=_ht+'px';
        _transYend=_bodyerHeight/_ddCheight*-_ht;
        _animation();
    }
    function _animation() {
        var __i=0;
        _timer1=setInterval(function () {
            __i+=10;
            _tranZ=_transYend-_transYstart;
            _transYstart=_transYstart+_tranZ/15;
            _transformVule(_transYstart);
            if(__i==1000){
                _transformVule(_transYend);
                clearInterval(_timer1);
            }
        },5)
    }
    window.addEventListener('resize',function () {
        _centreHeight();
        _topReH();
    });
    _barCentre.addEventListener('mousedown',function (e) {
        _state=true;
        _clentY=e.clientY;
        if(navigator.userAgent.indexOf('MSIE')>0){
            _body0.onselectstart='return false;';
        }else{
            _body0.classList.add('noselect');
        }
    });
    window.addEventListener('mouseup',function () {
        _state=false;
        if(navigator.userAgent.indexOf('MSIE')>0){
            _body0.onselectstart='';
        }else{
            _body0.classList.remove('noselect');
        }
    });
    window.addEventListener('mousemove',function (e) {
        //判断回到顶部按钮何时显示
        clearInterval(_timer1);
        var e=e||window.event;
        if(_state){
            _showBtn();
            _mouseMove(_clentY-e.clientY);
            _clentY=e.clientY;
        }
        _animation();
    });
    if (navigator.userAgent.indexOf("Firefox") < 0) {
        window.addEventListener("mousewheel", function (e) {
            clearInterval(_timer1);
            _mouseMove(e.wheelDelta/10);
            _animation();
            _showBtn();
        });
    } else {
        window.addEventListener("DOMMouseScroll", function (e) {
            _showBtn();
            clearInterval(_timer1);
            _mouseMove(-e.detail*4);
            _animation();
        });
    }
    //以上是滚动条的故事
    //以下是回到顶部按钮的故事
    var _timer2=null;
    var _btn=document.getElementById('btn');
    if(_transYend<-_ddCheight){
        _btn.style.display='block';
    }else{
        _btn.style.display='none';
    }
    function _showBtn() {
        if(_transYend==0){
            _header.classList.remove('headerbuttom');
        }else{
            _header.classList.add('headerbuttom');
        }
        if(_transYend<-_ddCheight){
            _btn.style.display='block';
        }else{
            _btn.style.display='none';
        }
    }
function _run() {
        var __i=0;
    _timer2=setInterval(function () {
        __i+=10;
        _transYend=_transYend-_transYend/20;
        _tranZ=_transYend-_transYstart;
        _transYstart=_transYstart+_tranZ/15;
        _transformVule(_transYstart);
        _ht=_ddCheight/_bodyerHeight*-_transYend;
        _barTop.style.height=_ht+'px';
        if(__i==1500){
            _ht=0;
            _barTop.style.height=_ht+'px';
            _transYend=0;_transYstart=0;
            _transformVule(_transYend);
            _showBtn();
            clearInterval(_timer2);
        }
    },10)
}
    _btn.addEventListener('click',function () {
        clearInterval(_timer2);
        _run();
    });

//以下是页尾的数据
    var _messageData={
        fanyang:"墨刀帮助我们团队更加简单高效地进行产品迭代，并且很好地满足了我们移动办公的需求。",
        maqiao:"不用工程师写一行代码，就可以得到一个完整的交互 demo，并且可以在电脑、手机、甚至微信里查看，实在是太方便了。",
        zhubo:"它能帮助我更好地与设计团队的其他人沟通协作，解决素材存储、图片传输、软件版本不兼容等问题。",
        adelaide:"墨刀的评论功能给了用户一个便捷的反馈渠道，让我们能更好地收集用户反馈，协助产品决策。",
        wumian:"它用一种任何人都能看懂的方式展示产品的功能模块、页面流程，大家都可以对 demo 提出修改意见，等修改完成之后才会进入开发，大大减少了产品返工的情况。",
        jason:"墨刀开发者模式中可以完整地展示设计稿标注信息，方便进行开发。"
    };//message-p的数据
    var _messageP=document.getElementById('message-p');
    var _quoteList=document.getElementById('quote-list');
    var _quoteListUl=document.getElementById('quote-list-ul');
    var _messageSpan=document.getElementById('message-span');
    //绑定ddom
    _quoteListUl.getElementsByTagName('li')[0].classList.add('active');
    //初始化默认样式
    function _datafun(rel) {
        _messageP.innerHTML=_messageData[rel];
    }//改变massage-p的值
    _quoteList.addEventListener('click',function (e) {
        e=e||window.event;
        if(e.target.nodeName=='BUTTON'){
            for(var __i=0;__i<_quoteListUl.getElementsByTagName('li').length;__i++){
                _quoteListUl.getElementsByTagName('li')[__i].classList.remove('active');
            }
            e.target.parentNode.classList.add('active');
            switch (e.target.className){
                case "fanyang":_datafun('fanyang');_messageSpan.style.left='42px';break;
                case "maqiao":_datafun('maqiao');_messageSpan.style.left='162px';break;
                case "zhubo":_datafun('zhubo');_messageSpan.style.left='285px';break;
                case "adelaide":_datafun('adelaide');_messageSpan.style.left='410px';break;
                case "wumian":_datafun('wumian');_messageSpan.style.left='530px';break;
                case "jason":_datafun('jason');_messageSpan.style.left='650px';break;
            }
        }
    })
    //通过事件委派完成功能实现
}());