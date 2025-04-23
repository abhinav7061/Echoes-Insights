import React from 'react'
import { cn } from '../../lib/utils'

const ShortsControls = ({ handleScroll, canGoUp, canGoDown }) => {
    return (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex-col gap-3 z-10 hidden lg:flex">
            <button
                onClick={() => handleScroll('up')}
                className={cn("bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500",
                    canGoUp && "opacity-0 translate-y-[calc(100%+12px)]",
                )}
                style={{ visibility: canGoUp ? 'hidden' : 'visible' }}
            >
                <ion-icon name="arrow-up-outline"></ion-icon>
            </button>
            <button
                onClick={() => handleScroll('down')}
                className={cn("bg-neutral-100/30 sm:bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/40 xs:dark:bg-neutral-800 dark:hover:bg-neutral-700 flex p-3 text-2xl  rounded-full transition-all duration-500",
                    canGoDown && "opacity-0 -translate-y-[calc(100%+12px)]",
                )}
                style={{ visibility: canGoDown ? 'hidden' : 'visible' }}
            >
                <ion-icon name="arrow-down-outline"></ion-icon>
            </button>
        </div>
    )
}

export default ShortsControls