import React from 'react';
import './Calculator.css';
import Output from './Output';
import Formula from './Formula';
import Buttons from './Buttons';
/*计算器的一些默认设置（要求实现）
1.最长的数字是22位，再多的话就显示Digit Limit Met 然后返回上一个数字状态
2.小数点后面最多12位--精度；多的话会四舍五入截断
3.最后一个字符如果是加减乘除，计算时会忽略掉这个字符
4.显示出来的数字是字符串，所以和后台计算要互相转化；expression（计算用）和formula（上面一行显示）互相转化
5.乘法：下面一行显示X， 上面一行公式显示• 后台计算用* 
6.减法： 下面显示长横线 - ,上面一行显示短横线 ‑ ， 后台计算用长横 - 
*/


const isOperator = /[x/+‑]/,  
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /[x/+]‑$/;
//正则表达式：  /正则内容/  []字符集合 $以某字符结尾


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0", //显示屏下面一行，显示结果 output
      prevVal: "0",  //存储上一步的currentVal
      formula: "",  //显示屏上面一行，用来显示公式运算过程
      currentSign: "pos",
      evaluated: false,  
      lastClicked: ""
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);  //计算answer，显示上面一行
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({
      currentVal: "Digit Limit Met",
      prevVal: this.state.currentVal
    });
    setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
  }
// 先把之前的存储好prevVal:this.state.currentVal 里面的this是外面的，也就是之前的，显示超出后，1s后变回超出之前的显示

  handleEvaluate() {
    if (!this.state.currentVal.includes("Limit")) {
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {   //检测是否靠近结尾都是运算符；regexObj.test(str): expression中包含endsWithOperator，返回true/false
        expression = expression.slice(0, -1);  //从第0个一直提取到倒数第二个字符（不包含-1）（例如6+9-=15）
      }
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");  //expression是后台用来计算的
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;  //math.round()四舍五入；eval() 函数会将传入的字符串当做 JavaScript 代码进行执行；先乘然后取整再除让精度是小数点后面12位
      this.setState({
        currentVal: answer.toString(),
        formula:
          expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,  
        prevVal: answer,
        evaluated: true   //？？？在哪有
      });
    }
  }

  handleOperators(e) {
    if (!this.state.currentVal.includes("Limit")) {
      const value = e.target.value;  //按下的按钮
      const { formula, prevVal, evaluated } = this.state;  // 把this.state.formula赋给常量formula... 
      this.setState({ currentVal: value, evaluated: false });
      if (evaluated) {     //evaluated是true的话，是计算完成了
        this.setState({ formula: prevVal + value });   //那么上面显示屏要显示之前的结果+现在的按钮
      } else if (!endsWithOperator.test(formula)) {   //显示过程里面有操作符
        this.setState({
          prevVal: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {   //显示屏以负号结尾？？？没看懂这里
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : prevVal) + value
        });
      } else if (value !== "‑") {      
        this.setState({
          formula: prevVal + value
        });
      }
    }
  }

  handleNumbers(e) {
    if (!this.state.currentVal.includes("Limit")) {
      const { currentVal, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({
          currentVal: value,    //计算完了就要显示接下来输入的数字了
          formula: value !== "0" ? value : ""   
        });
      } else {
        this.setState({
          currentVal:
            currentVal === "0" || isOperator.test(currentVal)
              ? value
              : currentVal + value,
          formula:
            currentVal === "0" && value === "0"
              ? formula === "" ? value : formula
              : /([^.0-9]0|^0)$/.test(formula)
                ? formula.slice(0, -1) + value
                : formula + value
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (
      !this.state.currentVal.includes(".") &&
      !this.state.currentVal.includes("Limit")
    ) {
      this.setState({ evaluated: false });
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentVal === "0" && this.state.formula === "")
      ) {
        this.setState({
          currentVal: "0.",
          formula: this.state.formula + "0."
        });
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: this.state.formula + "."
        });
      }
    }
  }
//初始化在这里
  initialize() {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false
    });
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, "⋅")} />
          <Output currentValue={this.state.currentVal} />
          <Buttons
            decimal={this.handleDecimal}  //小数点
            evaluate={this.handleEvaluate}  //等号
            initialize={this.initialize}   //AC
            numbers={this.handleNumbers}   //10个数字
            operators={this.handleOperators}   //四个加减乘除操作符号
          />
        </div>
      </div>
    );
  }
}

export default Calculator;
