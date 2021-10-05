import React, { useState, useEffect } from "react";

const StateHook = () => {
  const [count, setCount] = useState(0);

  const msg = () => {
    console.log("You are doing great!");
  };

  /*INCORRECT WAY
  const increment = () => {
    setCount(count + 1);
  };
  */

  /*CORRECT WAY*/
  const increment = () => {
    setCount((prevCount) => setCount(prevCount + 1));
  };

  /*INCORRECT WAY
  const decrement = () => {
    setCount(count - 1);
  };
 */

  /*CORRECT WAY*/
  const decrement = () => {
    setCount((prevCount) => setCount(prevCount - 1));
  };

  msg();

  useEffect(() => {
    msg();
  }, [count]);

  return (
    <center>
      <button onClick={increment}>Increment</button>
      <h1>{count}</h1>
      <button onClick={decrement}>Decrement</button>
    </center>
  );
};

export default StateHook;
