(function () {
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
    var _transY=0;
    var _san=0;
    _barCentre.style.height=(_ddCheight/_bodyerHeight)*_ddCheight+'px';
    function _centreHeight() {
        _ddCheight=document.documentElement.clientHeight;
        _barCentre.style.height=(_ddCheight/_bodyerHeight)*_ddCheight+'px';
        _bodyerHide=_bodyerHeight-_ddCheight;
        _barTopHeight=_bodyerHide/_bodyerHeight*_ddCheight;
    }
    function _moveTo() {
        var __height=_bodyer.scrollTop*_barTopHeight/_bodyerHide;
        _barTop.style.height=__height+'px';
    }
    function _beforeShowTime() {
        _transY=_san-_bodyer.scrollTop;
        _san=_bodyer.scrollTop;
        _on(_transY);
    }
    _beforeShowTime();
    function _on(rel) {
        _bodyer.style['transform']='translate3d(0,'+rel+'px'+',0)';
        _bodyer.style['-ms-transform']='translate3d(0,'+rel+'px'+',0)';
        _bodyer.style['-moz-transform']='translate3d(0,'+rel+'px'+',0)';
        _bodyer.style['-webkit-transform']='translate3d(0,'+rel+'px'+',0)';
        _bodyer.style['-o-transform']='translate3d(0,'+rel+'px'+',0)';
    }
    function _showTime() {
        var __i=0;
        console.log(__i)
        _timer2=setInterval(function () {
            _transY=_transY-_transY/25;
            __i+=10;
            _on(_transY);
            if(__i==1000){
                _transY=0;
                _on(_transY);
                clearInterval(_timer2);
            }
        })
    }
    function _mouseMove(rel) {
        _bodyer.scrollTop=_bodyer.scrollTop+rel;
        _moveTo();
    }
    window.addEventListener('resize',function () {
        _centreHeight();
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
        var e=e||window.event;
        if(_state){
            clearInterval(_timer2);
            _mouseMove((e.clientY-_clentY)*_bodyerHeight/_ddCheight);
            _beforeShowTime();
            _showTime();
            _clentY=e.clientY;
        }
    });
    function _scrollTo(rel) {
        var __i=0;
        _timer1=setInterval(function () {
            __i++;
            _bodyer.scrollTop=_bodyer.scrollTop+rel;
            _moveTo();
            if(__i==40){
                clearInterval(_timer1);
            }
        })
    }//滑轮滚动匀速动画
    if (navigator.userAgent.indexOf("Firefox") < 0) {
        window.addEventListener("mousewheel", function (e) {
            _showBtn();
            clearInterval(_timer1);
            _scrollTo(-e.wheelDelta/40);
        });
    } else {
        window.addEventListener("DOMMouseScroll", function (e) {
            _showBtn();
            clearInterval(_timer1);
            _scrollTo(e.detail*3);
        });
    }//以上是滚动条的故事
    //以下是回到顶部按钮的故事
    var _timer2=null;
    var _btn=document.getElementById('btn');
    if(_bodyer.scrollTop>_ddCheight){
        _btn.style.display='block';
    }else{
        _btn.style.display='none';
    }
    function _showBtn() {
        if(_bodyer.scrollTop>_ddCheight){
            _btn.style.display='block';
        }else{
            _btn.style.display='none';
        }
    }

    function _run() {
        var __i=1000;
        _timer2=setInterval(function () {
            __i-=10;
            _bodyer.scrollTop=_bodyer.scrollTop-_bodyer.scrollTop/20;
            -_showBtn();
            _moveTo();
            if(__i==0){
                clearInterval(_timer2);
            }
        },7)
    }
    _btn.addEventListener('click',function () {
        clearInterval(_timer2);
        _run();
    })

}());