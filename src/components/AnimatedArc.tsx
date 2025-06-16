'use client';

import { motion } from 'framer-motion';

export const AnimatedArc = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <motion.svg
                className="w-full"
                height="100"
                viewBox="0 0 1440 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0 0L1440 0V30C1440 69.7 1087.08 100 720 100C352.92 100 0 69.7 0 30V0Z"
                    fill="white"
                    initial={{ d: "M0 100L1440 100V100C1440 100 1087.08 100 720 100C352.92 100 0 100 0 100V100Z" }}
                    animate={{ d: "M0 0L1440 0V30C1440 69.7 1087.08 100 720 100C352.92 100 0 69.7 0 30V0Z" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </motion.svg>
        </div>
    );
};

export default AnimatedArc; 