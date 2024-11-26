import React from 'react'
import styles from "../../style";
import Button from '../../components/Button';
import { format } from "date-fns";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const BlogItem = ({ data }) => {
    const title = data.title;
    const inputDate = new Date(data.createdAt);
    const formattedDate = format(inputDate, 'MMM dd, yyyy');
    const author = data.author.name;
    const summary = data.summary;
    const id = data._id
    const cover = data.cover
    return (
        <>
            <div className={`flex flex-col overflow-hidden rounded-xl border dark:border-slate-800`} key={id}>
                <img src={cover?.url} alt="star" className="object-cover w-full aspect-[2/1] xs:aspect-[3/2] border-b dark:border-gray-700" />
                <div className="flex flex-col flex-grow p-4 bg-white dark:bg-transparent feature-card dark:feature-card">
                    <h4 className="font-poppins  font-semibold text-black dark:text-white mb-1 text-sm sm:text-xl md:text-2xl line-clamp-1">
                        {title}
                    </h4>
                    <div className='flex justify-between text-slate-500 dark:text-slate-500 font-bold mb-0 md:mb-1'>
                        <div className={`${styles.smHeading} flex items-center`}><ion-icon name="calendar"></ion-icon><span className='ml-1 line-clamp-1'>{formattedDate}</span></div>
                        <div className={`${styles.smHeading} flex items-center`}><ion-icon name="folder-open"></ion-icon><span className='ml-1 line-clamp-1'>Category</span></div>
                        <div className={`${styles.smHeading} flex items-center`}><ion-icon name="person"></ion-icon><span className='ml-1 line-clamp-1'>{author}</span></div>
                    </div>
                    <div className='py-2'>
                        <p className="font-poppins font-normal text-slate-900 dark:text-slate-100 text-[10px] md:text-[16px] line-clamp-2">
                            {summary}
                        </p>
                    </div>
                    <div className='mt-2 flex justify-between items-center'>
                        <Link to={`/blog/${id}`}>
                            <Button className={'px-3 py-1 text-[9px] md:text-[14px] font-light'} title={'Read More >>>'} />
                        </Link>
                        <span className='flex items-center gap-1 dark:text-gray-300'><ion-icon name="eye-outline"></ion-icon> {Math.floor(Math.random() * (100 - 40 + 1)) + 40} views</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogItem