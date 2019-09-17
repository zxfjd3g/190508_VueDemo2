function Observer(data) {
    // 保存data对象
    this.data = data;
    // 开启监视流程
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        // 遍历data中每个属性
        Object.keys(data).forEach(function(key) {
            // 给data重新定义响应式属性
            me.defineReactive(data, key, data[key]);
        });
    },

    defineReactive: function(data, key, val) {
        // 创建一个对应的dep对象(订阅器)
        var dep = new Dep();
        // 通过递归调用实现所有层次属性的监视
        var childObj = observe(val);

        // 重新定义属性
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() { // 建立dep与watcher之间的关系
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) { // 监视数据变化, 去更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 如果新的值是object的话，对内部属性进行监听
                childObj = observe(newVal);
                // 通过dep订阅器通知所有watcher订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    // 创建对应的监视器对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 遍历每个订阅者watcher
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;