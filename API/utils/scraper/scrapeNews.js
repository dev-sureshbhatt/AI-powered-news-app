const axios = require('axios')
const cheerio = require('cheerio')
const {summarizer} = require('./summarizer');
// const { setInterval } = require('timers/promises');

//Function to scraper

async function scraperNews(){

    //URL to Scrape
    const url = 'https://aninews.in/topic/detail/breaking-topics/';

    
    try {

        //we've set custom header/agent to bypass server restrictions

        const response = await axios.get(url, {headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }})
        
        //below is the data we recieved
        // console.log(response.data)
        const {data} = response

        //loading HTML to use queries to fetch data
        const $ = cheerio.load(data);

        const scrapedNews = []

        //Scraping required data

        $('.card').each((index, element) => {
            const titleElement = $(element).find('.title');
            const title = titleElement.text().trim();
            const link = `https://aninews.in${titleElement.parent().attr('href')}`;
            const image = $(element).find('.img-container img').attr('data-src');
            const updatedTime = new Date().toISOString();

            scrapedNews.push({
                title,
                link,
                image,
                updatedTime})
        
        
        })

    
        console.log(scrapedNews)


        
    } catch (error) {

        console.log("there was an error fetching data, you can edit the code and log this error to know more")
        
    }
}

// scraperNews()


const data = [
    {
      title: 'Breaking News',
      link: 'https://aninews.inundefined',   
      image: '',
      updatedTime: '2024-05-27T15:04:53.201Z'
    },
    {
      title: '4 persons died, over 2 lakh people evacuated, airport operations res',
      link: 'https://aninews.in/news/national/general-news/4-persons-died-over-2-lakh-people-evacuated-airport-operations-resumed-wb-report-on-cyclone-remal20240527201415',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527132215-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.203Z'
    },
    {
      title: "Rajkot fire incident: Rajya Sabha MP Rambhai Mokariya meets victims'",
      link: 'https://aninews.in/news/national/general-news/rajkot-fire-incident-rajya-sabha-mp-rambhai-mokariya-meets-victims-families20240527193019',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527140006-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.203Z'
    },
    {
      title: 'Delhi: Massive fire engulfs wood warehouse in Bhalswa Dairy area; no',
      link: 'https://aninews.in/news/national/general-news/delhi-massive-fire-engulfs-wood-warehouse-in-bhalswa-dairy-area-no-one-hurt20240527180905',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527123846-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.204Z'
    },
    {
      title: "DJ operator shot dead in Jharkhand's Ranchi for not serving alcohol",
      link: 'https://aninews.in/news/national/general-news/dj-operator-shot-dead-in-jharkhands-ranchi-for-not-serving-alcohol20240527171928',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527114916-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.205Z'
    },
    {
      title: 'Around 2000 people feared buried in Papua New Guinea landslide',
      link: 'https://aninews.in/news/world/others/around-2000-people-feared-buried-in-papua-new-guinea-landslide20240527134224',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527081213-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.205Z'
    },
    {
      title: 'Chhattisgarh: Naxals torch two under-construction mobile towers in N',
      link: 'https://aninews.in/news/national/general-news/chhattisgarh-naxals-torch-two-under-construction-mobile-towers-in-narayanpur20240527101041',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527044027-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.212Z'
    },
    {
      title: 'UP: Fire breaks out at hospital in Baghpat, no casualties reported',
      link: 'https://aninews.in/news/national/general-news/up-fire-breaks-out-at-hospital-in-baghpat-no-casualties-reported20240527090256',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240527032919-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.212Z'
    },
    {
      title: 'Earthquake of magnitude 6.4 jolts Tonga Islands',
      link: 'https://aninews.in/news/world/others/earthquake-of-magnitude-64-jolts-tonga-islands20240527034606',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526215328-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.213Z'
    },
    {
      title: "Protest held over death of 36-yr-old in Tripura's Boxanagar",
      link: 'https://aninews.in/news/national/general-news/protest-held-over-death-of-36-yr-old-in-tripuras-boxanagar20240526232713',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526175704-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.213Z'
    },
    {
      title: 'Cyclone Remal: "Adequate deployment of NDRF made," says Home Ministe',
      link: 'https://aninews.in/news/national/general-news/cyclone-remal-adequate-deployment-of-ndrf-made-says-home-minister-shah20240526231300',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526171104-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.213Z'
    },
    {
      title: "Severe cyclonic storm 'Remal' makes landfall on Bangladesh coast",
      link: 'https://aninews.in/news/world/asia/severe-cyclonic-storm-remal-makes-landfall-on-bangladesh-coast20240526222114',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526155818-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.213Z'
    },
    {
      title: 'Two wagons of goods train derail near Sangar railway station in Jamm',
      link: 'https://aninews.in/news/national/general-news/two-wagons-of-goods-train-derail-near-sangar-railway-station-in-jammu20240526213613',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526160558-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.214Z'
    },
    {
      title: 'Fire brigade team takes action against Vadodara adventure park for n',
      link: 'https://aninews.in/news/national/general-news/fire-brigade-team-takes-action-against-vadodara-adventure-park-for-not-having-fire-dept-noc20240526212601',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526155545-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.214Z'
    },
    {
      title: 'NCPCR chairperson Kanoongo calls Delhi hospital fire tragedy "deplor',
      link: 'https://aninews.in/news/national/general-news/ncpcr-chairperson-kanoongo-calls-delhi-hospital-fire-tragedy-deplorable20240526203601',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526150543-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.214Z'
    },
    {
      title: 'Eastern Railway implements safety measures for cyclonic storm Remal',
      link: 'https://aninews.in/news/national/general-news/eastern-railway-implements-safety-measures-for-cyclonic-storm-remal20240526190621',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526130411-thumbnail-320x180-70.jpeg',
      updatedTime: '2024-05-27T15:04:53.218Z'
    },
    {
      title: 'Delhi hospital fire tragedy: Police apprehends owner of Baby care ce',
      link: 'https://aninews.in/news/national/politics/delhi-hospital-fire-tragedy-police-apprehends-owner-of-baby-care-centre20240526184846',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526131840-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.218Z'
    },
    {
      title: 'Punjab: BSF recovers China-made Pakistani drone in Amritsar',
      link: 'https://aninews.in/news/national/general-news/punjab-bsf-recovers-china-made-pakistani-drone-in-amritsar20240526175200',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526122151-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.218Z'
    },
    {
      title: "Goods train derails in Telangana's Vishnupuram",
      link: 'https://aninews.in/news/national/general-news/goods-train-derails-in-telanganas-vishnupuram20240526172837',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526115503-thumbnail-320x180-70.jpeg',
      updatedTime: '2024-05-27T15:04:53.218Z'
    },
    {
      title: '4 died, 4 injured as bus rams into roadside hutments in South Goa',
      link: 'https://aninews.in/news/national/general-news/4-died-4-injured-as-bus-rams-into-roadside-hutments-in-south-goa20240526145615',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526092606-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.219Z'
    },
    {
      title: 'Income Tax seize Rs 26 crore cash after raids against Nashik-based j',
      link: 'https://aninews.in/news/business/income-tax-seize-rs-26-crore-cash-after-raids-against-nashik-based-jewellers20240526114203',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526061142-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.219Z'
    },
    {
      title: 'Delhi: Six newborns killed in fire accident at hospital in Vivek Vih',
      link: 'https://aninews.in/news/national/general-news/delhi-six-newborns-killed-in-fire-accident-at-hospital-in-vivek-vihar20240526075643',
      image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20240526022634-thumbnail-320x180-70.jpg',
      updatedTime: '2024-05-27T15:04:53.220Z'
    },
    {
      title: '',
      link: 'https://aninews.inundefined',
      image: undefined,
      updatedTime: '2024-05-27T15:04:53.220Z'
    },
    {
      title: '',
      link: 'https://aninews.inundefined',
      image: undefined,
      updatedTime: '2024-05-27T15:04:53.220Z'
    },
    {
      title: '',
      link: 'https://aninews.inundefined',
      image: undefined,
      updatedTime: '2024-05-27T15:04:53.220Z'
    },
    {
      title: '',
      link: 'https://aninews.inundefined',
      image: undefined,
      updatedTime: '2024-05-27T15:04:53.220Z'
    }
  ]

