import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, Landing, Register, Error} from "./pages";
import { AddJob, AllJobs, Profile, Stats, ShareLayout } from './pages/dashboard'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        
        {/* nested pages & homepage*/}
        <Route path="/" element={
            <ProtectedRoute>
                <ShareLayout /> 
            </ProtectedRoute>
            }>
            {/* homepage show stats */}
              <Route index element={<Stats/>}></Route>
              <Route path="all-jobs" element={<AllJobs/>}></Route>
              <Route path="add-job" element={<AddJob/>}></Route>
              <Route path="profile" element={<Profile/>}></Route>
        </Route>

        <Route path="/register" element={<Register />} />
        
        {/* landing page */}
        <Route path="/landing" element={<Landing />} />
        
        {/* error page */}
        <Route path="*" element={<Error />} />
      
      </Routes>
   </BrowserRouter>
  );
}

export default App;
