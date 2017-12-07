/*
* 计算模块
* */

class Calculate {
    /**
     * [computeCount 注数计算]
     * @param {number} active [选中号码]
     * @param {string} playName [当前玩法标识]
     * @return {number} count [注数]
     */
    computeCount(active, playName) {
        let count = 0;
        const exist = this.playList.has(playName);
        const arr = new Array(active).fill('0');
        if (exist && playName.at(0) === 'r') {
            count = Calculate.combine(arr, playName.split('')[1]).length;
        }
        return count;
    }

    /**
     * [computeBonus 奖金范围预测]
     * @param {number} active [选中号码]
     * @param {string} playName [当前玩法标识]
     */
    computeBonus(active, playName) {
        const self = this;
        const play = playName.split('');
        let arr = new Array(play[1] * 1).fill(0);
        let max, min;
        if (play[0] === 'r') {
            //最小命中数
            let minActive = 5 - (11 - active);
            if (minActive > 0) {
                if (minActive - play[1] > 0) {
                    arr = new Array(minActive).fill(0);
                    min = Calculate.combine(arr, play[1]).length
                } else {
                    if (play[1] - 5 > 0 && active - play[1] >= 0) {
                        arr = new Array(active - 5).fill(0);
                        min = Calculate.combine(arr, play[1]).length
                    } else {
                        min = active - play[1] > -1 ? 1 : 0
                    }
                }
            }else {
                min = active - play[1]> -1 ? 1 : 0
            }

            //最大命中数
            let maxActive = Math.min(active,5);
            if(play[1]-5 > 0){
                if(active-play[1]>=0){
                    arr = new Array(active-5).fill(0);
                    max = Calculate.combine(arr, play[1]-5).length
                }else {
                    max = 0;
                }
            }else if(play[1]-5<0){
                arr = new Array(active,5).fill(0);
                max = Calculate.combine(arr, play[1]).length
            }else {
                max = 1;
            }

        }

        return [min,max].map(item=>item*self.playList.get(playName).bonus)

    }

    /**
     * [combine 组合运算]
     * @param {array} arr [参与运算的数组]
     * @param {number} size [组合运算的基数]
     * @return {Promise<any>}
     */
    combine(arr, size) {
        let allResult = [];
        //递归函数进行组合运算
        (function f(arr, size, result) {
            let arrLen = arr.length;
            if (size > arrLen) {
                return;
            }
            if (size === arrLen) {
                allResult.push([].concat(result, arr));
            } else {
                for (let i = 0; i < arrLen; i++) {
                    let newResult = [].concat(result);
                    newResult.push(arr[i]);
                    if (size === 1) {
                        allResult.push(newResult);
                    } else {
                        let newArr = [].concat(arr);
                        newArr.splice(0, i + 1);
                        f(newArr, size - 1, newResult);
                    }
                }
            }
        })(arr, size, []);
        return allResult
    }

}



export default Calculate