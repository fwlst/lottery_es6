/*
* 接口模块
* */

import $http from 'axios'
class Interface {
    /**
     * [gotOmit 获取遗漏数据]
     * @param {string} issue [当前期号]
     * @return {Promise<any>}
     */
    gotOmit(issue) {
        let self = this;   //剪头函数的this指向指的是定义时的this指向，而不是运行时的this指向。
        return new Promise((resolve, reject) => {
            $http.post('', {issue: issue}).then((res) => {
                self.setOmit(res.data.data);
                resolve.call(self, res.data);
            }).catch((err) => {
                reject.call(err);
            })
        })
    }

    /**
     * [gotOpenCode 获取期号]
     * @param {string} issue [当前期号]
     * @return {Promise<any>}
     */
    gotOpenCode(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $http.post('', {issue: issue}).then((res) => {
                self.setOpenCode(res.data.data);
                resolve.call(self, res.data);
            }).catch((err) => {
                reject.call(err);
            })
        })
    }


    /**
     * [gotState 获取售卖状态]
     * @param {string} issue [当前期号]
     * @return {Promise<any>}
     */
    gotState(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $http.post('', {issue: issue}).then((res) => {
                resolve.call(self, res.data);
            }).catch((err) => {
                reject.call(err);
            })
        })
    }
}

export default Interface






















