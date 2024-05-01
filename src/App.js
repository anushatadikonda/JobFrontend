import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Landing from './Components/Landing/Landing';
import Signup from './Components/Landing/Signup';
import Login from './Components/Landing/Login';
import Forgorpassword from './Components/Landing/Forgorpassword';
import Updatepassword from './Components/Landing/Updatepassword';
import Lannavbar from './Components/Landing/Lannavbar';
import Homepage from './Components/Landing/Homepage';
import Profile from './Components/Landing/Profile';
import Savedjobs from './Components/Landing/Savedjobs';
import Appliedjobs from './Components/Landing/Appliedjobs';
import Admin from './Components/Landing/Admin';
import Recruiter from './Components/Landing/Recruiter';
import JobResult from './Components/Landing/JobResult';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' Component={Landing}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/login' Component={Login}/>
            <Route path='/fpassword' Component={Forgorpassword}/>
            <Route path='/upassword' Component={Updatepassword}/>
            <Route path='/homepage' Component={Homepage}/>
            <Route path='/Lannavbar' Component={Lannavbar}/>
            <Route path='/profile' Component={Profile}/>
            <Route path='/savedjobs' Component={Savedjobs}/>
            <Route path='/appliedjobs' Component={Appliedjobs}/>

            <Route path='/admin_page' Component={Admin}/>
            <Route path='/recruiterpage' Component={Recruiter}/>
            <Route path='/jobresult' Component={JobResult}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
