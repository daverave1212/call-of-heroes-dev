import React from 'react'


function doSomething() {
  alert("YASDA")
}

export default () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Welcome to React-Static</h1>
    <button onClick={doSomething}></button>
  </div>
)
