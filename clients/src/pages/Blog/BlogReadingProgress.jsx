import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import { getReadingProgress, updateReadingProgress } from "../../lib/apiCalls/readingProgressApi";

const BlogReadingProgress = forwardRef(({ blogId, scrollYProgress }, ref) => {
    const [previousProgress, setPreviousProgress] = useState(0);
    const lastSentPercentage = useRef(0);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await getReadingProgress(blogId);
                if (response.success) {
                    setPreviousProgress(response?.progress || 0);
                    lastSentPercentage.current = response?.progress || 0;

                    const scrollHeight = ref.current.getBoundingClientRect().height;
                    const scrollToY = (response?.progress / 100) * scrollHeight;
                    window.scrollTo({ top: scrollToY, behavior: "smooth" });
                } else throw new Error(response?.message || 'Unable to fetch reading progress');
            } catch (error) {
                console.log(error);
            }
        };

        const intervalId = setInterval(() => {
            if (ref.current) {
                clearInterval(intervalId);
                fetchProgress();
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, [blogId, ref]);

    useEffect(() => {
        return () => {
            const finalPercentage = Math.round(scrollYProgress.get() * 100);
            if (lastSentPercentage.current < 100 && finalPercentage > lastSentPercentage.current) {
                updateReadingProgress(blogId, finalPercentage);
            }
        };
    }, [blogId, previousProgress, scrollYProgress]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const percentage = Math.round(latest * 100);
        if (lastSentPercentage.current === 100 || percentage <= lastSentPercentage.current) return;

        const thresholds = [5, 25, 50, 75, 100];
        const nextThreshold = thresholds.find(
            (t) => t > lastSentPercentage.current && t <= percentage
        );

        if (nextThreshold) {
            updateReadingProgress(blogId, nextThreshold);
            lastSentPercentage.current = nextThreshold;
        }
    });

    return null;
});

export default BlogReadingProgress;
