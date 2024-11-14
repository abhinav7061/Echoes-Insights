import { UserContext, Layout, Login, Signup, ResetPassword, Blog, CreateBlog, BlogPage, EditBlog, NoPage } from './modules';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<UserContext>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Blog />} />
						<Route path='/blog/:id' element={<BlogPage />} />
						<Route path='/edit_blog/:id' element={<EditBlog />} />
						<Route path="/register" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route path="/create_blog" element={<CreateBlog />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</UserContext>
		</>
	)
}

export default App
