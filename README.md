# LineGame have been done
# 连线游戏DEMO
# bug 1 修复
# 清除的时候网格背景的颜色不对
# bug 2 修复
# 点击一个圆点的时候之后，再点击另外一个圆点的时候绘图错误(路径加入错误)
# bug 3 修复判断出错
# 链接两个不同的圆点时候会进行连线
# bug4 修复 graphics 使用的问题，每次帧循环都要进行clear
# 两个点连接成功后在点击其中一个点的时候方格背景颜色消失但是路径线还在
# bug5 点击开始时候检测当前点击的是哪个对应的graphics的id进行clear
# 其中一个点移动了一部分再点击正确点的位置之前的路径没有消除
# bug6
# 两个点连接完毕后，在点击一个空白处的时候会进行绘制线段

# to do list
# 具备斩断线段功能（修改路径数据信息）
# 具备回退功能（修改路径数据信息）[实现：判断路径数组中是否是最后一个点如果是倒数第二个点的话就清除对应的路径和背景方格的颜色]
# 判断是否游戏结束进入到下一关在touchend进行判断各个点的路径是否和配置文件中的路径相同
# 优化代码，性能优化处理
# 添加弹出层管理器，动态控制弹出层的显示，包括视频，动画，弹框显示


