import React, { useState } from 'react'

const WriterApplicationTab = () => {
    // Mock writer applications data - replace with real API calls
    const [writerApplications, setWriterApplications] = useState([
        {
            id: '1',
            userId: 'user123',
            userName: 'Alex Johnson',
            userEmail: 'alex@example.com',
            bio: 'Technical writer with 5 years of experience in JavaScript and React',
            topics: ['JavaScript', 'React', 'TypeScript'],
            sampleWorkLinks: [
                'https://example.com/blog1',
                'https://example.com/blog2'
            ],
            socialLinks: {
                twitter: '@alexjs',
                linkedin: 'linkedin.com/in/alexjs',
                github: 'github.com/alexjs'
            },
            reasonToWrite: 'I want to share my knowledge with the community',
            status: 'pending',
            acceptTerms: true,
            submittedAt: '2023-06-15T10:30:00Z',
            sampleBlog: {
                title: 'React Hooks Explained',
                content: '...sample blog content...'
            }
        },
        {
            id: '2',
            userId: 'user456',
            userName: 'Sarah Williams',
            userEmail: 'sarah@example.com',
            bio: 'Frontend developer passionate about CSS and design systems',
            topics: ['CSS', 'Design Systems', 'Accessibility'],
            sampleWorkLinks: [],
            socialLinks: {
                twitter: '@sarahcss',
                linkedin: 'linkedin.com/in/sarahcss',
                github: 'github.com/sarahcss'
            },
            reasonToWrite: 'I enjoy teaching others about CSS best practices',
            status: 'pending',
            acceptTerms: true,
            submittedAt: '2023-06-18T14:45:00Z',
            sampleBlog: {
                title: 'CSS Grid Layouts',
                content: '...sample blog content...'
            }
        }
    ]);

    // Approve writer application
    const approveApplication = (applicationId) => {
        setWriterApplications(prev => prev.map(app =>
            app.id === applicationId ? { ...app, status: 'approved' } : app
        ));
        // Here you would also make an API call to update the user's role to 'writer'
        console.log('Approved application:', applicationId);
    };

    // Reject writer application
    const rejectApplication = (applicationId) => {
        setWriterApplications(prev => prev.map(app =>
            app.id === applicationId ? { ...app, status: 'rejected' } : app
        ));
        console.log('Rejected application:', applicationId);
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Applications</p>
                    <p className="text-2xl font-semibold">{writerApplications.length}</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Pending Review</p>
                    <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                        {writerApplications.filter(app => app.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Approved Writers</p>
                    <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                        {writerApplications.filter(app => app.status === 'approved').length}
                    </p>
                </div>
            </div>

            {/* Applications List */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold">Writer Applications</h2>
                </div>

                <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {writerApplications.length === 0 ? (
                        <div className="p-6 text-center">
                            <p className="text-neutral-600 dark:text-neutral-400">No writer applications found</p>
                        </div>
                    ) : (
                        writerApplications.map(application => (
                            <div key={application.id} className="p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                                                <ion-icon name="person-outline" className="text-lg"></ion-icon>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{application.userName}</h3>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400">{application.userEmail}</p>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <p className="text-sm"><span className="font-medium">Topics:</span> {application.topics.join(', ')}</p>
                                            <p className="text-sm mt-1"><span className="font-medium">Reason:</span> {application.reasonToWrite}</p>
                                        </div>

                                        {application.sampleWorkLinks.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-sm font-medium">Sample Works:</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {application.sampleWorkLinks.map((link, index) => (
                                                        <a
                                                            key={index}
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                                        >
                                                            {new URL(link).hostname}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {application.sampleBlog && (
                                            <div className="mt-2">
                                                <button
                                                    onClick={() => navigate(`/admin/writer-application/${application.id}`)}
                                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    View Sample Blog: {application.sampleBlog.title}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                                        <span className={`px-2 py-1 text-xs rounded-full self-start ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                            application.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                            }`}>
                                            {application.status}
                                        </span>

                                        {application.status === 'pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => approveApplication(application.id)}
                                                    className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectApplication(application.id)}
                                                    className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default WriterApplicationTab