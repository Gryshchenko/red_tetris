import React from 'react'
import { connect } from 'react-redux'
import { Map } from '../components/map';


const App = ({message}) => {
  return (
    <Map/>
  );
}
  
  // <span>{message}</span>
const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


