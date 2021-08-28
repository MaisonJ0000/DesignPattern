import StackCalculator from "./StackCalculator";

// 객체 컴포지션

class SafeCalculator {
  constructor (calculator) {
    this.calculator = calculator;
  }

  putValue (val) {
    return this.calculator.putValue(val);
  }

  divide () {
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw Error('Division by 0');
    }
    return this.calculator.divide();
  }
}

// 객체 리터럴
const createSafeCalculator = (calculator) => {
  return {
    putValue (val) {
      return calculator.putValue(val);
    },
    divide () {
      const divisor = calculator.peekValue();
      if (divisor === 0) {
        throw Error('Division by 0');
      }

      return calculator.divide();
    }
  }
}

// 함수가 10개 정도 있으면 위임하는게 매우 힘들다. 한꺼번에 위임하는 방법 없을까?

const calculator = new StackCalculator();
// const safeCalculator = createSafeCalculator(calculator);
// safeCalculator.putValue(6);
// safeCalculator.putValue(0);
// safeCalculator.divide(); /*?*/

// safeCalculator.clear(); // 귀찮은 위임을 빼먹었더니 에러가 난다. 한꺼번에 위임하는 방법 없을까?

/** 객체 확장 or 몽키 패치 **/
// 위험하다. 원본 calculator를 수정해버린다.
function patchToSafeCalculator (calculator) {
  const divideOrig = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error('Division by 0');
    }
    return divideOrig.apply(calculator);
    // return divideOrig(); // => this를 참조할 수 없다. 따라서 apply가 필요하다.
  }
  return calculator;
}

const patchedSafeCalculator = patchToSafeCalculator(calculator);
patchedSafeCalculator.putValue(6);
patchedSafeCalculator.putValue(3);
patchedSafeCalculator.divide(); /*?*/
