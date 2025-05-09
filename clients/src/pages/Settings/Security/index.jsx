import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AcceptBtn from '../../../components/Button/acceptBtn';
import CancelBtn from '../../../components/Button/cancelBtn';
import SettingsHeading from '../../../components/Headers/heading';

const SecuritySettingsPage = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [show2FASetup, setShow2FASetup] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState('');

    const [activeSessions, setActiveSessions] = useState([
        { id: 1, device: 'iPhone 13', location: 'New York, US', lastActive: '2 hours ago', current: true },
        { id: 2, device: 'MacBook Pro', location: 'San Francisco, US', lastActive: '5 days ago', current: false },
        { id: 3, device: 'Windows PC', location: 'London, UK', lastActive: '3 weeks ago', current: false }
    ]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        setIsChangingPassword(true);
        setPasswordError('');

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setPasswordChanged(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => setPasswordChanged(false), 5000);
        } catch (error) {
            setPasswordError("Failed to change password. Please try again.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleEnable2FA = () => {
        setShow2FASetup(true);
    };

    const handleVerify2FA = (e) => {
        e.preventDefault();
        // Simulate verification
        setTimeout(() => {
            setTwoFactorEnabled(true);
            setShow2FASetup(false);
        }, 1000);
    };

    const revokeSession = (sessionId) => {
        setActiveSessions(activeSessions.filter(session => session.id !== sessionId));
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <SettingsHeading title='Security Settings' />

            {/* Password Change Section */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Password</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Change your account password
                        </p>
                    </div>
                    {passwordChanged && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                            Password updated
                        </span>
                    )}
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isChangingPassword}
                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ${isChangingPassword ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isChangingPassword ? 'Updating...' : 'Change Password'}
                    </button>
                </form>
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${twoFactorEnabled ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'}`}>
                            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <button
                            onClick={twoFactorEnabled ? () => setTwoFactorEnabled(false) : handleEnable2FA}
                            className="text-sm text-blue dark:text-golden hover:underline"
                        >
                            {twoFactorEnabled ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </div>

                {show2FASetup && (
                    <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg">
                        <h3 className="font-medium mb-3">Set Up Two-Factor Authentication</h3>
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-900">
                                {/* QR Code Placeholder */}
                                <div className="w-48 h-48 bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-3">
                                    <span className="text-neutral-400">QR Code</span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                                    Scan with authenticator app
                                </p>
                            </div>

                            <div className="flex-1">
                                <ol className="list-decimal list-inside space-y-2 text-sm mb-4">
                                    <li>Install an authenticator app like Google Authenticator or Authy</li>
                                    <li>Scan the QR code with your app</li>
                                    <li>Enter the 6-digit code generated by the app</li>
                                </ol>

                                <form onSubmit={handleVerify2FA} className="space-y-3">
                                    <div>
                                        <label htmlFor="twoFactorCode" className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                                            Verification Code
                                        </label>
                                        <input
                                            type="text"
                                            id="twoFactorCode"
                                            value={twoFactorCode}
                                            onChange={(e) => setTwoFactorCode(e.target.value)}
                                            placeholder="123456"
                                            className="w-full md:w-64 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <AcceptBtn title='Verify & Enable' aria-label="Verify & Enable prompt" />
                                        <CancelBtn title="Cancel" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Active Sessions Section */}
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    These are devices that are currently or were recently logged into your account
                </p>

                <div className="space-y-4">
                    {activeSessions.map((session) => (
                        <div key={session.id} className="flex justify-between items-center p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 flex bg-neutral-100 dark:bg-neutral-700 rounded-full">
                                    <ion-icon
                                        name={session.device.includes('iPhone') ? 'phone-portrait-outline' :
                                            session.device.includes('Mac') ? 'laptop-outline' : 'desktop-outline'}
                                        className="text-lg"
                                    ></ion-icon>
                                </div>
                                <div>
                                    <h3 className="font-medium">{session.device}</h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {session.location} · {session.lastActive}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {session.current && (
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                                        Current
                                    </span>
                                )}
                                {!session.current && (
                                    <button
                                        onClick={() => revokeSession(session.id)}
                                        className="text-sm text-red-600 dark:text-red-400 hover:underline"
                                    >
                                        Revoke
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettingsPage;