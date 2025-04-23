import { lazy } from 'react';

const Layout = lazy(() => import('../layout'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage'));
const EditBlog = lazy(() => import('../pages/Blog/EditBlog'));
const Signup = lazy(() => import('../pages/Signup'));
const WriterOnboarding = lazy(() => import('../pages/WriterOnboarding'));
const Login = lazy(() => import('../pages/Login'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const CreateBlog = lazy(() => import('../pages/Blog/CreateBlog'));
const Shorts = lazy(() => import('../pages/Shorts'));
const History = lazy(() => import('../pages/History'));
const SavedBlogs = lazy(() => import('../pages/SavedBlogs'));
const LikedBlogs = lazy(() => import('../pages/LikedBlogs'));
const NoPage = lazy(() => import('../pages/NoPage'));

const routes = [
    {
        path: '/',
        element: <Layout />,
        access: 'public',
        children: [
            { index: true, element: <Blog />, access: 'public' },
            { path: 'blog/:blogId', element: <BlogPage />, access: 'public' },
            { path: 'create-blog', element: <CreateBlog />, access: ['writer', 'admin'] },
            { path: 'edit_blog/:id', element: <EditBlog />, access: ['writer', 'admin'] },
            {
                path: 'register',
                element: <Signup />,
                access: (user) => !user
            },
            {
                path: 'writer-registration',
                element: <WriterOnboarding />,
                access: (user) => user && !['writer', 'admin'].includes(user.role)
            },
            {
                path: 'login',
                element: <Login />,
                access: (user) => !user
            },
            { path: 'reset-password', element: <ResetPassword />, access: 'public' },
            { path: 'shorts', element: <Shorts />, access: 'public' },
            { path: 'shorts/:shortId', element: <Shorts />, access: 'public' },
            { path: 'history', element: <History />, access: ['user', 'writer', 'admin'] },
            { path: 'saved', element: <SavedBlogs />, access: ['user', 'writer', 'admin'] },
            { path: 'likes', element: <LikedBlogs />, access: ['user', 'writer', 'admin'] },
            { path: '*', element: <NoPage />, access: 'public' }
        ]
    }
];

export default routes;