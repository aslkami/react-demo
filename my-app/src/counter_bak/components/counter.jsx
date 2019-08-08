import React, { Component } from "react";

// React.Fragment 替代 div 便会使得 内容的父级是 div#root 而不是 div#root > div

class Counter extends Component {
  style = {
    fontSize: 30
  };

  /* constructor() {
    super(); // 如果有 constructor 就必须调用 super 方法, 并且 eslint 提示 只调用 super 无意义， 除非加其他代码
    this.handleIncrement = this.handleIncrement.bind(this);
  } */

  /* handleIncrement() {
    console.log(this); // undefined, 必须实现 constructor 并且 绑定 this 的指向
  } */
  // handleIncrement = () => {
  //   // console.log(this); // 不使用 constructor 的话 可以使用 箭头函数
  //   this.setState({ value: this.state.value + 1 });
  // };
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps); // {}
    console.log("prevState", prevState); // {counters: [{}]}
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
  }

  render() {
    console.log("Counter - Render");
    const { counter, onDelete, onIncrement, onDecrement } = this.props;
    return (
      <div className="row">
        <div className="col-2">
          <span className={this.getClasses()}>{this.formatCounter()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => onDecrement(counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(counter.id)}
          >
            x
          </button>
        </div>
        {/* <h4>Counter #{counter.id}</h4> */}

        {/* <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul> */}
      </div>
    );
  }
  getClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCounter() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
