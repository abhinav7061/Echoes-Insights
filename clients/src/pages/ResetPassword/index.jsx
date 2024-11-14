import { useState } from 'react';
import styles from '../../style';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '../../assets';

const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({
        error: true,
        msg: ''
    });
    const [user, setUser] = useState({
        email: '',
        new_password: '',
    })
    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, new_password } = user;
        console.log(user);
        try {
            const res = await fetch(`${apiUrl}/user/forgot-password`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email, new_password }),
                credentials: "include",
            })
            const data = await res.json();
            if (res.ok && data.success) {
                setMessage({
                    error: false,
                    msg: data.message,
                });
                toast.success(data.message);
                navigate("/login");
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
            console.log("err occoured while reset password");
        }
    }

    return (
        <div className={`flex md:flex-row flex-col-reverse border border-sky-400 mx-2 md:m-20 rounded-2xl overflow-hidden`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 p-16`}>
                {/* div for registrarion form  */}
                <div className="w-full flex flex-col items-center">
                    {/* Telling about ourself and Registration  */}
                    <div className='mb-5'>
                        <h2 className="text-black dark:text-white font-bold text-3xl md:text-4xl mb-1">Reset Password</h2>
                        <p className="text-[12px] md:text-sm text-slate-600">Password remembered? <NavLink to='/login' className="text-sky-700">Login</NavLink></p>
                        <p className="text-[12px] md:text-sm text-slate-600">Donot have account then click here <NavLink to='/register' className={`text-sky-600`}>Signup</NavLink> </p>
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
                                        required className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1" value={user.email} onChange={handleChange} />
                                </div>
                            </div>
                            {/* div for taking Password */}
                            <div>
                                <label htmlFor="new_password" className="text-sm font-bold dark:text-white text-black">New Password:</label>
                                <div className="lb">
                                    <input id="new_password" name="new_password" type="password" placeholder="Enter new password"
                                        autoComplete="current-password" required
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1" value={user.password} onChange={handleChange} />
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className='my-6' >
                                <Button className={`w-full py-1`} title={'Reset Password'} />
                            </div>
                        </form>
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
    )
}

export default ResetPassword