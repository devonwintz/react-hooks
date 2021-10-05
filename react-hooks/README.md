# React Hooks

Hooks are essentially functions that allow us to use states and other React features in React Functional Components. When using React Hooks, there are two rules that must be followed:

- **Only call Hooks at the top level**: The calling of Hooks are **NOT** permissible inside loops, conditions or nested functions. A general rule of thumb is to use React Hooks before any early returns.
- **Only call Hooks from React functions**: This is self-explanatory. _Do not call Hooks from regular JavaScript functions._

**Fun Fact**: While Hooks were a new addition in React 16.8, they are backwards-compatible.

## useState Hook

The React `useState` Hook allows you to add state to your functional component. Prior to Hooks, this was only possible with class components. In order to use the Hook, we first need to import it:

```
import React, { useState } from "react";
```

`useState` returns a stateful value and a function to update that state value. For the example used in this repo, we will be incrementing and decrementing a count value based on an on-click event.

```
const [count, setCount] = useState(0);
```

As noted above, the `useState` Hook returns a stateful value and a function to update the same. Correpsondingly, the stateful value is `count`, while the function is `setCount`. Further, during the initial render, the returned state is the `initialState` value, passed in the useState function. In this regard, the initial value of count is **0**.
<br/>
Thus, the result on the screen for the following component return block should be zero:

```
  return (
    <center>
      <h1>{count}</h1>
    </center>
  );
```

To change the state, from the initial value, we need to make use of the `setCount` function. This can be done directly on a user event, such as within a button. For example, `<button onClick={()=>setCount(count + 1)}>Increment</button>` On the other hand, it can be used within a custom function. We will use the latter method. The functions are defined as follow:

```
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
```

Above, we defined two functions to help us perfom the two operations: increment and decrement by a specified value, which in this case is **1**. <br/>
You will notice that there are two versions of these functions, the _Correct Way_ and the _Incorrect Way_. The correct way, checks for the most recent version of the state variable before updating it. While the incorrect way, always uses the initial value. So, for example, if we were to increment the count value using two separate functions, using the incorrect way, each function will look at the initial value, which is zero and this would be incorrect.

```
setCount(count + 1);
setCount(count + 1);
```

Using the incorrect way, the result of the above snippet would be 1 and not two.
<br/><br/>
To actually update the state of our count variabe, we will add two buttons to increment and decrement respectively, along with calls to those functions.

```
  return (
    <center>
      <button onClick={increment}>Increment</button>
      <h1>{count}</h1>
      <button onClick={decrement}>Decrement</button>
    </center>
  );
```

## useEffect Hook

Before we dive into our next Hook, `useEffect`, we need to first understand, the lifecycle of the stages, each component goes through. These stages include:

- **Mounting**: adding nodes to the DOM.
- **Updating**: making changes to nodes already in the DOM.
- **Unmounting**: removing nodes from the DOM.

`useEffect` accepts a function that contains imperative, possibly effectful code. The term effectful is used to describe actions such as mutations, subscriptions, timers, logging, etc.
<br/>
To show one of the useful ways in which useEffect can be used, we will define a new function that will simply log a message to the console.

```
  const msg = () => {
    console.log("You are doing great!");
  };

  msg();

```

To see the result of the newly added function, you will need to open up your browser console. <br/>
Once you are there, if there are no errors, you should see the message, "You are doing great!". If you click on any one of the buttons, which will cause the state to change, a function call will be made again. This will happen for each update, causing the message to be logged repeatedly.
<br/>
However, let us say that we are desirous of displaying the message only when the `count` value is changed. To do this, we will introduce the useEffect Hook.

```
  useEffect(() => {
    msg();
  });
```

As noted above, the useEffect Hook accepts a function. The code snippet above will continue to behave as it did before introducing the useEffect Hook. To benefit from the useEffect Hook, we need to pass another optional argument, a dependency array. <br/>
If an empty array is used, the behaviour still will remain the same. However, since we want to only log the message when the count value is changed, we simply need to add that.

```
  useEffect(() => {
    msg(count);
  });
```

The example above is a trivial one. It can be more useful, for example when you are making API calls. You do not want to make a call each time something is updated on your page. A good approach would be to only make the call when different resources are need such as the change of an endpoint, etc.

```
  useEffect(() => {
    //Some API call
  }, [APIurl]);
```

### Cleaning up an effect

Often, effects create resources that need to be cleaned up before the component leaves the screen, such as a subscription or timer ID. To do this, the function passed to useEffect may return a clean-up function.

## useReducer

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useReducer` is an alternative to useState. It accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a dispatch method. (If you’re familiar with Redux, you already know how this works.)

useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
