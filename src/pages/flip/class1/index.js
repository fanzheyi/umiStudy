import React, { Component } from "react";
import styles from "./index.less";
export default class ListExample extends Component {
    state = {};

    render() {
        return (
            <div className={styles.class1}>
                <h1>概念</h1>
                <p>
                    <br /><span>First</span>
                    <br />即将做动画的元素的初始状态（比如位置、透明度等等）。
<br />
                    <br /><span>Last</span>
                    <br />即将做动画的元素的最终状态。
<br />
                    <br /><span>Invert</span>
                    <br />这一步比较关键，假设我们图片的初始位置是 左: 0, 上：0，元素动画后的最终位置是 左：100, 上100，那么很明显这个元素是向右下角运动了 100px。
<br />
                    <br />但是，此时我们不按照常规思维去先计算它的最终位置，然后再命令元素从 0, 0 运动到 100, 100，而是先让元素自己移动过去（比如在 Vue 中用数据来驱动，在数组前面追加几个图片，之前的图片就自己移动到下面去了）。
<br />
                    <br />这里有一个关键的知识点要注意了，也是我在之前的文章《深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调》中提到过的：
<br />
                    <br />DOM 元素属性的改变（比如 left、right、 transform 等等），会被集中起来延迟到浏览器的下一帧统一渲染，所以我们可以得到一个这样的中间时间点：DOM 状态（位置信息）改变了，而浏览器还没渲染。
<br />
                    <br />有了这个前置条件，我们就可以保证先让 Vue 去操作 DOM 变更，此时浏览器还未渲染，我们已经能得到 DOM 状态变更后的位置了。
<br />
                    <br />说的具体点，假设我们的图片是一行两个排列，图片数组初始化的状态是 [img1, img2，此时我们往数组头部追加两个元素 [img3, img4, img1, img2]，那么 img1 和 img2 就自然而然的被挤到下一行去了。
<br />
                    <br />假设 img1 的初始位置是 0, 0，被数据驱动导致的 DOM 改变挤下去后的位置是 100, 100，那么此时浏览器还没有渲染，我们可以在这个时间点把 img1.style.transform = translate(-100px, -100px)，让它 先 Invert 倒置回位移前的位置。
<br />
                    <br /><span>Play</span>
                    <br />倒置了以后，想要让它做动画就很简单了，再让它回到 0, 0 的位置即可，本文会采用最新的 Web Animation API 来实现最后的 Play。
                </p>
                <p style={{ marginTop: '20px' }}><span> 借鉴</span> </p>
                <p>git地址：<a href="https://github.com/aholachek/react-flip-toolkit">https://github.com/aholachek/react-flip-toolkit</a> </p>
                <p>api地址：<a href="https://python.ctolib.com/aholachek-react-flip-toolkit.html">https://python.ctolib.com/aholachek-react-flip-toolkit.html</a> </p>
                <p>原理相关：<a href="https://zhuanlan.zhihu.com/p/146641652">https://zhuanlan.zhihu.com/p/146641652</a> </p>
                <p>完整demo：<a href="https://react-flip-toolkit.surge.sh/?sort=ascending&display=list">https://react-flip-toolkit.surge.sh/?sort=ascending&display=list</a> </p>

            </div>
        );
    }
}


