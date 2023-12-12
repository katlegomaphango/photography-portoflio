import { useGetRandomPhotoQuery } from "../redux/services/unsplash"
import { CLIENT_ID, Photo } from "../constants"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const slideVariants = {
    hiddenRight: {
        x: "100%",
        opacity: 0,
    },
    hiddenLeft: {
        x: "-100%",
        opacity: 0,
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 1,
        }
    },
    hover: {
        scale: 1.2,
        backgroundColor: "#ff00008e",
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.5,
        }
    }
}

const dotsVariants = {
    initial: {
        y: 0,
    },
        animate: {
        y: -10,
        scale: 1.3,
        transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
        hover: {
        scale: 1.1,
        transition: { duration: 0.2 },
    },
};


const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState('left')
    
    const { data, error } = useGetRandomPhotoQuery({ clientID: CLIENT_ID, count: 5})
    const images: Photo[] = data
    if(error) throw error
    //console.log(images)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1 === 5 ? currentIndex - 4 : currentIndex + 1);
            setDirection((prev) => prev === 'right' ? 'left' : 'right')
        }, 2000);

        return () => {
        clearInterval(interval);
        };
    });

    console.log(currentIndex)

    return (
        <>
            {data && 
                <div className="carousel">
                    <AnimatePresence>
                        <motion.div 
                            key={currentIndex} 
                            style={{backgroundImage: `url("${images[currentIndex].urls.regular}")`}}
                            variants={slideVariants}
                            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                            animate="visible"
                            exit="exit"
                            className="div-img"
                        ></motion.div>
                    </AnimatePresence>

                    <div className="indicator_container">
                        <div className="indicator">
                            {
                                images.map((_, index) => (
                                    <motion.div
                                        key={index}
                                        className={`dot ${currentIndex === index ? "active" : ""}`}
                                        // onClick={() => handleDotClick(index)}
                                        initial="initial"
                                        animate={currentIndex === index ? "animate" : ""}
                                        whileHover="hover"
                                        variants={dotsVariants}
                                    ></motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
}

export default Hero