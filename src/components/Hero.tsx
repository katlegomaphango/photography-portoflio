import { useGetRandomPhotoQuery } from "../redux/services/unsplash"
import { CLIENT_ID } from "../constants"
import { useState } from "react"


const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { data, error } = useGetRandomPhotoQuery({ clientID: CLIENT_ID, count: 5})
    if(error) throw error
    console.log(data)

    const handleNext = () => {
        setCurrentIndex((prev) => prev+1 === data.length ? 0 : prev + 1)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => prev-1 < 0 ? data.length : prev - 1)
    }

    const handleDotClick = (index: number) => setCurrentIndex(index)

    return (
        <div>Hero</div>
    )
}

export default Hero