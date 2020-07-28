import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';



import ChatWindow from './ChatWindow';
import LoginRegister from '../LoginRegister';
const ENDPOINT = "http://84.108.78.137:1029";

class MainPage extends React.Component{

    renderLo_Re_Chat=()=>{
            if(this.props.user) return     <ChatWindow ENDPOINT={ENDPOINT} user={this.props.user} />
            else return <LoginRegister />

    }
    render(){

        return(
            <div id='container'>
                <Row>
                    <Col sm={2} >
                    </Col>
                    <Col>
                        {this.renderLo_Re_Chat()}

                    </Col>
                </Row>
            
            </div>
        )

    }

}
    const mapStateToProps = (state) => ({
        
        user:state.user
        
    })
    
    

export default connect(mapStateToProps,{})(MainPage);