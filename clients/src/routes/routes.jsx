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
const NoPage = lazy(() => import('../pages/NoPage'));

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Blog />, public: true },
            { path: 'blog/:blogId', element: <BlogPage />, public: true },
            { path: 'edit_blog/:id', element: <EditBlog />, roles: ['writer', 'admin'] },
            { path: 'register', element: <Signup />, public: true },
            { path: 'writer-registration', element: <WriterOnboarding />, public: true },
            { path: 'login', element: <Login />, public: true },
            { path: 'reset-password', element: <ResetPassword />, public: true },
            { path: 'create_blog', element: <CreateBlog />, roles: ['writer', 'admin'] },
            { path: 'shorts', element: <Shorts />, public: true },
            { path: 'shorts/:shortId', element: <Shorts />, public: true },
            { path: '*', element: <NoPage />, public: true }
        ]
    },
];

export default routes;