import React, {useEffect, useState}from 'react'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'

const NewsCard = ({title, description, image, link, publishTime}) => {



    
  return (
    <div className='flex items-center text-left justify-center'>
    <div className='flex w-5/6 flex-wrap shadow-lg hover:shadow-2xl px-5 py-5'>
        <div className='flex-grow-0' style={{ flexBasis: '30%' }}>
            <img src={image}  />
        </div>
        <div className='flex-grow-0 flex flex-col gap-2 justify-between' style={{ flexBasis: '70%' }}>
            <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>{title}</h2>
            <div className='flex gap-1 text-sm'><span>News curated by</span><span className='font-semibold'>Suresh Bhatt</span><span>/</span><span>{format(new Date(publishTime), 'MMM d, yyyy')}</span></div>
            <article className='text-justify text-sm'>{description}</article>
            </div>
            <div>
                <Link to={link} target='blank'>
                <span className='cursor-pointer text-blue-600'>Read more here</span>
                </Link>
            
            </div>
        </div>
    </div>
    </div>
  )
}

export default NewsCard