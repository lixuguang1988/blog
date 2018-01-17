# UEditor 初始化默认header随滚动条会fixed定位
  autoFloatEnabled [默认值：true] //是否保持toolbar的位置不动，默认true  
 
# 页面中js的导入方式改为异步加载,后面导入文件找不到了
  ```bash
    ·
    ·
    ·
    <script async src="%PUBLIC_URL%/ueditor/ueditor.config.js"></script>
    <script async src="%PUBLIC_URL%/ueditor/ueditor.all.min.js"></script>
   </body>
   </html>
  ```
 * 原因ueditor如果不配置UEDITOR_HOME_URL（ueditor.config.js）地址计算会按最后一个js地址计算出相对目录，而生产的页面底部会追加<script type="text/javascript" src="/static/js/bundle.js"></script>  
 * 临时解决方式（非正式） 把script放到</body>后面
