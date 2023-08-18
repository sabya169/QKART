import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login";
import theme from "./theme";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Products from "./components/Products"
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"


// export const config = {
//   endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
// };


export const config = {
  endpoint: `https://qkart-frontend-ll0s.onrender.com/api/v1`,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/thanks">
            <Thanks />
          </Route>

        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
/* A <Switch> looks through its children <Route>s AND
            RENDERS THE FIRST ONE that matches the current URL. */

// It just means that whenever a route's path matches 
// the url path, the router will render the route's component
