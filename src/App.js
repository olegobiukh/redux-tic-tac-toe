import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    const { items, winner, counter } = this.props;
    const { setItems, getRestarted } = this.props;

    return (
      <div className="App">
        <div
          className={`Heading ${(winner || counter === 9) && "Heading__box"}`}
        >
          <h1 className={`${(winner || counter === 9) && "Heading_End"}`}>
            {winner
              ? `${winner} won`
              : counter !== 9 && counter % 2 === 0
              ? "X"
              : counter !== 9 && counter % 1 === 0
              ? "O"
              : "Draw"}
          </h1>
        </div>
        <div className={`Game ${(winner || counter === 9) && "End"}`}>
          {items.map((item, i) => {
            if (item) {
              return (
                <span className="Box Box__checked" key={i}>
                  {item}
                </span>
              );
            }
            return (
              <span className="Box" key={i} onClick={() => setItems(i)}>
                {item}
              </span>
            );
          })}
        </div>
        <button className="Button" onClick={() => getRestarted()}>
          Restart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
  counter: state.counter,
  winner: state.winner,
  restart: state.restart
});

const mapDispatchToProps = dispatch => ({
  setItems(index) {
    dispatch({
      type: "SET_ITEMS",
      index
    });
  },
  getRestarted(bool) {
    dispatch({
      type: "RESTART",
      restart: true
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
