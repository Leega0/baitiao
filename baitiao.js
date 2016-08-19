var consolecss = 'color:red;font-weight:bold;font-size:12px';
var hms = "00:00:00";
var now = new Date();
var urlInfo = "http://coupon.m.jd.com/authCode/createCodeKey.json";
var t1 = new Date().getTime();
var ts = getServerTime(urlInfo);
var t2 = new Date().getTime();
var deviation = ts - (t1 + t2) / 2,
dev = parseInt(deviation / 1000);
console.log('%c服务器比本机时间' + ((dev >= 0) ? '快': '慢') + timer_format(Math.abs(dev)), consolecss);
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
        data: 6,
        async: false,
        dataType: "jsonp",
        success: function(t) {
            if (typeof t !== "undefined") hms = t.dayStartTime
        }
    }).getResponseHeader("Date"))
}
