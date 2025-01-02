import React, { useState } from 'react';
import styles from '../../style';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../../assets';
import { useUserAuthentication } from '../../context/userContext';

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
    const { login, jwtToken } = useUserAuthentication();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        phone: "",
        gender: "",
    });

    function handleChange(evt) {
        const value = evt.target.value;
        setUser({
            ...user,
            [evt.target.name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser({
            name: "",
            email: "",
            password: "",
            cpassword: "",
            phone: "",
            gender: "",
        })
        console.log(user);
        const { name, email, password, phone, gender, cpassword } = user;
        try {
            const res = await fetch(`${apiUrl}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ name, email, password, cpassword, phone, gender }),
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                console.log("registered successfully");
                login(data.user, data.jwtToken);
                navigate("/login");
            } else {
                console.log("registeration Unsuccessfull");
            }
        } catch (error) {
            console.log("error occured while registering");
        }
    }
    return (
        <div className={`${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className={`flex md:flex-row flex-col-reverse border border-blue dark:border-golden mx-2 my-4 md:m-20 rounded-2xl overflow-hidden`}>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 p-16`}>
                        {/* div for registrarion form  */}
                        <div className="w-full flex flex-col items-center">
                            {/* Telluing about ourself and Registration  */}
                            <div className='mb-5'>
                                {/* <img className="h-[50px] w-[150px] mb-5" src={logo} alt="Your Company" /> */}
                                <h2 className="text-black dark:text-white font-bold text-3xl md:text-4xl mb-1">Register to account</h2>
                                <p className="text-[12px] md:text-sm text-neutral-600">Not a member? <a href="#" className="text-blue hover:underline dark:text-golden">Start a 14 day free trial</a></p>
                                <p className="text-[12px] md:text-sm text-neutral-600">Already have registered then click here <NavLink to='/login' className={`text-blue hover:underline dark:text-golden`}>Login</NavLink> </p>
                            </div>
                            {/* form div start here */}
                            <div className="w-full md:w-[80%]">
                                {/* Registration input form  */}
                                <form onSubmit={handleSubmit} method='POST'>
                                    {/* div for taking name */}
                                    <div className='mb-2'>
                                        <label htmlFor="name" className="text-sm font-bold dark:text-white text-black ">Name:</label>
                                        <div className="lb">
                                            <input id="name" name="name" type="text" autoComplete="off" placeholder="Enter your name"
                                                required className="rounded-lg border border-blue dark:border-golden w-full py-2 px-3 mt-1 bg-transparent outline-none dark:text-white" value={user.name} onChange={handleChange} />
                                        </div>
                                    </div>
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
                                    {/* div for taking Password again for the confirmation purpose */}
                                    <div>
                                        <label htmlFor="cpassword" className="text-sm font-bold dark:text-white text-black">Confirm Password:</label>
                                        <div className="lb">
                                            <input id="cpassword" name="cpassword" type="password" placeholder="Enter  password again"
                                                autoComplete="current-password" required
                                                className="rounded-lg border border-blue dark:border-golden w-full py-2 px-3 mt-1 bg-transparent outline-none dark:text-white" value={user.cpassword} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* div for taking phone */}
                                    <div>
                                        <label htmlFor="phone" className="text-sm font-bold dark:text-white text-black">Phone:</label>
                                        <div className="lb">
                                            <input id="phone" name="phone" type="tel" placeholder="Enter phone number"
                                                autoComplete="off" required
                                                className="rounded-lg border border-blue dark:border-golden w-full py-2 px-3 mt-1 bg-transparent outline-none dark:text-white" value={user.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* div for taking gender */}
                                    <div className='flex mt-3'>
                                        <label htmlFor="gender" className="text-sm font-bold dark:text-white text-black">Gender:</label>
                                        <div className='flex ml-10'>
                                            <input id="male" name="gender" type="radio" placeholder="Enter password" required className="mr-2" value='Male' checked={user.gender === 'Male'} onChange={handleChange} />
                                            <label htmlFor="male" className="text-sm font-bold dark:text-white text-black">Male</label>
                                        </div>
                                        <div className='flex ml-10'>
                                            <input id="female" name="gender" type="radio" placeholder="Enter password"
                                                required className="mr-2" value='Female' checked={user.gender === 'Female'} onChange={handleChange} />
                                            <label htmlFor="female" className="text-sm font-bold dark:text-white text-black">Female</label>
                                        </div>
                                        <div className='flex ml-10'>
                                            <input id="other" name="gender" type="radio" placeholder="Enter password"
                                                required className="mr-2" value='Other' checked={user.gender === 'Other'} onChange={handleChange} />
                                            <label htmlFor="other" className="text-sm font-bold dark:text-white text-black">Other</label>
                                        </div>
                                    </div>
                                    {/* Submit Button */}
                                    <div className='my-6'>
                                        <Button className={`w-full py-2 sm:py-3 px-4 rounded-lg font-bold`} title={'Register'} type={'submit'} />
                                        {/* <input type="submit" value='Submit' /> */}
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
                            src={register}
                            alt="" />
                        <div className="absolute w-[80%] h-[80%] flex items-center justify-center top-40 left-8">
                            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
                            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
