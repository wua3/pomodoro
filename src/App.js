import React from 'react';
// import logo from './logo.svg';
import './App.css';

const LengthCtrl = props => {
  return (
    <div>
      <div>{props.type} length</div>
      <button id="sub" onClick={() => {props.handleChangeLng("-", props.type);}}>-</button>
      <div>{props.length}</div>
      <button id="add" onClick={() => {props.handleChangeLng("+", props.type);}}>+</button> 
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLng: 25,
      breakLng: 5,
      timeLeft: 25*60,
      session: true,
      running: false,
    };
    this.handleChangeLng = this.handleChangeLng.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.formatMinutes = this.formatMinutes.bind(this);
  }

  handleChangeLng(sign, type) {
    if (!this.state.running) {
      const signNum = eval("0" + sign + "1");
      const val = this.state[type + "Lng"] + signNum;
      const stateName = type + "Lng";
      if (signNum < 0) {
        if (val < 1) {
          return;
        }
      }
      eval("this.setState({" + stateName + ": " + val + "});");  
      if (type=="session" && this.state.session == true) {
        this.setState({timeLeft: this.state.sessionLng*60});
      }
      if (type=="break" && this.state.session == false) {
        this.setState({timeLeft: this.state.breakLng*60});
      }
      }
  }

  handleStartStop() {
    if (this.state.running) {
      clearInterval(this.timer);
      this.setState({running: false});
    } else {
      this.timer = setInterval(this.updateTimer, 1000);
      this.setState({running: true});
    }
  }

  updateTimer() {
    if (this.state.running) {
      if (this.state.timeLeft > 0) {
        this.setState({timeLeft: this.state.timeLeft - 1});
      } else {
        if (this.state.session == false) {
          this.setState({session: true});
          this.setState({timeLeft: this.state.sessionLng*60});
        } else {
          this.setState({session: false});
          this.setState({timeLeft: this.state.breakLng*60});
        }
      }
    }
  }

  reset() {
    this.setState({running: false});
    this.setState({sessionLng: 25});
    this.setState({breakLng: 5});
    this.setState({timeLeft: this.state.sessionLng*60});
    this.setState({session: true});
  }

  formatMinutes(min) {
    if (min > 9) {return min;}
    else {
      return "0" + min;
    }
  }

  render() {
    return (
      <div className="container">
        <div>my first pomodoro clock</div>
        <LengthCtrl type="session" length={this.state.sessionLng} handleChangeLng={this.handleChangeLng}/>
        <LengthCtrl type="break" length={this.state.breakLng} handleChangeLng={this.handleChangeLng}/>
        <div>{this.state.session ? "session" : "break"}</div>
        <div>
          {Math.floor(this.state.timeLeft/60)}:
          {this.formatMinutes(this.state.timeLeft%60)}
        </div>
        <button onClick={this.handleStartStop}>{this.state.running ? "pause" : "run"}</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  }  
}

export default App;
