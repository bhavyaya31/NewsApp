import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
export default class App extends Component {
 
state={
  progress:0
}
setProgress=(progress)=>{
  this.setState({progress:progress})
}

  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}/>
        <Router>
      <Routes>
        <Route path="/" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="General" />}> </Route>
        <Route path="/Business" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="Business" />}> </Route>
        <Route path="/Entertainment" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="Entertainment" />}> </Route>
        <Route path="/General" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="General" />}> </Route>
        <Route path="/Health" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="Health" />}> </Route>
        <Route path="/Science" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="Science" />}> </Route>
        <Route path="/Sports" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="Sports" />}> </Route>
        <Route path="/Technology" element={<News setProgress={this.setProgress}pagesize={6} country="in" category="Technology" />}></Route>
       
      </Routes>
    </Router>




      
       
      </div>
    )
  }
}
