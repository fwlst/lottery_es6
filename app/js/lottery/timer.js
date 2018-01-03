/*
* 时间模块
* */

class Timer {
    /**
     * [countDown 倒计时]
     * @param {number} start [当前时间]
     * @param {number} end [结束时间]
     * @param {function} update [更新回调函数]
     * @param {function} handle [结束回调函数]
     */

    countDown(start, end, update, handle) {
        let self = this;
        let now = start || new Date().getTime();
        if (now - end>0) {
            handle.call(self);
        } else {
            let lastTime = end - now;
            const pxD = 1000 * 60 * 60 * 24;  //一天多少毫秒
            const pxH = 1000 * 60 * 60;  //一小时多少毫秒
            const pxM = 1000 * 60;  //一分钟多少毫秒
            const pxS = 1000;  //一秒多少毫秒

            let d = Math.floor(lastTime / pxD),
                h = Math.floor((lastTime - d * pxD) / pxH),
                m = Math.floor((lastTime - d * pxD - h * pxH) / pxM),
                s = Math.floor((lastTime - d * pxD - h * pxH - m * pxM) / pxS);
            let r = [];
            if (d > 0) {
                r.push(`<em>${d}</em>天`)
            }
            if (h > 0) {
                h = h.padStart(2, '0');
                r.push(`<em>${h}</em>时`)
            }
            if (m > 0) {
                m = m.padStart(2, '0');
                r.push(`<em>${m}</em>分`)
            }
            if (s > 0) {
                s = s.padStart(2, '0');
                r.push(`<em>${s}</em>秒`)
            }

            self.lastTime = r.join('');
            update.call(self, r.join(''));
            setTimeout(() => {
                self.countDown(start,end, update, handle);
            }, 1000)
        }
    }
}

export default Timer