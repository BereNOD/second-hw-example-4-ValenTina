import React from "react";
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  state = {
    value: '',
    result: '',
    controll: ''
  };

  handleChange = (e) => {
    this.processing(e.target.value);
    this.setState({ value: e.target.value });
  };

  processing = (value) => {
    try {
      const _value = Number.parseInt(value);

      if (_value < 0 || _value !== Math.floor(_value)) {
        throw new Error('Ошибка ввода.');
      }

      if (_value === 0) {
        return this.setState({ result: '0', controll: _value });
      }

      const result = [];
      let halfValue = Math.floor(_value / 2);

      if (halfValue !== _value / 2) {
        result.push(Math.pow(_value, 2));
      } else {
        const middleValue = Math.pow(_value, 2);

        result.push(middleValue + 1);
        result.unshift(middleValue - 1);

        halfValue--;
      }

      while(halfValue--) {
        result.unshift(result[0] - 2);
        result.push(result[result.length - 1] + 2);
      }

      this.setState({ result: result.join(' + '), controll: _value });
    } catch (e) {
      this.setState({ result: e.toString(), controll: '' });
    }
  };

  render = () => {
    let sum;

    try {
      sum = eval(this.state.result);
    } catch (e) {}

    return (
      <>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        {this.state.controll ? (
          <p>{`${this.state.controll} ^ 3 = ${this.state.controll ** 3}`}</p>
        ) : null}
        <p>{this.state.result}{sum ? ` = ${sum}` : null}</p>
      </>
    );
  };
}

export default hot(App);
