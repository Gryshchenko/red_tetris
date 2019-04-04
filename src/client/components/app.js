import React from 'react'
import { connect } from 'react-redux'
import { Map } from './map';


const App = ({message}) => {
  return (
    <Map/>
  );
}
  
const mapStateToProps = (state) => {
  return {
    message: state.message,
  }
}
export default connect(mapStateToProps, null)(App)


