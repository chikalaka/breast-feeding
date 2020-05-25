import React from "react"
import "./App.css"
import HomePage from "./pages/HomePage/HomePage"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App">
        <HomePage />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default App