async function getNewsSummary(targetURL){

    try {

        const response = await axios.get(targetURL, {headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }})
        const {data} = response
        const $ = cheerio.load(data)

        //extracting title
        const fullTitle = $('h1.title').text().trim();
        // console.log(fullTitle)

        //using array since we can have multiple p tags
        const bodyContent = []
        $('article p').each((index, element) => {
            bodyContent.push($(element).text().trim());
        });
        //joining the p into a single string
        const content = bodyContent.join('\n\n');

        // console.log(content)

        // console.log("here")
        //returning the scraped data
        return {
            fullTitle,
            content
        };




        
    } catch (error) {

        console.error("Error fetching news summary:", error);
        return null;
        
    }

}


async function summarizeNews(newsUrl) {

    // const newsUrl = 'https://aninews.in/news/tech/computers/meta-introduces-ai-system-that-can-translate-100-different-languages20230823102512/';
    // const news = await getNewsSummary(newsUrl);
    // console.log(news);

    const getSummary = await summarize(news.content)
    return getSummary


}

// summarizeNews();
//filtering out title with "" empty value and "breaking news" as both are useless data
// console.log("here")
const filtered = data.filter((element)=> {
    return element.title != "" && element.title != "Breaking News"
    
}) 

// console.log(filtered)
// console.log("end of filtered data")
filtered.forEach(async (element, index) => {
    // console.log("loop running", index)


    if (index == 5) {
        const finalSummary = await getNewsSummary(element.link)
        // console.log(finalSummary)
        const getSummary = await summarizer(finalSummary)
        console.log("final", getSummary)
    }

         

})