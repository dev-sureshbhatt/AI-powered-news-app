require('dotenv').config()
console.log(process.env.API)

function summarizer(data){

return new Promise((resolve, reject)=> {

    const {fullTitle, content} = data
// console.log("hi I am here", content)

fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.API}`,
    // "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
    // "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "gryphe/mythomist-7b:free",
    "messages": [
      {"role": "user", "content": `Please rewrite this news content so that I can publish it on another website without facing plagiarism. Just provide the content under 60-100 words covering main information       
      ${content}`},
    ],
  })
})
.then(response => response.json())
.then((data) => 
    {
        // console.log("returning this data back", data)
        resolve(data.choices[0].message.content)
    }
)
.catch((err)=>{
    console.log(err)
    reject(err)
})


})



// return response

}


module.exports = {summarizer}
