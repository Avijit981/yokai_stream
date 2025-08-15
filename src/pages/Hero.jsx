import React from 'react'
import Hnav from '../components/Hnav'
import { Car } from 'lucide-react'
import Carousel from '../components/carousel'

function Hero() {
    return (
        <>
            <Carousel />
            <Hnav />
            <h2 className='text-4xl font-bold font-outfit text-white text-center mt-8'>This is Hero page,</h2>
            <p className='text-2xl text-gray-400 text-center p-5'>All the content of this page will be added later.</p>
            <p className='text-lg text-gray-200  p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic odio quas expedita, soluta mollitia in assumenda quisquam, voluptates, similique omnis cum suscipit blanditiis id qui. Hic perspiciatis minus molestiae minima nesciunt culpa officiis soluta pariatur accusamus impedit tempore doloremque voluptatibus harum, distinctio vitae eligendi? Debitis id delectus rerum cupiditate quidem, qui tempore tempora ab eligendi quae nostrum accusamus magnam dolore velit non. Labore reprehenderit fugiat officiis recusandae dicta incidunt dolorem magnam iusto reiciendis dolore eaque a eum, maxime inventore id quis possimus nemo. Nisi esse illum fugit consequuntur vero, saepe sapiente quidem. Autem ducimus soluta maiores culpa ullam dolore distinctio?</p>
        </>
    )
}

export default Hero