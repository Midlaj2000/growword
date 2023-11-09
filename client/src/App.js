import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './component/HomePage'
import ViewAll from './component/ViewAll'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<HomePage/>} />
        <Route path='/viewAll' element={<ViewAll/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
