import React from 'react';
import Button from '.';
import { NavLink } from "react-router-dom";

const LoginBtn = () => {
    return (
        <NavLink to='/login'>
            <Button type='button' className={`px-5 py-1.5 text-xs xs:text-sm rounded-full md:py-2 md:text-[18px] before:inset-[1px]`} title={`Login`} />
        </NavLink>
    )
}

export default LoginBtn