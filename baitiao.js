var delay = 0.01;//提交时间（到点前或到点后多少秒领取，提前为负值，单位秒，默认0.01秒后）
var count = 0,
interval = 100;
var intvl = setInterval(tijiao, interval);
var consolecss = 'color:red;font-weight:bold;font-size:12px';
var a = null;
var eh = '<div class="lq lq-modal"><div class="lq-sr"><span>请输入验证码:</span><input type="text"class="yzm-input"><button type="button"class="yzm-lq">立即领取</button><table class="lq-yzm-box"><tr><td><div class="yzm"><img src=""id="yzm"></div></td><td><a href="#"class="change-img">看不清？换一张</a></td></tr></table></div></div>';
$('.lq-modal').remove();
$('.hd-bg').prepend(eh);
var e = location.search.slice(1).split(/&/g),
t = /key=*/,
i;
for (var s = 0; s < e.length; s++) {
    if (t.test(e[s])) {
        i = e[s].split('=')[1]
    }
}
var l = new youhuiquanInterface(i);
var hms;
var now = new Date();
var urlInfo = 'http://mkt.baitiao.jd.com/activity/getUserRecordInfo';
var t1 = new Date().getTime();
var ts = getServerTime(urlInfo);
var t2 = new Date().getTime();
var deviation = ts - (t1 + t2) / 2,
dev = parseInt(deviation / 1000);
var kaishi = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + hms;
console.log('%c优惠券领取开始时间' + kaishi, consolecss);
console.log('%c服务器比本机时间' + ((dev >= 0) ? '快': '慢') + timer_format(Math.abs(dev)), consolecss);
d();
var o = {
    _append: function(e) {
        $('.lq-modal').remove();
        $('.hd-bg').prepend(e);
        this.showConsole()
    },
    showAllDone: function(e) {
        var t = '<div class="lq-yl lq-modal"><p>' + e + '</p><div class="biaoqing"></div></div>';
        this._append(t)
    },
    showStartDraw: function() {
        var e = '<div class="lq lq-modal"><div class="lq-sr"><span>请输入验证码:</span><input type="text"class="yzm-input"><button type="button"class="yzm-lq">立即领取</button><table class="lq-yzm-box"><tr><td><div class="yzm"><img src=""id="yzm"></div></td><td><a href="#"class="change-img">看不清？换一张</a></td></tr></table></div></div>';
        this._append(e)
    },
    showActive: function() {
        var e = '<div class="lq-fbt lq-modal"><p>您还不是白条用户，激活白条再来领取吧，等你哦~</p><div class="line"><a href="http://baitiao.jd.com/activity/third "><button type="button"class="jihuo">激活白条</button></a></div>';
        this._append(e)
    },
    showOver: function(e) {
        var t = '<div class="lq-scs lq-modal"><p>' + e + '</p><div class="line"><a href="http://baitiao.jd.com/v3/ious/list"><button type="button"class="jd over"></button></a></div></div>';
        this._append(t)
    },
    showSuccess: function(e) {
        var t = '<div class="lq-scs lq-modal"><p>' + e + '</p><div class="line"><a href="http://www.jd.com"><button type="button"class="jd"></button></a></div></div>';
        this._append(t)
    },
    showFinished: function(e) {
        var t = '<div class="lq-end lq-modal"><p>' + (e || '这个活动已经结束了呢…..下次可要早些来哦~') + '</p><div class="biaoqing"></div></div>';
        this._append(t)
    },
    showNoQuan: function() {
        var e = '<div class="lq-fw lq-modal"><p>优惠券已发完了…白条君还有准备了其它活动，多多关注会有惊喜！</p><div class="biaoqing"></div></div>';
        this._append(e)
    },
    showConsole: function() {
        console.log('%c' + $('.lq-modal').text(), consolecss)
    }
};
$('.change-img').bind('click',
function(e) {
    d();
    e.preventDefault()
});
$('.yzm-lq').bind('click',
function(t) {
    var i = $('.yzm-input').val();
    if (i) {
        l.join(jQuery.base64.encode(i),
        function(t) {
            e = true;
            if (typeof t !== 'undefined' && typeof t.result !== 'undefined' && t.result.isSuccess) {
                if (t.result.code === '0000') {
                    if (typeof t.rewardRecord !== 'undefined' && typeof t.rewardRecord.rewardName !== 'undefined') {
                        if (typeof t.rewardRecord.pin !== 'undefined') {
                            o.showSuccess(t.rewardRecord.pin + '，您已成功领取' + t.rewardRecord.rewardName + '，快去打张白条爽一下吧！')
                        } else {
                            o.showSuccess('您成功领取了' + t.rewardRecord.rewardName + '，快去打张白条爽一下吧！')
                        }
                        a = t.residueNumber
                    } else {
                        o.showFinished('优惠券已发完了...白条君还有准备了其它活动，多多关注会有惊喜！')
                    }
                } else if (t.result.code === '0001' || t.result.code === '0005' || t.result.code === '0007') {
                    alert('活动异常火爆，请稍后再试');
                    $('.yzm-input').val('');
                    d()
                } else {
                    c(t)
                }
            }
            var i;
            try {
                i = JSON.stringify(t)
            } catch(s) {}
            $.ajax({
                url: 'http://mkt.baitiao.jd.com/activity/rewriteLog',
                type: 'POST',
                data: {
                    loginfo: i
                }
            })
        })
    } else {
        alert('请输入验证码');
        e = true
    }
    t.preventDefault()
});
function d() {
    $('#yzm').attr('src', 'http://mkt.baitiao.jd.com/identity/createImage?key=' + i + '&ss=' + (new Date).getTime())
}
function c(e) {
    if (e.result.code === '0013') {
        o.showAllDone('今天活动还没开始，请' + (e.dayStartTime || '') + '来领取')
    } else if (e.result.code === '0003') {
        o.showFinished()
    } else if (e.result.code === '0004' || e.result.code === '0008') {
        o.showAllDone('您已领过券啦~不要太贪心，白条君还要去拯救别人的钱包呢')
    } else if (e.result.code === '0028') {
        o.showFinished('优惠券已发完了...白条君还有准备了其它活动，多多关注会有惊喜！')
    } else if (e.result.code === '0029') {
        o.showFinished('今天的券已经被抢光了，明天' + (e.dayStartTime || '') + '再来吧')
    } else if (e.result.code === '0022') {
        o.showFinished('此活动只有新用户可以参加哦，老用户的优惠也很多还请关注其他活动哦~')
    } else if (e.result.code === '0030') {
        o.showFinished('本次活动仅支持校园白条用户参加哦~')
    } else if (e.result.code === '0006') {
        if (e.result.info.indexOf('activateBtDate') >= 0) {
            o.showFinished('优惠券已发完了...白条君还有准备了其它活动，多多关注会有惊喜！')
        } else if (e.result.info.indexOf('accountType') >= 0) {
            o.showFinished('您不符合本次活动支持的用户类型哦~')
        } else if (e.result.info.indexOf('source') >= 0 || e.result.info.indexOf('sourceCode') >= 0) {
            o.showFinished('本次活动不支持PC网页参加哦~')
        } else {
            o.showFinished('不满足条件')
        }
    } else if (e.result.code === '0012') {
        o.showNoQuan()
    } else if (e.result.code === '0026') {
        if (e.dayStartTime) {
            o.showAllDone('今天活动还已结束，请明天' + (e.dayStartTime || '') + '来领取')
        } else {
            o.showAllDone('今天活动还已结束')
        }
    } else if (e.result.code === '0027') {
        if (e.dayStartTime) {
            o.showAllDone('今天活动还没开始，请' + e.dayStartTime + '来领取')
        } else {
            o.showAllDone('今天活动还没开始')
        }
    } else if (e.result.code === '0016') {
        o.showAllDone('您来得太早啦~活动还没开始，敬请期待哦')
    } else if (e.result.code === '9999') {
        alert('验证码错误');
        $('.yzm-input').val('');
        d()
    } else if (e.result.code === '0036') {
        o.showOver('亲~您当前有逾期的白条订单哦，快去完成还款再来领券吧~')
    } else if (e.residueNumber === 0) {
        o.showAllDone('您已领过' + (e.activityName || '') + '啦~不要太贪心，白条君还要去拯救别人的钱包呢')
    } else {
        r()
    }
}
function timer_format(s) {
    var t;
    if (s > -1) {
        hour = Math.floor(s / 3600);
        min = Math.floor(s / 60) % 60;
        sec = s % 60;
        day = parseInt(hour / 24);
        if (day > 0) {
            hour = hour - 24 * day;
            t = day + '天 ' + hour + '时'
        } else t = hour + '时';
        if (min < 10) {
            t += '0'
        }
        t += min + '分';
        if (sec < 10) {
            t += '0'
        }
        t += sec + '秒'
    }
    return t
}
function getServerTime(url) {
    return new Date($.ajax({
        url: url,
        data: l.param,
        async: false,
        dataType: "jsonp",
        success: function(t) {
            if (typeof t !== "undefined") hms = t.dayStartTime
        }
    }).getResponseHeader("Date"))
}
function tijiao() {
    var nowTime = new Date((new Date()).setTime(new Date().getTime() + deviation));
    var diff = nowTime - new Date(kaishi);
    var kk = parseInt((1000 * delay - diff) / 1000);
    if (! ((interval * count) % 1000) || kk <= 0) {
        if (kk > 0) console.log('%c' + timer_format(Math.abs(kk)) + '后开始领取优惠券！', consolecss);
        else {
            console.log('%c今日优惠券领取已经开始' + timer_format(Math.abs(kk)) + '，赶快输入验证码领取吧！', consolecss);
            var i = $('.yzm-input').val();
            if (i.length >= 4) {
                $('.yzm-lq')[0].click();
                clearInterval(intvl);
                console.log('%c领取结束!', consolecss)
            }
        }
    }
    count += 1
}