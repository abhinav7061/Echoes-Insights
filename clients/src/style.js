const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",

    heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-black  dark:text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    heading3: " underline mb-2 text-2xl sm:text-4xl md:text-5xl",
    smHeading: "text-[7px] md:text-[9px] lg:text-[11px] font-serif",
    paragraph: "font-poppins font-normal text-neutral-700 dark:text-neutral-200 text-[18px] leading-[30.8px]",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "px-2.5 xs:px-5 sm:px-8 md:px-12",
    paddingY: "sm:py-8 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",

    marginX: "mx-2.5 xs:mx-5 sm:mx-8 md:mx-12",
    marginY: "sm:my-16 my-6",
};

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

    sectionInfo: `${styles.flexStart} flex-col`,
};

export const color = {
    textBlackWhite: "text-black dark:text-white",
    textSlate: "text-neutral-600 dark:text-neutral-400",
}

export default styles;
