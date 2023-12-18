import { useGetRandomPhotoQuery } from "../redux/services/unsplash"
import { CLIENT_ID, Photo } from "../constants"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Paper, Typography } from "@mui/material"



const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const { data, error } = useGetRandomPhotoQuery({ clientID: CLIENT_ID, count: 5})
    const images: Photo[] = data
    if(error) throw error
    //console.log(images)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1 === 5 ? currentIndex - 4 : currentIndex + 1);
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
                            className="div-img"
                        >
                            <Paper 
                                elevation={24} 
                                sx={{
                                    width: 650, 
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    opacity: 0.5,
                                    padding: 2
                                }} 
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        opacity: 1,
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                >
                                    See The Beauty Of The World Through My Lens.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'gold',
                                        opacity: 1
                                    }}
                                >
                                    Let us capture your moments.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
            
        </>
    )
}

export default Hero