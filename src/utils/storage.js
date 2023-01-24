
// 封装操作sessionStorage本地存储的方法  模块化
var storage = {
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },


    getForIndex(index) {
        return sessionStorage.key(index);
    },
    getKeys(){
        let items = this.getAll();
        let keys = [];
        for (let index=0;index<items.length;index++){
            keys.push(items[index].key);
        }
        return keys;
    },
    getLength() {
        return sessionStorage.length;
    },
    getSupport() {
        return (typeof (Storage) !== "undefined") ? true : false;
    },
    remove(key) {
        sessionStorage.removeItem(key);
    },
    removeAll() {
        sessionStorage.clear();
    },
    getAll() {
        let len = sessionStorage.length;  // 获取长度
        let arr = new Array(); // 定义数据集
        for (var i = 0; i < len; i++) {
            // 获取key 索引从0开始
            var getKey = sessionStorage.key(i);
            // 获取key对应的值
            var getVal = sessionStorage.getItem(getKey);
            // 放进数组
            arr[i] = {
                'key': getKey,
                'val': getVal,
            }
        }
        return arr;
    }
}

export default storage;
