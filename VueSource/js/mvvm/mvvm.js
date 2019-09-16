/* 
相当于Vue的构造函数
options: 配置对象
*/
function MVVM(options) {
    // 将配置对象保存到vm上
    this.$options = options;
    // 将data对象保存到vm和变量data上
    var data = this._data = this.$options.data;
    // 将vm保存到变量me上
    var me = this;
    // 遍历data中所有属性
    Object.keys(data).forEach(function(key) {
        // 对指定属性实现数据代理
        me._proxy(key);
    });

    observe(data, this);

    // 创建编译对象
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
        var me = this;
        // 给vm重新指定(与data中对应)的属性
        Object.defineProperty(me, key, {
            // 不可以重新定义
            configurable: false,
            // 可以枚举遍历
            enumerable: true,
            // 当通过vm.xxx读取属性值时自动调用, 函数的返回值作为属性值, this是vm
            get: function proxyGetter() {
                // 取data中的同名属性值返回
                return me._data[key];
            },
            // 当通过vm.xxx=value修改属性值时自动调用, 监视属性值变化, this是vm
            set: function proxySetter(newVal) {
                // 将最新值保存到data对象中同名属性上
                me._data[key] = newVal;
            }
        });
    }
};