/*
* 彩票基础模块
* */

import $ from 'jquery'


class Base {

    initPlayList() {
        this.playList
            .set('r2', {
                bonus: 6,
                tip: `从01~11中任选2个或多个号码,所选号码与开奖号码任意两个号码相同,即中奖<em>6</em>元`,
                name: '任二'
            })
            .set('r3', {
                bonus: 19,
                tip: `从01~11中任选3个或多个号码,所选号码与开奖号码任意三个号码相同,即中奖<em>19</em>元`,
                name: '任三'
            })
            .set('r4', {
                bonus: 78,
                tip: `从01~11中任选4个或多个号码,所选号码与开奖号码任意四个号码相同,即中奖<em>78</em>元`,
                name: '任四'
            })
            .set('r5', {
                bonus: 540,
                tip: `从01~11中任选5个或多个号码,所选号码与开奖号码任意五个号码相同,即中奖<em>540</em>元`,
                name: '任五'
            })
            .set('r6', {
                bonus: 90,
                tip: `从01~11中任选6个或多个号码,所选号码与开奖号码任意六个号码相同,即中奖<em>90</em>元`,
                name: '任六'
            })
            .set('r7', {
                bonus: 26,
                tip: `从01~11中任选7个或多个号码,所选号码与开奖号码任意七个号码相同,即中奖<em>26</em>元`,
                name: '任七'
            })
            .set('r8', {
                bonus: 9,
                tip: `从01~11中任选8个或多个号码,所选号码与开奖号码任意八个号码相同,即中奖<em>9</em>元`,
                name: '任八'
            })
    }


    initNumber() {
        for (let i = 0; i < 12; i++) {
            this.number.add(('' + i)).padStart(2, '0')
        }
    }


    setOmit(omit) {
        let self = this;
        self.omit.clear();
        for (let [index, item] of omit.entries()) {
            self.omit.set(index, item);
        }
        $(self.omitEl).each((index, item) => {
            $(item).text(self.omit.get(index))
        })
    }


    setOpenCode(code) {
        let self = this;
        self.openCode.clear();
        for (let item of code.values()) {
            self.openCode.add(item);
        }
        self.updateOpenCode && self.updateOpenCode.call(self, code);
    }


    toggleCodeActive(e) {
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }

    changePlayNav(e) {
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.addClass('active').siblings().removeClass('active');
        self.curPlay = $cur.attr('desc').toLocaleLowerCase();
        $('#zx_sm span').html(self.playList.get(self.curPlay).tip);
        $('.boll-list .btn-ball').removeClass('btn-boll-active');
        self.getCount();
    }

    assistHandle(e) {
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        let index = $cur.index();
        $('.boll-list .btn-ball').removeClass('btn-boll-active');
        if (index === 0) {
            $('.boll-list .btn-ball').addClass('btn-boll-active');
        }
        if (index === 1) {
            $('.boll-list .btn-ball').each((i, t) => {
                if (t.textContent - 5 > 0) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        if (index === 2) {
            $('.boll-list .btn-ball').each((i, t) => {
                if (t.textContent - 6 < 0) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        if (index === 3) {
            $('.boll-list .btn-ball').each((i, t) => {
                if (t.textContent % 2 === 1) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        if (index === 4) {
            $('.boll-list .btn-ball').each((i, t) => {
                if (t.textContent % 2 === 0) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        self.getCount();
    }


    getName() {
        return this.name;
    }


    addCode() {
        let self = this;
        let $active = $('.ball-list .btn-ball-active').text().match(/\d{2}/g);
        let active = $active ? $active.length : 0;
        let count = self.computeCount(active, self.curPlay);
        if (count > 0) {
            self.addCodeItem($active.join(' '), self.curPlay, self.playList.get(self.curPlay).name, count);

        }
    }


    addCodeItem(code, type, typeName, count) {
        let self = this;
        const tpl = `<li codes="${type} | ${code}" bonus="${count * 2}" count="${count}"><div class="code"><b>${typeName}${count ? '复式' : '单式'}</b><b class="em">${code}</b>[${count}注,<em class="code-list-money">${count*2}</em>]</div></li>`;
        $(self.cartEl).append(tpl);
        self.getTotal();
    }


}


export default Base






















