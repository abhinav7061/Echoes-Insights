import { lazy } from 'react';

import Layout from '../layout';
const Blog = lazy(() => import('../pages/Blog'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage'));
const EditBlog = lazy(() => import('../pages/Blog/EditBlog'));
const Signup = lazy(() => import('../pages/Signup'));
const SignupStep1 = lazy(() => import("../pages/Signup/SignupStep1"));
const SignupStep2 = lazy(() => import("../pages/Signup/SignupStep2"));
const SignupStep3 = lazy(() => import("../pages/Signup/SignupStep3"));
const WriterOnboarding = lazy(() => import('../pages/WriterOnboarding'));
const Login = lazy(() => import('../pages/Login'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const CreateBlog = lazy(() => import('../pages/Blog/CreateBlog'));
const Shorts = lazy(() => import('../pages/Shorts'));
const History = lazy(() => import('../pages/History'));
const SavedBlogs = lazy(() => import('../pages/SavedBlogs'));
const LikedBlogs = lazy(() => import('../pages/LikedBlogs'));
const Space = lazy(() => import('../pages/Space'));
const NoPage = lazy(() => import('../pages/NoPage'));
const Settings = lazy(() => import('../pages/Settings'));
const About = lazy(() => import('../pages/About'));
const Support = lazy(() => import('../pages/Settings/Support'));
const SettingsLayout = lazy(() => import('../layout/SettingsLayout'));
const Security = lazy(() => import('../pages/Settings/Security'));
const Notification = lazy(() => import('../pages/Settings/Notification'));
const Profile = lazy(() => import('../pages/Settings/Profile'));
const ChannelSettings = lazy(() => import('../pages/Settings/ChannelSettings'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Admin = lazy(() => import('../pages/Admin'));
const UserGrowth = lazy(() => import('../pages/Admin/UserGrowth'));
const ContentPerformance = lazy(() => import('../pages/Admin/ContentPerformance'));
const EngagementMetrics = lazy(() => import('../pages/Admin/EngagementMetrics'));
const ExportData = lazy(() => import('../pages/Admin/ExportData'));
const ContentReview = lazy(() => import('../pages/Admin/ContentReview'));
const FlaggedComments = lazy(() => import('../pages/Admin/FlaggedComments'));
const BulkActions = lazy(() => import('../pages/Admin/BulkActions'));
const WriterChannelPage = lazy(() => import('../pages/WriterChannel'));
const WriterHomeTab = lazy(() => import('../pages/WriterChannel/WriterHome'));
const WriterArticlesTab = lazy(() => import('../pages/WriterChannel/WriterArticles'));
const WriterAboutTab = lazy(() => import('../pages/WriterChannel/WriterAbout'));
const WriterLibraryPage = lazy(() => import('../pages/WriterChannel/WriterLibrary'));
const WriterAnalyticsPage = lazy(() => import('../pages/Analytics'));
const Privacy = lazy(() => import('../pages/Privacy'));

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
                path: "onboard",
                element: <Signup />,
                access: "public",
                children: [
                    { index: true, element: <SignupStep1 />, access: (user) => !user },
                    {
                        path: "complete-profile",
                        element: <SignupStep2 />,
                        access: (user) => user && (!user?.interests || user?.interests?.length === 0),
                    },
                    {
                        path: "term-condition-check",
                        element: <SignupStep3 />,
                        access: (user) => user && !user?.termsAccepted,
                    },
                ],
            },
            { path: 'writer-onboarding', element: <WriterOnboarding />, access: ['user'] },
            { path: 'login', element: <Login />, access: (user) => !user },
            { path: 'reset-password', element: <ResetPassword />, access: 'public' },
            { path: 'shorts', element: <Shorts />, access: 'public' },
            { path: 'shorts/:shortId', element: <Shorts />, access: 'public' },
            { path: 'history', element: <History />, access: ['user', 'writer', 'admin'] },
            { path: 'saved', element: <SavedBlogs />, access: ['user', 'writer', 'admin'] },
            { path: 'likes', element: <LikedBlogs />, access: ['user', 'writer', 'admin'] },
            { path: 'space', element: <Space />, access: ['user', 'writer', 'admin'] },
            {
                path: 'settings',
                element: <SettingsLayout />,
                access: 'public',
                children: [
                    { index: true, element: <Settings />, access: 'public', },
                    { path: 'security', element: <Security />, access: 'public', },
                    { path: 'notifications', element: <Notification />, access: 'public' },
                    { path: 'profile', element: <Profile />, access: 'public' },
                    { path: 'channel', element: <ChannelSettings />, access: ['admin', 'writer'] },
                ]
            },
            { path: 'dashboard', element: <Dashboard />, access: ['writer', 'admin'] },
            {
                path: 'admin',
                element: <SettingsLayout />,
                access: ['admin'],
                children: [
                    { index: true, element: <Admin />, access: ['admin'], },
                    { path: 'user-growth', element: <UserGrowth />, access: ['admin'], },
                    { path: 'content-performance', element: <ContentPerformance />, access: ['admin'] },
                    { path: 'engagement-metrics', element: <EngagementMetrics />, access: ['admin'] },
                    { path: 'export-data', element: <ExportData />, access: ['admin'] },
                    { path: 'content-review', element: <ContentReview />, access: ['admin'] },
                    { path: 'flagged-comments', element: <FlaggedComments />, access: ['admin'] },
                    { path: 'bulk-actions', element: <BulkActions />, access: ['admin'] },
                ]
            },
            { path: 'about', element: <About />, access: 'public' },
            { path: 'support', element: <Support />, access: 'public' },
            { path: 'privacy', element: <Privacy />, access: 'public' },
            { path: 'schedule', element: <Schedule />, access: ['writer', 'admin'] },
            {
                path: '/writer/:writerId',
                element: <WriterChannelPage />,
                access: 'public',
                children: [
                    { index: true, element: <WriterHomeTab />, access: 'public' },
                    { path: 'articles', element: <WriterArticlesTab />, access: 'public' },
                    // { path: 'videos', element: <WriterVideosTab /> },
                    // { path: 'podcasts', element: <WriterPodcastsTab /> },
                    { path: 'libraries', element: <WriterLibraryPage />, access: 'public' },
                    { path: 'about', element: <WriterAboutTab />, access: 'public' },
                    // { path: 'analytics', element: <WriterAnalyticsTab /> }
                ]
            },
            { path: 'analytics', element: <WriterAnalyticsPage />, access: ['writer', 'admin'] },
            { path: '*', element: <NoPage />, access: 'public' }
        ]
    }
];

export default routes;