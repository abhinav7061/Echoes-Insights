import useDarkMode from '../../hooks/useDarkMode';
import { cn } from '../../lib/utils';

const LogoLoader = ({ size = 30, className, ...rest }) => {
    const isDarkMode = useDarkMode();
    const color = isDarkMode ? "#ffdb70" : "#1075fa";

    return (
        <div className={cn("flex justify-center items-center h-full", className)} {...rest}>
            <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
                <style>{`
                    .outline {
                      stroke-dasharray: 300;
                      stroke-dashoffset: 300;
                      animation: draw 2s infinite ease-in-out;
                    }
                    .symbol {
                      opacity: 0;
                      animation: fade 2s infinite ease-in-out;
                    }
                    @keyframes draw {
                      0% { stroke-dashoffset: 300; }
                    //   50% { stroke-dashoffset: 0; }
                    //   100% { stroke-dashoffset: 300; }
                        100% { stroke-dashoffset: 0; }
                    }
                    @keyframes fade {
                      0%, 30% { opacity: 0; }
                      50%, 100% { opacity: 1; }
                    //   100% { opacity: 0; }
                    }
                `}
                </style>
                <g clipPath="url(#clip0_8_17)">
                    <path
                        className="outline"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.11847 0.518156C2.06742 0.345808 1.32539 1.01841 0.99998 1.49999C0.654271 2.01161 0.499998 2.99999 0.499998 2.99999C0.500006 6.31945 0.499993 7.18054 0.500002 10.5V17.5C0.500002 17.5 -1.84774e-06 26.5 0.999999 28C2 29.5 2 29 2 29C2 29 2.57876 29.3851 3 29.5C3.56514 29.6541 4.5 29.5 4.5 29.5L21.4648 24.9724C24.1126 24.1883 26.8946 25.6991 27.6787 28.3468L28.0234 29.5106C28.0234 29.5106 28.7075 28.9644 29 28.5C29.3074 28.012 29.5 27.1103 29.5 27.1103C29.5 27.1103 30 3.99998 29.5 2.99999C29 1.99999 28.8637 1.999 28.5 1.49999C28.0853 0.931039 24.5 -0.500018 27 0.499991C29.5 1.5 27 0.5 25.5 0.499986C24 0.499972 8.67604 5.05272 8.67604 5.05272C6.02829 5.83685 3.49998 4.49999 2.46206 1.67834L2.11847 0.518156ZM18.0938 6.99999H17.4063H14.5314C13.3334 6.99999 12.323 7.22134 11.5001 7.66405C10.6772 8.10155 10.0548 8.70051 9.63286 9.46093C9.21099 10.2161 9.00005 11.0729 9.00005 12.0313C9.00005 13 9.21099 13.8646 9.63286 14.625C10.0548 15.3802 10.6772 15.9766 11.5001 16.4141C12.323 16.8464 13.3334 17.0625 14.5314 17.0625H15.4689V10.125H17.4063V23H20.5313V6.99999H18.0938Z"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                    />
                    {/* <path
                        className="outline"
                        d="M1.99414 0H-6.10352e-05V30H4.48849L21.4647 24.9724C24.1125 24.1883 26.8946 25.6991 27.6787 28.3468L28.0234 29.5106C28.0716 29.6734 28.1111 29.8367 28.1423 30H29.9999V0H25.7372L8.67599 5.05273C6.02824 5.83686 3.24615 4.32611 2.46201 1.67835L2.11842 0.518163C2.06737 0.345815 2.02606 0.172898 1.99414 0Z"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                    /> */}
                    <path
                        className="symbol"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.0938 7H17.4063H14.5313C13.3333 7 12.3229 7.22135 11.5 7.66406C10.6771 8.10156 10.0547 8.70052 9.63281 9.46094C9.21094 10.2161 9 11.0729 9 12.0313C9 13 9.21094 13.8646 9.63281 14.625C10.0547 15.3802 10.6771 15.9766 11.5 16.4141C12.3229 16.8464 13.3333 17.0625 14.5313 17.0625H15.4688V10.125H17.4063V23H20.5313V7H18.0938Z"
                        fill={color}
                    />
                </g>
                <defs>
                    <clipPath id="clip0_8_17">
                        <rect x="-6.10352e-05" width="30" height="30" rx="5" fill={color} />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default LogoLoader;