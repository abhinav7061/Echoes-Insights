import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import Button from '../Button';
import { toast } from 'sonner';

const baseUrl = import.meta.env.VITE_API_URL;

const OAuth = () => {
    const [loading, setLoading] = useState({ google: false, microsoft: false });
    const navigate = useNavigate();
    const { login } = useUserAuthentication();

    const handleOAuth = async (provider) => {
        try {
            setLoading((prev) => ({ ...prev, [provider]: true }));
            // Opening OAuth popup
            const oauthWindow = window.open(
                `${baseUrl}/auth/${provider}`,
                "_blank",
                "width=500,height=600"
            );
            if (!oauthWindow) {
                toast.error("Popup blocked! Please allow popups for this site.");
                setLoading({ google: false, microsoft: false });
                return;
            }

            let popupClosedByApp = false;

            // Listen for message from the OAuth popup
            const handleMessage = async (event) => {
                if (event.data.type == "OAUTH_SUCCESS") {
                    if (`${event.origin}/api/v1` != baseUrl) return;
                    const { user, token } = event.data;
                    oauthWindow.close();
                    popupClosedByApp = true;
                    login(user, token);
                    toast.success(`Welcome ${user.name}!`);
                    if (!user?.interests || user?.interests?.length === 0) {
                        return navigate("/onboard/complete-profile");
                    } else if (!user.termsAccepted) {
                        return navigate("/onboard/term-condition-check");
                    } else navigate("/");
                }

                if (event.data.type == "OAUTH_FAIL") {
                    console.error(`${provider} auth failed:`, event.data.error || event.data.message);
                    toast.error(`Authentication failed: ${event.data.message || 'An error occurred'}`);
                    oauthWindow.close();
                    popupClosedByApp = true;
                }
            };

            const timer = setInterval(() => {
                if (oauthWindow.closed) {
                    clearInterval(timer);
                    setLoading({ google: false, microsoft: false });
                    if (!popupClosedByApp) {
                        toast.error("Authentication popup has been closed.");
                    }
                }
            }, 500);

            window.addEventListener("message", handleMessage);
        } catch (error) {
            console.error(`${provider} auth error:`, error);
        }
    };

    return (
        <div className="mt-10">
            <div className="flex relative items-center justify-center">
                <div className="h-0 w-full border border-neutral-400 dark:border-neutral-700 absolute" aria-hidden="true" />
                <div className="absolute">
                    <span className="dark:bg-neutral-950 bg-neutral-50 p-3 dark:text-golden">Or continue with</span>
                </div>
            </div>
            <div className="flex mt-10 w-full justify-between gap-3">
                <Button
                    icon={<ion-icon name="logo-google"></ion-icon>}
                    title={loading.google ? 'Processing...' : 'Google'}
                    className='py-2 px-5 rounded-lg text-sm sm:text-base font-bold w-full'
                    onClick={() => handleOAuth('google')}
                    disabled={loading.google}
                />
                <Button
                    icon={<ion-icon name="logo-microsoft"></ion-icon>}
                    title={loading.microsoft ? 'Processing...' : 'Microsoft'}
                    className='py-2 px-5 rounded-lg text-sm sm:text-base font-bold w-full'
                    onClick={() => handleOAuth('microsoft')}
                    disabled={loading.microsoft}
                />
            </div>
        </div>
    );
};

export default OAuth