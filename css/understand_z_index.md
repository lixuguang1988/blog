# 层叠顺序
 * 层叠上下文的背景和边框
 * z-index 为负的定位元素，负值越大越靠底
 * 非定位的块级元素(no-positioned no-flow) div/table
 * 非定位的浮动元素
 * 非定位的行内元素
 * z-index 等于0的定位元素
 * z-index 大于0定位元素
 > 子元素的层叠顺序在只在父级层叠上下文中有意义，子级层叠上下文被自动视为父级层叠上下文的一个独立单元。  
 > 成为层叠上下文的元素层级等 z-index的定位元素一致 <code>opacity != 1</code>会形成新的层叠上下文   

# 没有z-index的情况
 * 层叠上下文的背景元素
 * 非定位的块级元素
 * 非定位的浮动元素
 * 非定位的行内元素
 * 定位元素
 > 同级元素根据出现先后顺序
 > 元素变成层叠上下文之后的 遵循定位元素

#  z-index
[mdn Understanding_z_index](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index)  
[层叠上下文和层叠顺序](https://blog.csdn.net/destinytaoer/article/details/78400033)

# 成为层叠上下文
 * 根元素 html
 * z-index 不为auto的定位元素(position: relative|absolute)
 * opacity 不为0的元素
 * position为fixed的定位元素
 * transform 不为none的元素
 * -wekibt-overflow-scrolling 的为touch的元素
 * 设置了z-index，且不为auto的flex元素(父元素display:flex|inline-flex)
 * 设置了filter值，且不是none的元素
 * 设置了mix-blend-mode值，且不为normal的元素
 * 设置了isolation，且为isolate的元素
