1. <React.fragment></React.fragment> 作用可以取消 div 的包裹
2. 获取 this 对象
   - 箭头函数
   - 写 constructor 函数，实现 super() 并且 bind 指向 当前子类
3. 传参数，
   - 在父组件传属性，子组件接受 this.props.attribute 或者 this.props.children.attribute (用于双标签里面的内容)
   - 子传父，例如删除按钮， 状态引入的父组件的，如果要删除则需要父组件删除（虽然删除按钮是在子组件里面），父组件传递删除函数，子组件执行
4. 如果调用函数时要传递参数 则 需要 { () => this.method(params) } 而不是 普通的 { this.method() }
5. 关于 `...` 扩展运算符

   ```javascript
   let arr = [{ name: "saber", weapon: "sword" }];
   let arr2 = [...arr];
   arr2[0].name = "archer";
   console.log(arr); // [ { name: 'archer', weapon: 'sword' } ]
   ```

   上面虽然用了 `...扩展运算符`， 但也只是`浅层复制`，如果改变数组内容，里面的对象引用还是同一个

6. 生命周期

   1. 常用的生命周期，`Mount` , `Update` , `Unmount`
   2. `Mount`: `contructor`, `render`, `componentDidMount`
   3. `Update`: `render`, `componentDidUpdate`
   4. `Unmount`: `componentWillUnmount`
   5. `contructor` 里无法调用 `this.setState`
   6. `componentDidMount` 获取数据
   7. `constructor` 里 `super` 不写成 `super(props)`，调用 `this.props`, 会得到 `undefined`

   ```javascript
   constructor(props) {
     super();
     // super(props);
     console.log(this.props); // undefined
     console.log(props); // {} 空对象
   }
   ```

   8. `componentDidUpdate` 记录事件触发之前的状态 `prevProps` 和 `prevState`

7. form 表单

   - 设置 `value` 值 必须有 `onchange`， 或者属性设置为 `defaultValue` or 加属性 `readOnly`
   - `ref` 操作，`username = React.createRef()`, 获取值： `this.username.current.value`
   - 可以通过 `e.currentTarget.name` 获取 input 值
   - 如果初始化的数据设置为 `null` 或者 `undefined`, 则会报错，所以需要正确的初始化值
     > 如果初始化属性不写， 但是 input 表单用到了， 当输入表单的时候 也会报错 uncontorlled => contorlled

8. [mock data](https://jsonplaceholder.typicode.com/)
9. [log data](https://sentry.io)
