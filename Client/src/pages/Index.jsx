import React, { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard'

function Index() {

    const [news, setNews] = useState([])
    useEffect(()=>{
        fetch('http://localhost:4000/breaking')
        .then(response => response.json())
        .then(data => setNews(data))
        .catch(err => console.log("something went wrong fetching data"))
    }, [])

    console.log(news)


  return (
    <div className='flex gap-4 flex-col'>
        {
        news.map((element, index)=> {
            return <NewsCard key={index} title={element.title} description={element.newsContent} image={element.image} link={element.link} publishTime={element.updatedTime}/>
        })    
        }
        
    </div>
  )
}

export default Index