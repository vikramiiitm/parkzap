import Home from './components/Home'
import CreateUser from './components/CreateUser';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
 

const App = () => (
      <BrowserRouter>
              <Routes>
                  <Route exact path='/' element={<Home/>} />
                  <Route exact path='/login' element={<CreateUser/>} />
              </Routes>
      </BrowserRouter>
);

export default App;