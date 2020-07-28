import React from 'react';
import socketIOClient from "socket.io-client";
import {HashRouter,Route} from 'react-router-dom';



import LoginRegister from './LoginRegister';
import MainPage from './chat/MainPage';




class  App extends React.Component {



    render(){    
        return (
          < >
          <MainPage />
            {/* <HashRouter> */}
              {/* <Route exact path='/' component={MainPage}/> */}
              {/* <Route exact path='/wellcome' component={LoginRegister} /> */}
            {/* </HashRouter> */}
          </>
        );
    }
}

export default App;
