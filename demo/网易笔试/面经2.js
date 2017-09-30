/*
1.Array的一些API
    移除一个元素，pop(),shift(),splice(index,num);

2.closure闭包
    function F1(){
        var a = 100;    //父级作用域
        return function(){    //匿名函数
            console.log(a);
        }
    }

3.Array-like Object类数组
    arguments、
    HTMLCollection、---- document.images //所有img元素  document.links
    NodeList、childNodes 、getElementsByClassName(className) 、getElementsByTagName(tagName)
    NamedNodeMap、element.attributes

4.本地JavaScript读写cookie
    //JS操作cookies方法! 
    //写cookies 
    function setCookie(name,value) 
    { 
        var Days = 30; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    } 
    //读取cookies 
    function getCookie(name) 
    { 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]); 
        else 
            return null; 
    } 
    //删除cookies 
    function delCookie(name) 
    { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    } 

5.xss与csrf
    比较一下CSRF和XSS的区别，发现XSS的目的是获取用户的身份信息，攻击者窃取到的是用户的身份（session/cookie），而CSRF则是利用用户当前的身份去做一些未经过授权的操作，
    比如，用你的名义完成网银转账，发送诈骗短信给你的好友等。可以看成CSRF是攻击者的目的，而要达到这个目的，可以有多种路径，而XSS就是其中一种。
    （1）XSS攻击
        跨站脚本攻击XSS，英文全称Cross Site Scripting，很明显，按理说应该简写为CSS嘛，不过你也知道CSS广为人知的含义是层叠样式表，所以啊，为避免混淆，就被简写为了XSS.
    OWASP（一个组织）给出的XSS漏洞定义如下：
        “一名攻击者可以利用XSS漏洞向不知情的用户发送恶意脚本。终端用户的浏览器无法确定这些脚本是否可信任，并且会自动运行这些恶意脚本。
        因为它会认为这个脚本来自一个可信任的源，而恶意脚本将访问浏览器中保存的cookie、会话token或其他的敏感信息，并利用这些信息来完成其他的恶意目的，
        而有些脚本甚至还可以修改页面的HTML代码。”
    攻击的入手处往往是网站中涉及到站内交互的地方，比如说可以发表评论的地方，攻击者可以在要发布的内容中嵌入一些恶意的javascript代码，而这段内容发送给服务器端
    后又没有经过过滤或者转义，之后被作为普通文本内容返回到了用户浏览的页面上，当用户访问这个页面时就会运行这些恶意脚本，从而达到攻击用户的效果。
    预防：1.对内容进行过滤和转义  
        3.cookie的防劫持真正地利用XSS的攻击手段，攻击者可能会获取到用户的cookie信息，继而做其他有攻击性的事情。针对这一点，这边主要讲解下该情况下的防御手段，
        也可以理解成cookie的防劫持手段。
        方法一：给重要的cookie添加HttpOnly属性, 这种属性设置后, cookie只能在http请求中传递, 而在脚本中, document.cookie就无法获取到该cookie值了。
        方法二：在cookie中添加校验信息, 这个校验信息和当前用户外置环境比如ip,user agent等有关. 这样当cookie被人劫持了, 并冒用, 但是在服务器端校验的时候, 
        发现校验值发生了变化, 因此要求重新登录, 这样也是种很好的思路, 去规避cookie劫持.
        方法三：cookie中session id的定时更换, 让session id按一定频率变换
    
    （2）csrf
        1.登录受信任网站A，并在本地生成Cookie 。
        2.在不退出A的情况下，访问危险网站B。
        CSRF攻击的防御方法
        预防CSRF攻击的方式方法有多种，但思想上都是差不多的，主要从以下2个方面入手：
        1．正确使用GET,POST和Cookie
        2．在非GET请求中增加伪随机数token
        3. 验证码
        4. referer


6.HTTP Response Header里面有些啥？
http请求中的常用头（请求头）的含义：
    Accept：告诉服务器，客户端支持的数据类型。
    Accept-Charset：告诉服务器，客户端采用的编码。
    Accept-Encoding：告诉服务器，客户机支持的数据压缩格式。
    Accept-Language：告诉服务器，客户机的语言环境。
    Host：客户机通过这个头告诉服务器，想访问的主机名。
    If-Modified-Since:客户机通过这个头告诉服务器，资源的缓存时间。
    If-None-Match:
    Referer:客户机通过这个头告诉服务器，它是从哪个资源来访问服务器的。（一般用于防盗链）
    User-Agent:客户机通过这个头告诉服务器，客户机的软件环境。
    Cookie：客户机通过这个头告诉服务器，可以向服务器带数据。
    Connection：客户机通过这个头告诉服务器，请求完后是关闭还是保持链接。
    Date：客户机通过这个头告诉服务器，客户机当前请求时间。
    
http请求中常用的响应头的含义：
    Location:这个头配合302状态码使用，告诉用户端找谁。
    Server:服务器通过这个头，告诉浏览器服务器的类型
    Content-Encoding:服务器通过这个头，告诉浏览器数据采用的压缩格式。
    Content-Length:服务器通过这个头，告诉浏览器回送数据的长度。
    Content-Language：服务器通过这个头，告诉服务器的语言环境。
    Content-Type:服务器通过这个头，回送数据的类型
    Last-Modified:服务器通过这个头，告诉浏览器当前资源的缓存时间。
    Refresh:服务器通过这个头，告诉浏览器隔多长时间刷新一次。
    Content-Disposition:服务器通过这个头，告诉浏览器以下载的方式打开数据。
    Transfer-Encoding:服务器通过这个头，告诉浏览器数据的传送格式。
    ETag:与缓存相关的头。
    Expires:服务器通过这个头，告诉浏览器把回送的数据缓存多长时间。-1或0不缓存。
    Cache-Control和Pragma：服务器通过这个头，也可以控制浏览器不缓存数据。
    Connection:服务器通过这个头，响应完是保持链接还是关闭链接。
    Date:告诉客户机，返回响应的时间。

7.面向对象的特点
    封装继承多态

8.前端怎么验证用户信息，怎么保存登陆状态？
    http 是无状态协议，所以需要登录的票据来表示两个请求是同一个用户发出的。一般来说，对于浏览器，我们在登录成功后生成一个命名如 session_id 的字符串
    存在 cookie 中，每次请求服务器的时候会在 http header 里面带上。服务器校验并取出用户的 id，以此来识别两个请求是否是同一个用户发出的。
9.对未来2、3年的职业规划
    头两年一定要打好基础，在前端这个方向，深攻下去；高潮之后，往广度发展，掌握其他相关和不相关的配套知识
    然后摸到自己的目标，发售大胆的爱爱（老了，手抖打多了）吧。
    不仅自己爱（前端），也要让更多人一起爱（前端）哦。
8.react virtual DOM
  new operator
  ajax请求整个过程
  webpack重复看下


*/