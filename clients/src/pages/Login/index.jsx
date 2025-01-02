import { useState } from 'react';
import styles from '../../style';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import { toast } from 'sonner';
import { login } from '../../assets';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const { login: loginUser, jwtToken } = useUserAuthentication();
    const [message, setMessage] = useState({
        error: true,
        msg: '',
    });
    const [user, setUser] = useState({
        email: '',
        password: '',
        remember_me: false, //if it is set to true then remember options will auto checked
    })
    const handleChange = (e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, remember_me } = user;
        try {
            const res = await fetch(`${apiUrl}/user/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ email, password, remember_me }),
                credentials: "include",
            })
            const data = await res.json();
            if (res.ok && data.success) {
                setMessage({
                    error: false,
                    msg: data.message,
                });
                console.log(data)
                loginUser(data.user, data.jwtToken);
                toast.success(data.message);
                navigate("/");
                setMessage("");
            } else {
                setMessage({
                    error: true,
                    msg: data.message,
                });
                toast.error(data.message);
                setTimeout(() => {
                    setMessage("")
                }, 1000)
            }
        } catch (error) {
            console.log("err occoured while login");
        }
    }

    return (
        <div className={`${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className={`flex md:flex-row flex-col-reverse border border-blue dark:border-golden mx-2 my-4 md:m-20 rounded-2xl overflow-hidden`}>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 p-16`}>
                        {/* div for registrarion form  */}
                        <div className="w-full flex flex-col items-center">
                            {/* Telling about ourself and Registration  */}
                            <div className='mb-5'>
                                {/* <img className="h-[50px] w-[150px] mb-5" src={logo} alt="Your Company" /> */}
                                <h2 className="text-black dark:text-white font-bold text-3xl md:text-4xl mb-1">Sign in to account</h2>
                                <p className="text-[12px] md:text-sm text-neutral-600">Not a member? <a href="#" className="text-blue hover:underline dark:text-golden">Start a 14 day free trial</a></p>
                                <p className="text-[12px] md:text-sm text-neutral-600">Donot have account then click here <NavLink to='/register' className={`text-blue hover:underline dark:text-golden`}>Signup</NavLink> </p>
                                {!(message.msg === "") && <div className={`${message.error ? 'text-red-600' : 'text-green-600'} text-lg`}>{message.msg} </div>}
                            </div>
                            {/* form div start here */}
                            <div className="w-full md:w-[80%]">
                                {/* Registration input form  */}
                                <form method="POST" onSubmit={handleSubmit}>
                                    {/* div for taking email */}
                                    <div className='mb-2'>
                                        <label htmlFor="email" className="text-sm font-bold dark:text-white text-black ">Email address:</label>
                                        <div className="lb">
                                            <input id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email address"
                                                required className="rounded-lg border border-blue dark:border-golden w-full py-2 px-3 mt-1 bg-transparent outline-none dark:text-white" value={user.email} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* div for taking Password */}
                                    <div>
                                        <label htmlFor="password" className="text-sm font-bold dark:text-white text-black">Password:</label>
                                        <div className="lb">
                                            <input id="password" name="password" type="password" placeholder="Enter password"
                                                autoComplete="current-password" required
                                                className="rounded-lg border border-blue dark:border-golden w-full py-2 px-3 mt-1 bg-transparent outline-none dark:text-white" value={user.password} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* div for remember and password forgot option */}
                                    <div className="flex w-full justify-between py-2 my-2 text-neutral-800 text-sm dark:text-neutral-300">
                                        <label htmlFor="remember_me" className="dark:hover:text-golden hover:text-blue cursor-pointer">
                                            <input id="remember_me" name="remember_me" type="checkbox" className="mr-2" checked={user.remember_me} onChange={handleChange} />
                                            Remember me
                                        </label>
                                        <NavLink to='/forgot-password' className="dark:hover:text-golden hover:text-blue hover:underline">Forgot password?</NavLink>
                                    </div>
                                    {/* Submit Button */}
                                    <div className='my-6' >
                                        <Button className={`w-full py-2 sm:py-3 px-4 rounded-lg font-bold`} title={'Login'} type='submit' />
                                    </div>
                                </form>
                                {/* for other authentication method like github linkdin etc */}
                                <div className="mt-10">
                                    <div className="flex relative items-center justify-center">
                                        <div className="h-0 w-full border border-neutral-400 dark:border-neutral-700 absolute" aria-hidden="true">
                                        </div>
                                        <div className="absolute">
                                            <span className="dark:bg-primary bg-neutral-50 p-3 dark:text-golden">Or continue with</span>
                                        </div>
                                    </div>
                                    <div className="flex mt-10 w-full justify-between">
                                        <Button
                                            icon={<ion-icon name="logo-twitter"></ion-icon>}
                                            title='Twitter'
                                            className='py-2 px-5 rounded-lg text-sm sm:text-base font-bold'
                                        />
                                        <Button
                                            icon={<ion-icon name="logo-github"></ion-icon>}
                                            title='GitHub'
                                            className='py-2 px-5 rounded-lg text-sm sm:text-base font-bold'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex-1 flex ${styles.flexCenter} relative hidden md:block`}>
                        <img className="w-[100%] h-[100%] relative z-[5]"
                            src={login}
                            alt="" />
                        {/* gradient start */}

                        <div className="absolute w-[80%] h-[80%] flex items-center justify-center top-40 left-8">
                            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
                            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
                        </div>
                        {/* gradient end */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login