/**
 * 1.POST请求大小限制
 *      理论上讲，POST是没有大小限制的。HTTP协议规范也没有进行大小限制，起限制作用的是服务器的处理程序的处理能力
 *      Get方法提交的数据大小长度并没有限制，HTTP协议规范没有对URL长度进行限制。这个限制是特定的浏览器及服务器对它的限制（讲2k）
 * 2.post请求在浏览器的具体实现
 *      大多浏览器对于POST采用两阶段发送数据的，先发送请求头，再发送请求体
 * 3.GET和POST的区别？
 *      （1）多数浏览器对于POST采用两阶段发送数据的，先发送请求头，再发送请求体，即使参数再少再短，也会被分成两个步骤来发送（相对于GET），
 *          也就是浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据)
 *      （2）GET请求能够被cache，GET请求能够被保存在浏览器的浏览历史里面（密码等重要数据GET提交，查看历史记录，可以看到这些私密数据）POST不进行缓存。
 *      （3）GET参数是带在URL后面，传统IE中URL的最大可用长度为2048字符，其他浏览器对URL长度限制实现上有所不同。
 *          POST请求无长度限制（目前理论上是这样的），起限制作用的是服务器的处理程序的处理能力。
 *      （4）GET提交的数据大小，不同浏览器的限制不同，一般在2k-8K之间，POST提交数据比较大，大小靠服务器的设定值限制，
 *          而且某些数据只能用 POST 方法「携带」，比如 file。
 *      （5）把请求按功能和场景分下类，对数据请求频繁，数据不敏感且数据量在普通浏览器最小限定的2k范围内，这样的情况使用GET。其他地方使用POST。
 *      （6）GET 的本质是「得」，而 POST 的本质是「给」。而且，GET 是「幂等」的，在这一点上，GET 被认为是「安全的」。
 *          但实际上 server 端也可以用作资源更新，但是这种用法违反了约定，容易造成 CSRF（跨站请求伪造）
 *      
 * 4.post请求异步实现参数
 *      ajax中open方法第三参数open(methods,url,boolean)
 * 
 * 
 */