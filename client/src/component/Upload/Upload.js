import React, { Component } from 'react'

class Upload extends Component {
  state={
    image: null,
    style: '',
    color: ''
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.image] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <>
        <form>
          <input value={input} onChange={event => setInput(event.target.value)}></input>
          
          <button disabled={!input} onClick={addTodo}>Closet</button>
      </form>
      </>
    )
  }
}

export default Upload;
