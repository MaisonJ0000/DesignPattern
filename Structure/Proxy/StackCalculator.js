class StackCalculator {
  constructor () {
    this.stack = []
  }

  putValue (value) {
    console.log('[JONGMAN_LOG] this', this, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    this.stack.push(value);
  }

  getValue () {
    return this.stack.pop();
  }

  peekValue () {
    return this.stack[this.stack.length - 1];
  }

  clear () {
    this.stack = [];
  }

  divide () {
    console.log('[JONGMAN_LOG] this', this, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    const divisor = this.getValue();
    const dividend = this.getValue();
    const result = dividend / divisor;
    this.putValue(result);
    return result;
  }

  multiply () {
    const multiplicand = this.getValue();
    const multiplier = this.getValue();
    const result = multiplier * multiplicand;
    this.putValue(result);
    return result;
  }
}

export default StackCalculator;
