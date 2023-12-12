import { useGetRandomPhotoQuery } from "../redux/services/unsplash"
import { CLIENT_ID, Photo } from "../constants"
import { useState } from "react"
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
    console.log(images)

    const handleNext = () => {
        setDirection('right')
        setCurrentIndex((prev) => prev+1 === data.length ? 0 : prev + 1)
    }

    const handlePrev = () => {
        setDirection('left')
        setCurrentIndex((prev) => prev-1 < 0 ? data.length : prev - 1)
    }

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? "right" : "left")
        setCurrentIndex(index)
    }

    return (
        <>
            {data && 
                <div className="carousel">
                    <AnimatePresence>
                        {/* <motion.img 
                            key={currentIndex} 
                            src={images[currentIndex].urls.regular} 
                            variants={slideVariants}
                            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                            animate="visible"
                            exit="exit"
                        /> */}
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
                    
                    <div className="slide_direction">
                        <motion.div className="left" variants={slideVariants} whileHover="hover" onClick={handlePrev}>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                height={20}
                                viewBox="0 96 960 960"
                                width={20}
                            >
                                <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                            </svg>
                        </motion.div>
                        <motion.div className="right" variants={slideVariants} whileHover="hover" onClick={handleNext}>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                height={20}
                                viewBox="0 96 960 960"
                                width={20}
                            >
                                <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                            </svg>
                        </motion.div>
                    </div>
                    <div className="indicator_container">
                        <div className="indicator">
                            {
                                images.map((_, index) => (
                                    <motion.div
                                        key={index}
                                        className={`dot ${currentIndex === index ? "active" : ""}`}
                                        onClick={() => handleDotClick(index)}
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