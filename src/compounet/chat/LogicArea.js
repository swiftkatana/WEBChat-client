import React from 'react'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client' 
import history from '../../history';

const ENDPOINT = "http://84.108.78.137:1029";

class LogicArea extends React.Component{
    
    state={
        io:socketIOClient(ENDPOINT)
    }
    componentDidMount(){


    }
    componentDidUpdate(){
console.log(history.location())
    }

       renderNewFrindsReq=()=>{
        if(!this.props.isLogin||!this.props.user) return null    
        
        this.state.io.on('frindsnew'+this.props.user._id,(data)=>{
          alert(' new frind req')
        
        })
    }

    render() {
        return (
            <>
                
            </>
        )
    }
}


export default connect(null,{})(LogicArea);