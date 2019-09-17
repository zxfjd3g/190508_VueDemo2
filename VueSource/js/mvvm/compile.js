function Compile(el, vm) {
    // 保存vm
    this.$vm = vm;
    // 保存el元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 1. 取出el中所有子节点, 转移到fragment对象中
        this.$fragment = this.node2Fragment(this.$el);
        // 2. 编译fragment所有层次子节点
        this.init();
        // 3. 将编译好的所有子添加回el元素
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    /* 
    编译指定el的所有子节点
    */
    compileElement: function(el) {
        // 得到所有最外层的子节点
        var childNodes = el.childNodes,
            me = this;
        // 遍历子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 得到节点的文本内容
            var text = node.textContent;
            // 定义匹配插值语法的正则
            var reg = /\{\{(.*)\}\}/;   // {{name}}
            // 如果节点是元素节点
            if (me.isElementNode(node)) {
                // 编译元素节点中的指令属性
                me.compile(node);
            // 如果节点是一个插值语法格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译插值语法的文本节点
                me.compileText(node, RegExp.$1);
            }
            // 如果这个子节点它有下一级的子节点
            if (node.childNodes && node.childNodes.length) {
                // 递归调用 ==> 实现所有层次子节点的编译
                me.compileElement(node);
            }
        });
    },

    /* 编译元素节点中的所有指令属性 */
    compile: function(node) {
        // 得到所有属性节点
        var nodeAttrs = node.attributes,
            me = this;
        // 遍历每个属性节点
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 得到属性名: v-on:click
            var attrName = attr.name;
            // 如果是指令属性
            if (me.isDirective(attrName)) {
                // 得到属性值(表达式): test
                var exp = attr.value;
                // 得到指令名: on:click
                var dir = attrName.substring(2);
                // 如果是事件指令
                if (me.isEventDirective(dir)) {
                    // 解析事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                // 如果是普通指令
                } else {
                    // 调用对应的编译工具函数
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

/* 
一个包含n个编译模板语法的方法对象
*/
var compileUtil = {
    /* 编译v-text/{{}} */
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    
    /* 编译v-html */
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    
    /* 编译v-model */
    model: function(node, vm, exp) {
        // 初始更新节点(初始化显示)
        // 创建对应的watcher(更新显示)
        this.bind(node, vm, exp, 'model');
        
        var me = this,
        val = this._getVMVal(vm, exp);
        // 绑定input监听(当输入改变时调用)
        node.addEventListener('input', function(e) {
            // 得到输入框最新的值
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            // 将最新的值保存到表达式对应的属性上  ===> 触发数据绑定的流程===> 更新界面
            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    
    /* 编译v-class */
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    
    /* 
    正在编译模板语法的方法
    exp: 表达式  name
    dir: 指令名  text/html/class/model
    */
    bind: function(node, vm, exp, dir) {
        // 根据指令名得到对应的更新节点的函数
        var updaterFn = updater[dir + 'Updater'];
        // 执行更新函数去更新节点(第一次, ==> 初始化显示)
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 创建用于更新节点的watcher对象
        new Watcher(vm, exp, function(value, oldValue) {
            // 更新对应的节点
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // 得到根据指令名事件名: click
        var eventType = dir.split(':')[1],
        // 根据表达式去methods中得到事件回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        if (eventType && fn) {
            // 判断指定事件名和回调函数的DOM事件监听, 回调函数的this指定为vm
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


/* 
包含一些用于进行DOM更新的方法的工具对象
*/
var updater = {
    /* 更新节点的textContent属性 */
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    
    /* 更新节点的innerHTML属性 */
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    
    /* 更新节点的className属性 */
    classUpdater: function(node, value, oldValue) {
        // 得到静态类名
        var className = node.className;
        // 将静态类名拼接到动态类名, 指定为新的类名
        node.className = className ? className + ' ' + value : value
    },
    
    /* 更新节点的value属性 */
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};