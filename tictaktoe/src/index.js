import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/**
 * Square is a 'function component' that has no state. 
 * It is passed 2 properties by the 'parent' Board component:
 * <li>value - to display is either null,'X' or 'O'
 * <li>onClick - a function in the Board to update its state
 */
function Square (props) {    
    if (props.isDisabled) {
        return (
            <button className="square" disabled={props.isDisabled}>
              {'*'}
            </button>
        );
    } else 
    if (props.isWinner) {
        return (
            <button className="square winner">
              {props.value}
            </button>
        );
    } else {
        return (
            <button className="square" onClick={props.onClick}>
              {props.value}
            </button>
        );
    }
    
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            randomSquares: [
                this.getRandomSquare(),
                this.getRandomSquare(),
                this.getRandomSquare(),
                this.getRandomSquare() 
            ]
        }
    }
    /**
     * Constructs a Square at the given index 'i' with its current 
     * state and a listener function that calls this.handleClick(i).
     * @param i 
     */
    renderSquare(i) {
        /* For the first 4 moves we disable 4 random squares.
         */
        let isDisabled = (this.props.stepNumber < 3) && 
            (i === 5 || i === 6 || i === 9 || i === 10 || 
             i === this.state.randomSquares[0] || 
             i === this.state.randomSquares[1] || 
             i === this.state.randomSquares[2] || 
             i === this.state.randomSquares[3] );
        let isWinner = (this.props.winningLine !== null) ? (
            i === this.props.winningLine[0] ||
            i === this.props.winningLine[1] ||
            i === this.props.winningLine[2] 
            ) : false;
        /* Be careful here the onClick= needs to be an anonymous function 
         * so don't forget the () => otherwise React will always call it!
         */
        return <Square 
                value={this.props.squares[i]} 
                isDisabled={isDisabled}
                onClick={() => this.props.onClick(i)}
                isWinner={isWinner}  />;
    }
    getRandomSquare() {
        let x = Math.ceil(Math.random() * 15);
        while (x === 5 || x === 6 || x === 9 || x === 10) {
            x = Math.ceil(Math.random() * 15);
        }
        return x;
    }
    render() {     
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
          </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            history: [
                {squares: Array(16).fill(null)}
            ],
            xIsNext : true,
            stepNumber: 0,
            winnerIs: null,
            winningLine: null 
        }
    }
    
    /**
     * Update/set the step # to the one clicked on. 
     * If is it an even number then xIsNext will be true.
     * @param moveNumber 
     */
    jumpTo(moveNumber) {
        this.setState({
          xIsNext: (moveNumber % 2) === 0,
          stepNumber: moveNumber,
          winnerIs: null,
          winningLine: null 
        });
      }
    /**
     * State in React components is private and immutable!
     * Makes a copy of the current state, updates the square that was clicked 
     * and then calls setState().
     * @param i - index of the square tht was clicked
     */
    handleClick(i) {
        /* Making a copy of the current state here enables the undo/redo and 
         * makes it simple to detect state changes and when re-rendering is needed: 
         * (if the object ref is different than the previous one).
         */
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squaresCopy = current.squares.slice();
        // did they click on a square already taken or is there a winner?
        if (squaresCopy[i] || this.state.winnerIs) {
            return;
        }
        // update the new square before using it to calculate the winner!
        squaresCopy[i] = (this.state.xIsNext ? 'X' : 'O');
        const winner = calculateWinner(squaresCopy);
        
        /* concatenate a new history entry and update/set state */
        this.setState({
            history: history.concat([
               {squares: squaresCopy} 
            ]),
            xIsNext : !this.state.xIsNext,
            stepNumber: history.length,
            winnerIs : (winner !== null) ? winner.symbol : null,
            winningLine: (winner !== null) ? winner.line : null
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        /* JavaScript Arrays have a map() method that is commonly used for mapping data to other data.
         * Here we 'map' over the history array creating buttons as we go.
         */
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        let status;
        if (this.state.winnerIs) {
            status = 'Winner is: ' + this.state.winnerIs + ' !';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
             { /* these are the properties we pass to the Board component */ }
            <Board 
                squares={current.squares}  
                stepNumber={this.state.stepNumber}
                onClick={(i) => this.handleClick(i)}
                winningLine={this.state.winningLine}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [1, 2, 3],
      [4, 5, 6],
      [5, 6, 7],
      [8, 9, 10],
      [9, 10, 11],
      [12, 13, 14],
      [13, 14, 15],
      [0, 4, 8],
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],
      [4, 8, 12],
      [5, 9, 13],
      [6, 10, 14],
      [7, 11, 15],
      [0, 5, 10],
      [1, 6, 11],
      [2, 5, 8],
      [3, 6, 9],
      [4, 9, 14],
      [5, 10, 15],
      [6, 9, 12],
      [7, 10, 13],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {symbol:squares[a], line:[a, b, c]};
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );