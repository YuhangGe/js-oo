var $ = {
    /**
     * js 面向对象。仅仅使用闭包，希望的是最简单的实现，
     * 使用起来最接近原生的js代码。
     * 但是闭包的使用可能有性能问题。没有具体测试过和其它框架的对比。
     * 把第一行代码改成jQuery.extend(jQuery, {})则可以简单的将代码变成jQuery插件。
     *
     * 由白羊座小葛设计编写。
     * abraham1@163.com
     * @白羊座小葛
     */
    inherit: function (inheritClass, baseClass) {
        if (typeof inheritClass === 'undefined' || typeof baseClass === 'undefined') {
            console.trace();
            throw "inherit error!";
        }
        //首先把父类的prototype中的函数继承到子类中
        for (var pFunc in baseClass.prototype) {
            var sp = inheritClass.prototype[pFunc];
            //如果子类中没有这个函数，添加
            if (typeof sp === 'undefined') {
                inheritClass.prototype[pFunc] = baseClass.prototype[pFunc];
            }
            //如果子类已经有这个函数，则忽略。以后可使用下面的callBase函数调用父类的方法

        }
        //保存继承树，当有多级继承时要借住继承树对父类进行访问
        inheritClass.__base_objects__ = new Array();
        inheritClass.__base_objects__.push(baseClass);

        if (typeof baseClass.__base_objects__ !== 'undefined') {
            for (var i = 0; i < baseClass.__base_objects__.length; i++)
                inheritClass.__base_objects__.push(baseClass.__base_objects__[i]);
        }

        /**
         * 执行父类构造函数，相当于java中的this.super()
         * 不使用super是因为super是ECMAScript保留关键字.
         * @param {arguments} args 参数，可以不提供
         */
        inheritClass.prototype.base = function (args) {

            var baseClass = null, rtn = undefined;
            if (typeof this.__inherit_base_deep__ === 'undefined') {
                this.__inherit_base_deep__ = 0;
            } else {
                this.__inherit_base_deep__++;
                //$.dprint("d+:"+this.__inherit_deep__);
            }

            baseClass = inheritClass.__base_objects__[this.__inherit_base_deep__];

            if (typeof args === "undefined" || args == null) {
                rtn = baseClass.call(this);
            } else if (args instanceof Array === true) {
                rtn = baseClass.apply(this, args);
            } else {
                rtn = baseClass.apply(this, [].slice.call(arguments));
            }

            this.__inherit_base_deep__--;

            //$.dprint("d-:"+this.__inherit_deep__);
            return rtn;
        }
        /**
         * 给继承的子类添加调用父函数的方法
         * @param {string} method 父类的函数的名称
         * @param {arguments} args 参数，可以不提供
         */
        inheritClass.prototype.callBase = function (method, args) {

            var baseClass = null, rtn = undefined;

            if (typeof this.__inherit_deep__ === 'undefined') {
                this.__inherit_deep__ = 0;

            } else {
                this.__inherit_deep__++;
                //$.dprint("d+:"+this.__inherit_deep__);
            }

            //$.dprint(this.__inherit_deep__);
            baseClass = inheritClass.__base_objects__[this.__inherit_deep__];

            var med = baseClass.prototype[method];
            if (typeof med === 'function') {
                if (typeof args === "undefined" || args === null) {
                    rtn = med.call(this);
                } else if (args instanceof Array === true) {
                    rtn = med.apply(this, args);
                } else {
                    rtn = med.apply(this, [].slice.call(arguments, 1));
                }
            } else {
                throw "There is no method:" + method + " in baseClass";
            }

            this.__inherit_deep__--;

            //$.dprint("d-:"+this.__inherit_deep__);
            //$.dprint("----");
            return rtn;
        }
    }
}