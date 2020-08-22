import React from 'react';
import './App.css';
import SideBar from './Components/sidebar';
import Chat from './Components/chat';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Components/login';
import { useStateValue } from './Components/stateprovider';
const App = ()=>{
  const [{user},dispatch] = useStateValue()
  return(
    
    <div className="app">

    { !user ? (
      <Login />
    )
    :
     ( <div className="app__body">
         <BrowserRouter>
         <SideBar />
           <Switch>
             <Route  path="/rooms/:roomId">
                <Chat />
             </Route>
             <Route exact path="/">
                 <Chat />
             </Route>
           </Switch>
         </BrowserRouter>
      </div>)}
    </div>
  )
}

export default App;
