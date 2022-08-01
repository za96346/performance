import {BrowserRouter,Route,Routes,Link, useParams} from "react-router-dom";  

import Login from "./login";
import Backend from "./backend";
import session from "./method/storage";

import { article_bar_arr,admin_sidebar } from "./api";

import Error from "./error";
import { useEffect,useState } from "react";
import Word_preview from "./backend_component/word_preview";
import Blank from "./blank";


const Home=()=> {

  
  const [permession_state,set_permession_state]=useState(false)
  useEffect(()=>{
    var token = session.getItem('token')
    if(token){
      set_permession_state(true)
    }
    else(set_permession_state(false))
  },[])

  function select_router(){
    
    if(permession_state===true){
      var permession = session.getItem('permession')
      if(permession==="admin"){
          return(<>
            <Route exact={true} path="/backend/admin/:page"element={<Backend  access={'admin'}/>}/>
            <Route exact={true} path="/backend/admin/:page/:article_page"element={<Backend  access={'admin'}/>}/>
          </>)
      }
      else if(permession==="manager"){
        return(<>
          <Route exact={true} path="/backend/manager/:page/:article_page"element={<Backend access={'manager'}/>}/>
          <Route exact={true} path="/backend/manager/:page"element={<Backend access={'manager'}/>}/>
        </>)
      }
      else if(permession==="personal"){
        return(<Route exact={true} path="/backend/personal/:page"element={<Backend  access={'personal'}/>}/>)
      }
    }

  }
  
  return (
      <BrowserRouter basename="/">
      <Routes>
        <Route exact={true} path="/" element={<Login set_permession_state={set_permession_state}/>}/>
        <Route exact={true} path="/login" element={<Login set_permession_state={set_permession_state}/>}/>
        {
          select_router()
        }
        <Route exact={true} path="/blank" element={<Blank />}/>
        <Route exact={true} path="/backend/wordFile/:banch/:people/:year/:month"element={<Word_preview />}/>
        <Route exact={true} path="/access====>error" element={<Error/>}/>
        <Route exact={true} path="*" element={<Error/>}/>

      </Routes>

      </BrowserRouter>
  )
}

export default Home;
