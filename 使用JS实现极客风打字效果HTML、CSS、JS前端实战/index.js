const textEl = document.querySelector("#text");
const texts = JSON.parse(textEl.getAttribute("data-text"));

let index = 0; //文本数组的第几个
let charIndex = 0; //当前字符串下标
let delta = 500; //间隔时间 毫秒

let start = null;
let isDeleting = false; //打印完一行的标志（是否是打印）

function type(time) {
  window.requestAnimationFrame(type);
  if (!start) start = time; //初始化时间
  let progress = time - start; //获取时间间隔

  if (progress > delta) {
    let text = texts[index];
    if (!isDeleting) {
      // 随着下标增加，插入截取的字符也增加
      textEl.innerHTML = text.slice(0, ++charIndex);
      delta = 500 - Math.random() * 400; //100-500的随机函数
    } else {
      textEl.innerHTML = text.slice(0, charIndex--); //删除效果
    }

    start = time;

    if (charIndex === text.length) {
      //打印完了
      isDeleting = true;
      delta = 200;
      start = time + 1200;
    }

    if (charIndex < 0) {
      //删完了
      isDeleting = false;
      start = time + 200;
      index = ++index % texts.length; //数组循环取下标
    }
  }
}

window.requestAnimationFrame(type);
