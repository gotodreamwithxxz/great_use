/**
 * web缓存分为很多种，比如数据库缓存、代理服务器缓存、CDN缓存，浏览器缓存。
 * 一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷
 * 
 * Web 缓存大家都会觉得很简单，不就是检查资源是否有缓存，如果有就加以利用。如果追究下去，多数人还能扯出 cache-control, 
 * expires, last-modified, etag 之类的名词.
 * 缓存不是浏览器本身能够完成的事情，因为在没有服务器端的其他信息的情况下浏览器是无法判断一个资源是否过期的
 * 
 * 针对缓存的控制需要浏览器和服务器端协同完成，所以他们需要一个传递的信息的方式，事实上目前的 Web 缓存主要通过 Headers 来传递信息
 *      1.cache-control:（http1.1）最简单的缓存控制策略，即浏览器通过最大生存时间来判断资源的缓存是否有效(cache-control: max-age=93312000)
 *      2.expires:指定的时间之前浏览器都可以认为缓存是有效的.
 *      PS -> 当两个字段同时存在时，expires 会被 cache-control 覆盖。服务器告诉浏览器缓存仍然有效的方法，那便是 304 Not Modified
 *      3.ETag（http1.1实体标签） 来判断缓存是否有效,服务器端会在 response headers 中返回 ETag（文件的 hash）
 *        If-None-Match:当资源改变时 ETag 也会发生改变。浏览器在发起请求时在 If-None-Match字段携带缓存的 ETag：
 *          服务器接到请求后如果一致（即资源没有修改），则返回 304 Not Modified，否则返回新的资源（200）。
 *      4.Last-Modified/If-Modified-Since:可以通过上次修改时间，服务器端返回资源时通过 Last-Modified 携带资源修改时间，
 *          浏览器通过 If-Modified-Since 携带缓存中的资源的修改时间。
 *          缺点：它是精确到秒的，如果一秒中资源多次服务器不会感知到缓存失效，但这不是一个常见的需求。
 *      
 *  到底使用哪个比较好，还是相辅相成？？？（配置ETag或者移除ETag）
 *      不推荐使用 ETag，原因有几点
 *          Last-Modified 的缺点基本可以忽略不计
 *          ETag 本身需要消耗 CPU，而它的优先级比 Last-Modified 高，当它存在时服务器无论 Last-Modified 是否存在都会使用它判断，
 *          ETag 在分布式系统中生成的值可能不一样，会导致缓存失效
 *      Etag 主要为了解决 Last-Modified 无法解决的一些问题：
 *      1、一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；
 *      2、某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
 *      3、某些服务器不能精确的得到文件的最后修改时间。
 * 
 *       
 */