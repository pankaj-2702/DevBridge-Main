import { Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Projects from "./pages/project/Projects";
import Layout from "./components/common/Layout";
import PorjectDetails from "./pages/project/ProjectDetails"
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import UserProfile from "./pages/profile/UserProfile";
import CreateProject from "./pages/project/CreateProject";
import SubmitProposal from "./pages/proposal/SubmitProposal";
import MyProposals from "./pages/proposal/MyProposals";
import EditProject from "./pages/project/EditProject";
import EditProposal from "./pages/proposal/EditProposal";
import MyProjects from "./pages/project/MyProjects";
import ProjectProposals from "./pages/proposal/ProjectProposals";
import Contracts from "./pages/contract/Contracts";
import ContractDetails from "./pages/contract/ContractDetails";
import ContractChat from "./pages/contract/ContractChat";
import CreateReview from "./pages/review/CreateReview";
import Settings from "./pages/settings/Settings";
function App() {
   return (
        <Routes>

            <Route
    path="/users/:id"
    element={
        <ProtectedRoute>
            <Layout>
                <UserProfile/>
            </Layout>
        </ProtectedRoute>
    }
/>   
   


                <Route
    path="/settings"
    element={
    <ProtectedRoute> 
        <Layout> 
      <Settings />
      </Layout>
    </ProtectedRoute>  
    }
     />
  

             
             <Route
    path="/contracts/:id/review"
    element={
    <ProtectedRoute> 
        <Layout> 
      <CreateReview />
      </Layout>
    </ProtectedRoute>  
    }
     />

                  <Route
            path="/contracts/:id/chat"
         element={
          <ProtectedRoute>
            <Layout>
                <ContractChat />
            </Layout>
        </ProtectedRoute>
          }
            />
                   
                       <Route
                  path="/contracts/:id"
                    element={
                    <ProtectedRoute>
                <Layout>
              <ContractDetails />
                </Layout>
                    </ProtectedRoute>
               }
                />

                      <Route
                  path="/contracts"
                    element={
                    <ProtectedRoute>
                <Layout>
              <Contracts />
                </Layout>
                    </ProtectedRoute>
               }
                />

                     <Route
                  path="/projects/:id/proposals"
                    element={
                    <ProtectedRoute>
                <Layout>
              <ProjectProposals />
                </Layout>
                    </ProtectedRoute>
               }
                />


                     <Route
                  path="/my-projects"
                    element={
                    <ProtectedRoute>
                <Layout>
              <MyProjects />
                </Layout>
                    </ProtectedRoute>
               }
                />
                     <Route
                  path="/proposals/:id/edit"
                    element={
                    <ProtectedRoute>
                <Layout>
              <EditProposal />
                </Layout>
                    </ProtectedRoute>
               }
                />
               
                 <Route
                  path="/projects/:id/edit"
                    element={
                    <ProtectedRoute>
                <Layout>
              <EditProject />
                </Layout>
                    </ProtectedRoute>
               }
                /> 

                <Route
                  path="/projects/:id/proposal"
                    element={
                    <ProtectedRoute>
                <Layout>
              <SubmitProposal />
                </Layout>
                    </ProtectedRoute>
               }
                />

                  <Route path="/proposals" element={
                <ProtectedRoute>
                    <Layout>
                     <MyProposals/>
                    </Layout>
                    
                </ProtectedRoute>}
/> 

                <Route path="/projects/create" element={
                <ProtectedRoute>
                    <Layout>
                     <CreateProject/>
                    </Layout>
                    
                </ProtectedRoute>}
/> 

                   <Route path="/profile/editprofile" element={
                <ProtectedRoute>
                    <Layout>
                     <EditProfile/>
                    </Layout>
                    
                </ProtectedRoute>}
/> 
            <Route path="/dashboard"  element={
                <ProtectedRoute>
                    <Layout>
                     <Projects/>
                    </Layout>
                    
                </ProtectedRoute>}
/>             

        <Route path="/projects"  element={
                <ProtectedRoute>
                    <Layout>
                     <Projects/>
                    </Layout>
                    
                </ProtectedRoute>}
/>             
          <Route path="/profile" element={
                <ProtectedRoute>
                    <Layout>
                     <Profile/>
                    </Layout>
                    
                </ProtectedRoute>}
/> 
            <Route path="/projects/:id" element={
                <ProtectedRoute>
                     <PorjectDetails/>
                </ProtectedRoute>}
/>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App