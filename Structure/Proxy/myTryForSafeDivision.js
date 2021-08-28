import StackCalculator from "./StackCalculator";

class SafeCalculator {
  constructor () {
    this.calculator = new StackCalculator();
  }

  putValue (val) {
    return this.calculator.putValue(val);
  }

  divide () {
    if (this.calculator.peekValue() === 0) {
      return 'nono';
    }
    return this.calculator.divide();
  }
}

const calc = new SafeCalculator();
calc.putValue(6);
calc.putValue(3);
calc.divide(); /*?*/
calc.putValue(6);
calc.putValue(0);
calc.divide(); /*?*/


// 객체 리터럴
const createSafeCalculator = (calculator) => {
  return {
    putValue: calculator.putValue,
    divide: calculator.divide,
  }
}

const calculator = new StackCalculator();
const safeCalculator = createSafeCalculator(calculator);
safeCalculator.putValue(6); // 당연히 안된다. this가 클래스가 아닌 object를 가리키게 되므로, this.stack은 없다. this.putValue, this.divide 등은 있겠지.


const revisedCreateSafeCalculator = (calculator) => {
  return {
    putValue: (val) => calculator.putValue(val),
    divide: () => calculator.divide(),
  }
}
