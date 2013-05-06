js-oo

简单的面向对象框架，使用单纯的闭包解决，力求代码最接近原生js代码，而不需要使用诸如createClass一类的函数。但是闭包的使用可能有性能问题。没有具体测试过和其它框架的对比。

能够支持多级继承，函数重写，函数继承，简单多态。没有接口的框架，也没有多父亲继承。

* abraham1@163.com
* @白羊座小葛

使用方法：

function Person(name) {
	this.name = name;
}
Person.prototype = {
	say : function(other) {
		console.log("I'm a person. my name is " + this.name);
		console.log("hello " + other);
	},
	eat : function() {
		console.log("person eat");
	}
}

function Student(name, school) {
	this.base(name);
	this.school = school;
}
Student.prototype = {
	say : function(other, msg) {
		this.callBase("say", other);
		console.log("I'm a student. My school is " + this.school);
		console.log("msg is " + msg);
	}
}
$.inherit(Student, Person);

function Master(name, school, institute) {
	this.base(name, school);
	this.insititute = insititute;
}
Master.prototype = {
	say : function(other, msg) {
		this.callBase(other, msg);
		console.log("My institute is "+this.insititute);
	}
}
$.inherit(Master, Student);

var p = new Person("XiaoQiang");
p.say("world");
p.eat();
var s = new Student("XiaoMing", "Nanjing University");
s.say("world", "I love you.");
s.eat();
var m = new Master("XiaoGe", "Nanjing University", "Software Insititute.");
m.say("world", "I love Daisy.");
s.eat();

