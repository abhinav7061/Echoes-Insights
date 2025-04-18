import styles from "../../style";
import { logo } from "../../assets";
import { footerLinks, socialMedia } from "../../constants";

const Footer = () => (
  <>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex flex-col justify-center w-full xs:w-auto xs:justify-start xs:mr-20">
        <div className="relative flex items-center justify-center w-full">
          <img
            src={logo}
            alt="Mastery path"
            className="w-[100px] sm:w-[200px] lg:w-[300px] object-contain z-20"
          />
        </div>
        <p className={`${styles.paragraph} mt-4 w-full xs:max-w-[312px]`}>
          Amwhiteplify Your Journey: Insights that Empower and Inspire
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-blue dark:text-golden">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-neutral-700 dark:text-neutral-200 hover:text-blue dark:hover:text-golden cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
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
        Copyright Ⓒ 2022-{new Date().getFullYear()} <span className="md-1 font-logoFont px-2 whitespace-nowrap">Echoes & Insights</span> All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6 gap-3">
        {socialMedia.map(({ id, link, Icon }) => (
          <a key={id} href={link} target="_blank" className="dark:text-neutral-800 rounded-md overflow-hidden border dark:border-neutral-700">
            <Icon size={30} bgStyle={{ fill: "currentcolor" }} />
          </a>
        ))}
      </div>
    </div>
  </>
);

export default Footer;
