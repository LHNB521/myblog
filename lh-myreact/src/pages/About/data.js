const data =
  '<a name="lTmDJ"></a>\n# 1.闭包\n<a name="L7Nw0"></a>\n## 闭包的定义：\n\n- 函数执行时候形成一个私有作用域，保护里面的变量不受外界干扰，这种保护机制称为闭包。\n- 市面解释：形成一个不销毁的私有作用域（私有栈内存）才是闭包。\n<a name="YgkSX"></a>\n## 闭包应用：\n<a name="lulhg"></a>\n### 1.柯里化函数\n柯里化函数思想：把多参数的函数变成单产参数的函数。\n```javascript\nfunction fn(a, b, c) {\n\treturn a + b + c;\n}\n\nfunction fn1(a) {\n\treturn function (b) { // 这种在函数中 return 函数的做法是市面中认为的闭包\n\t\treturn function (c) {\n\t\t\treturn a + b + c;\n\t\t}\n\t}\n}\nfn1(1)(2)(3);\n```\n<a name="Y3Eqp"></a>\n### 2.利用闭包机制隔离全局命名空间\n```javascript\n(function () {\n\t// 自执行函数执行也是闭包\n\tlet a = 100; // a 是一个私有变量，不会影响全局作用域中的变量命名\n})();\n```\n<a name="kj7Fx"></a>\n### 3.惰性封装\n```javascript\nvar utils = (function () {\n\tvar version = \'1.0.1\';\n\tfunction sum(a, b) {\n\t\treturn a + b\n\t}\n\tfunction minus(a, b) {\n\t\treturn a - b;\n\t}\n\treturn {\n\t\tsum: sum,\n\t\tminus: minus\n\t}\n})();\n```\n<a name="lAArF"></a>\n### 4.利用闭包的不销毁作用域保存数据：累加记数、选项卡闭包版本\n<a name="3CanE"></a>\n# 2.this\nthis是js的关键字，代表当前代码执行的环境对象。一般在函数中使用，并且是在函数执行时，根据函数的不同的执行方式确定不同的值。目前阶段有一下情况：\n<a name="xWIqX"></a>\n## 1.事件函数中的this是绑定该事件的元素；\n```javascript\nlet box = document.getElementById(\'box\');\nbox.onclick = function () {\n\tconsole.log(this); // box 元素对象\n};\n```\n<a name="gXfYy"></a>\n## 2.自执行函数中的this是window\n```javascript\n(function () {\n\tconsole.log(this);\n})();\n```\n<a name="K49ui"></a>\n## 3.setTimeout/setInterval定时器回调函数中的this指向window\n```javascript\nsetTimeout(function () {\n\tconsole.log(this);\n}, 0); // 定时器写 0 也不会立刻执行，也需要等待其他同步代码执行完才会执行；\n```\n<a name="B5Kbc"></a>\n## 4.方法调用时，看方法前面是否有点.如果有点前面是谁，this就是谁，如果没有，方法中的this就是window\n```javascript\nvar num = 13;\nvar obj = {\n\tnum: 12,\n\tfn: function () {\n\t\tconsole.log(this.num);\n\t}\n};\nobj.fn(); // 12\nobj[\'fn\'](); // 12 obj[\'fn\'] 等效于 obj.fn 所以，this 仍然指向 obj\n\nvar fn = obj.fn;\nfn(); // 13；window.num\n```\n<a name="OFdt0"></a>\n## 5.箭头函数中的this指向函数定义时所在作用域中的this\n箭头函数：<br />Es6新增的语法：省略function关键字，在形参入口后增加=>箭头，后面紧跟函数体；\n```javascript\nlet f = (a, b) => {\n\treturn a + b;\n\tconsole.log(this)\n};\nf();\n```\n<a name="fZduj"></a>\n### 1.只有一个形参时，可以省略形参入口的小括号\n```javascript\nlet f2 = a => {\n\tvar x = 10;\n\tx += a;\n\treturn x;\n};\n```\n<a name="RNf73"></a>\n### 2.如果函数只有一行代码，或者只有return指定返回值，可以省略函数体的花括号和return关键字\n```javascript\nlet transfer = (a, b) => a + b;\n// 等效于：\nlet transfer = function (a, b) {\n\treturn a + b;\n}\n```\n<a name="BsL4h"></a>\n## 6.全局作用域中的this是window\nconsloe.log(this);\n<a name="5Pet3"></a>\n## 7.this在运行时不可以赋值\nthis={}； //报错\n\n<a name="M4b9h"></a>\n# 3.++i和i++\n++i和i++都是给i累加1；但是加的时机不同。\n\n- ++i是先累加自身，然后再取累加后的值和其他值运算\n- i++是先取当前值和其他运算，在累加自身\n```javascript\nvar i = 0;\nconsole.log(++i); // 1\nconsole.log(i++); // 0\n```\n```javascript\nvar a = 12; // 13 14\nvar b = 13; // 14 15\n\nconsole.log(++a + a++ + b++ + ++b + a + b); // 13 + 13 + 13 + 15 + 14 + 15 = 83\n```\n\n';
module.exports = {
  data
};