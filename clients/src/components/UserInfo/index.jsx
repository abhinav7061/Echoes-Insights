import React from 'react'
import { useUserAuthentication } from '../../context/userContext'
import { people01 } from '../../assets';
import useLogout from '../../hooks/useLogout';
import { cn } from '../../lib/utils';
import ProfileItem from './ProfileItem';
import UserRole from './UserRole';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const { user } = useUserAuthentication();
    console.log(user)
    const navigate = useNavigate();
    const { logout, loading } = useLogout();
    return (
        <div className='px-2 py-5'>
            <div className="flex items-center ss:items-end gap-2">
                <div className='flex-shrink-0 rounded-full relative'>
                    <div className='absolute -top-1 ss:top-0 left-0 ml-12 ss:ml-16 md:ml-24'>
                        <UserRole role='user' />
                    </div>
                    <img
                        src={user?.profilePicture || people01}
                        alt="User Avatar"
                        className="w-16 h-16 ss:w-24 ss:h-24 md:w-32 md:h-32 rounded-full overflow-hidden"
                    />
                </div>
                <div className='w-[calc(100%-8rem)]  h-16 flex flex-col justify-end ss:mb-4'>
                    <h2 className="text-lg font-semibold truncate w-full" title={user?.name}>{user?.name}</h2>
                    <p className="text-sm text-gray-500 mt-1 truncate w-full" title={user?.email}>{user?.email}</p>
                </div>
                <button title='Logout' className={cn("ml-auto ss:mb-6 p-2 text-2xl rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 flex xs:hidden",
                    loading && 'animate-spin'
                )} onClick={logout}>
                    <ion-icon name={loading ? "refresh-circle-outline" : "log-out-outline"}></ion-icon>
                </button>
            </div>
            <div className='grid xs:grid-cols-2 mt-10 gap-3 xs:gap-5'>
                {(user.role === 'admin' || user.role == 'writer') && <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    title="Bio"
                    value={user?.bio || 'No bio available'}
                />}

                {(user.role === 'admin' || user.role == 'writer') && <ProfileItem
                    icon={
                        <span className='flex h-6 w-6 text-xl'><ion-icon name="radio"></ion-icon></span>
                    }
                    title="View Your Channel"
                    value={`${user?.totalPost || 0} posts yet!`}
                    onClick={() => navigate(`/writer/${user?.id}`)}
                    className='cursor-pointer hover:dark:bg-neutral-700'
                />}

                <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    }
                    title="Current Streak"
                    value={user?.streak || 0}
                />

                {(user.role === 'admin' || user.role == 'writer') && <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                    title="Followers"
                    value={`${user?.followers?.length || 0} users`}
                />}

                <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                    title="Following"
                    value={`${user?.following?.length || 0} users`}
                />

                <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                    }
                    title="Interests"
                    value={user?.interests?.length > 0 ? user.interests.join(', ') : 'No interests available'}
                />

                <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    title="Time Read"
                    value={user?.minutesRead || 0}
                />


                <ProfileItem
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    title="Badges"
                    value={user?.badges?.length > 0 ? user.badges.join(', ') : 'No badges earned yet'}
                />
            </div>
        </div>
    )
}

export default UserInfo