import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

const Main = ({message}) => {
    return (
        <section className='main'>
            {/* <form className='form' onSubmit={(e) => {
                e.preventDefault()
                const hostName = document.getElementById('name').value
                const roomName = document.getElementById('roomName').value

                if (hostName !== '' && roomName !== '') {
                    router.router.push(`#${roomName}[${hostName}]`)
                }
            }}>
                <legend className='legend'>join</legend>
                <input className='input' type='text' id='name' placeholder='Name'/>
                <input className='input' type='text' id='roomName' placeholder='Room Name'/>
                <button className='button'type='submit'>Start</button>
            </form> */}

            <form className='form' onSubmit={(e) => {
                e.preventDefault()
                const hostName = document.getElementById('name').value
                const roomName = document.getElementById('roomName').value

                if (hostName !== '' && roomName !== '') {
                    router.router.push(`#${roomName}[${hostName}]`)
                }
            }}>
                <legend className='legend'>Create your game</legend>
                <input className='input' type='text' id='name' placeholder='Name'/>
                <input className='input' type='text' id='roomName' placeholder='Room Name'/>
                <button className='button'type='submit'>Start</button>
            </form>
        </section>
    );
}
  
const mapStateToProps = (state) => {
  return {
    message: state.message,
  }
}
export default connect(mapStateToProps, null)(Main);

