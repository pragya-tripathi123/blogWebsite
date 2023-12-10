import './App.css';
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';
import YourPostsPage from './Pages/YourPostsPage';
function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route path='/' element={<IndexPage/>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/create' element={<CreatePost></CreatePost>}></Route>
          <Route path='/post/:id' element={<PostPage></PostPage>}></Route>
          <Route path='/edit/:id' element={<EditPost></EditPost>}></Route>
          <Route path='/see/:id' element={<YourPostsPage></YourPostsPage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
