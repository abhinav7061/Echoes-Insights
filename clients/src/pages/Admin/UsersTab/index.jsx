import React, { useState } from 'react'

const UsersTab = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - replace with real API calls
    const users = [
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', status: 'active', joined: '2023-01-15' },
        { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', role: 'writer', status: 'active', joined: '2023-02-20' },
        { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'writer', status: 'pending', joined: '2023-03-10' },
        { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'user', status: 'active', joined: '2023-03-25' },
        { id: 5, name: 'James Wilson', email: 'james@example.com', role: 'user', status: 'suspended', joined: '2023-04-05' },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const changeUserRole = (userId, newRole) => {
        // Implement role change logic
        console.log(`Changing user ${userId} to ${newRole}`);
    };
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-semibold">Manage Users</h2>
                <div className="relative w-full sm:w-64 flex items-center">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-800 rounded-lg dark:bg-neutral-800 dark:text-white outline-none"
                    />
                    <span className="absolute left-3 text-neutral-400 flex"><ion-icon name="search-outline"></ion-icon></span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <thead className="bg-neutral-100 dark:bg-neutral-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Joined</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-neutral-50 dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                                            <ion-icon name="person-outline" className="text-lg"></ion-icon>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-neutral-900 dark:text-white">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                                        className={`text-sm rounded-md cursor-pointer border border-neutral-300 dark:border-neutral-600 px-2 py-1 ${user.role === 'admin' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200' : user.role === 'writer' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' : 'bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'}`}
                                    >
                                        <option value="user">User</option>
                                        <option value="writer">Writer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : user.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">{user.joined}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">
                                        Edit
                                    </button>
                                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                                        {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersTab