/**
 * @Description:    各种工具类
 * @Author:         TSY
 * @CreateDate:     2018/6/9 13:28
 */

/**
 * 判断安卓与IOS平台
 * @returns {string}
 */
export const checkPlatform = function () {
    if (/android/i.test(navigator.userAgent)) {
        return '1'
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return '2'
    }
}

/**
 * 判断是否为微信浏览器
 * @returns {boolean}
 */
export const isWeixin = function () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为钉钉浏览器
 * @returns {boolean}
 */
export const isDingTalk = function () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (/dingtalk/i.test(ua)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为iPhoneX
 * @returns {boolean}
 */
export const isIphoneX = function () {
    let ratio = window.devicePixelRatio || 1;//设备像素比
    let w = window.screen.width * ratio;
    let h = window.screen.height * ratio;
    if (checkPlatform() == 2 && w == 1125 && h == 2436) {
        return true
    }
    return false
}

/**
 * 是否为小程序环境
 * @param wx   微信SDK
 * @param callback 回调函数
 */
export const isMiniProgram = function (wx, callback) {
    //是否在微信环境
    if (!isWeixin()) {
        callback(false);
    } else {
        //微信API获取当前运行环境
        wx.miniProgram.getEnv((res) => {
            if (res.miniprogram) {//小程序环境
                callback(true);
            } else {
                callback(false);
            }
        })
    }
}

/**
 * 兼容微信设置页面的title
 */
export let setDocumentTitle = function (title) {
    document.title = title;
    let ua = navigator.userAgent;
    if (/\bMicroMessenger\/([\d.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        let i = document.createElement('iframe');
        i.src = 'javascript:;';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
};

/**
 * 日期格式化
 * @param time
 * @param format
 * @returns {string}
 */
export let formatDate = function (time, format = 'YY-MM-DD hh:mm:ss') {
    let date = time ? new Date(time) : new Date();
    let year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });////开个长度为10的数组 格式为 00 01 02 03

    let newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
}

/**
 * 计算时间差
 * @param startTime  开始时间
 * @param endTime  结束时间
 */
export let calculateDiffDateTime = function(startTime, endTime) {
    startTime = startTime.replace(/-/g, "/");
    endTime = endTime.replace(/-/g, "/");
    //转换为毫秒数
    startTime = new Date(startTime).getTime();
    endTime = new Date(endTime).getTime();

    let diffObj = {};
    let diffMilliseconds = endTime - startTime;//相差的毫秒数
    if (isNaN(diffMilliseconds)) {
        return null;
    }
    if (diffMilliseconds <= 0) {
        return diffMilliseconds;
    }
    diffObj.days = parseInt(diffMilliseconds / 1000 / 60 / 60 /24);
    diffObj.totalHours = parseInt(diffMilliseconds / 1000 / 60 / 60);
    diffObj.hours = diffObj.totalHours % 24;
    diffObj.totalMinutes = parseInt(diffMilliseconds / 1000 / 60);
    diffObj.minutes = diffObj.totalMinutes % 60+'';
    diffObj.totalSeconds = parseInt(diffMilliseconds / 1000);
    diffObj.seconds = diffObj.totalSeconds % 60;
    diffObj.totalMilliseconds = diffMilliseconds;
    diffObj.milliseconds = diffMilliseconds % 1000;
    return diffObj;
}

/**
 * 获取URL地址中的参数  queryString
 * @param name
 * @returns {*}
 */
export let getQueryString = function (name, href) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = decodeURI(window.location.search).substr(1).match(reg);
    if (href) {
        href = href.split('?')[1];
        r = decodeURI(href).match(reg);
    }
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 中文按拼音首字母排序
 * @param arr
 * @param empty
 * @returns {*}
 */
export let pySort = function (arr, empty) {
    if (!String.prototype.localeCompare)
        return null;
    let letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
    let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
    let arrList = [];
    for (let m = 0; m < arr.length; m++) {
        arrList.push(arr[m]);
    }
    let result = [];
    let curr;
    for (let i = 0; i < letters.length; i++) {
        curr = {letter: letters[i], data: []};
        if (i != 26) {
            for (let j = 0; j < arrList.length; j++) {
                let initial = arrList[j].charAt(0);//截取第一个字符
                if (arrList[j].charAt(0) == letters[i] || arrList[j].charAt(0) == letters[i].toLowerCase()) {   //首字符是英文的
                    curr.data.push(arrList[j]);
                } else if (zh[i] != '*' && isChinese(initial)) {      //判断是否是无汉字,是否是中文
                    if (initial.localeCompare(zh[i]) >= 0 && (!zh[i + 1] || initial.localeCompare(zh[i + 1]) < 0)) {   //判断中文字符在哪一个类别
                        curr.data.push(arrList[j]);
                    }
                }
            }
        } else {
            for (let k = 0; k < arrList.length; k++) {
                let ini = arrList[k].charAt(0);           //截取第一个字符
                if (!isChar(ini) && !isChinese(ini)) {
                    curr.data.push(arrList[k]);
                }
            }
        }
        if (empty || curr.data.length) {
            result.push(curr);
            //curr.data.sort(function(a,b){
            //    return b.localeCompare(a);       //排序,英文排序,汉字排在英文后面
            //});
        }
    }
    return result;
}

/**
 * 是否为中文
 * @param temp
 * @returns {boolean}
 */
function isChinese(temp) {
    let re = /[^\u4E00-\u9FA5]/;
    if (re.test(temp)) {
        return false;
    }
    return true;
}

/**
 * 是否为英文
 * @param char
 * @returns {boolean}
 */
function isChar(char) {
    let reg = /[A-Za-z]/;
    if (!reg.test(char)) {
        return false;
    }
    return true;
}

/**
 * 替换全部匹配的字符
 * @param f  代替换的字符
 * @param e  替换之后的字符
 * @returns {*}
 */
export const replaceAll = function (f, e) {//把f替换成e
    var reg = new RegExp(f, "g"); //创建正则RegExp对象
    return this.replace(reg, e);
}

/**
 * 去除字符串中的html标签
 * @param str
 * @returns {*}
 */
export const delHtmlTag = function (str) {
    str = str || '';
    return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
}

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
export const getWeekFromDateString = function (dateString) {
    var date;
    if (isNull(dateString)) {
        date = new Date();
    } else {
        var dateArray = dateString.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    return "星期" + "日一二三四五六".charAt(date.getDay());
}

/**
 * 是否为Null
 * @param object
 * @returns {Boolean}
 */
function isNull(object) {
    if (object == null || typeof object == "undefined") {
        return true;
    }
    return false;
}

/**
 * 当前按钮是否可点击
 * @param delay 按钮失效时间
 * @returns {boolean}
 */
let lastClickTime = new Date();
export const isCanClick = function (delay) {
    delay = delay || 2000;//默认2秒
    if (new Date() - lastClickTime > delay) {
        lastClickTime = new Date();
        return true;
    } else {
        return false;
    }
}

/**
 * 图片大图预览
 * @param url
 */
export const createImagePreview = function(url) {
    let previewDiv = document.createElement('div');
    previewDiv.style.cssText = "position:fixed;\n" +
        "        top:0;\n" +
        "        left:0;\n" +
        "        display:flex;\n" +
        "        justify-content:center;\n" +
        "        align-items:center;\n" +
        "        width:100%;\n" +
        "        min-height:100vh;\n" +
        "        background:#000000;\n" +
        "        z-index:10000;";
    previewDiv.setAttribute('class', 'previewBigImageMask');
    let imgHtml = document.createElement('img');
    imgHtml.setAttribute('src', url);
    previewDiv.appendChild(imgHtml);
    document.body.appendChild(previewDiv);
    let closeImagePreview = function () {
        previewDiv.removeEventListener('click', closeImagePreview);
        document.body.removeChild(previewDiv);
    }
    previewDiv.addEventListener('click', closeImagePreview);
}

/**
 * 检测图片是否存在
 * @param url
 */
export const imageIsExist = function(url) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function () {
            if (this.complete == true){
                resolve(true)
            }
        }
        img.onerror = function () {
            resolve(false)
        }
        img.src = url;
    })
}

/**
 * 对象形式的数组排序，传入对象数组、需要排序的属性
 * @param num
 * @returns {string}
 */
export function sortKey(array, key) {
    return array.sort(function (a, b) {
        let x = a[key]
        let y = b[key]
        return ((x < y) ? -1 : (x > y) ? 1 : 0)
    })
}
