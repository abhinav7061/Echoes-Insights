import styles from "../../style";
import { logo } from "../../assets";
import { footerLinks, socialMedia } from "../../constants";

const Footer = () => (
  <>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-[50px] sm:w-[100px] lg:w-[150px] aspect-square bg-sky-700 blur-3xl"></div>
          <div className="absolute w-[50px] sm:w-[100px] lg:w-[150px] aspect-square bg-purple-600 blur-3xl"></div>
          <img
            src={logo}
            alt="Mastery path"
            className="w-[100px] sm:w-[200px] lg:w-[300px] object-contain z-20"
          />
        </div>
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          Amwhiteplify Your Journey: Insights that Empower and Inspire
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-black dark:text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-slate-500 dark:text-dimWhite hover:text-sky-600 dark:hover:text-secondary cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="w-full flex justify-between items-center md:flex-row flex-col py-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-black dark:text-white">
        Copyright Ⓒ 2022 <span className="md-1 font-logoFont px-2 whitespace-nowrap">Echoes & Insights</span> All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              } fill-slate-700`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </>
);

export default Footer;
