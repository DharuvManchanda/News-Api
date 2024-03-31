const Api_Key="e7794129ca534ff38d22b27794c3cd33";
const url ="https://newsapi.org/v2/everything?q=";
window.addEventListener("load", ()=>fetchNews("Latest India"));

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${Api_Key}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('container');
    const newsCard=document.getElementById('cards');
    cardsContainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage)  return;
        const cardClone = newsCard.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
const pic="orange.png";
function fillDataInCard(cardClone,article){
    
    const newsImg=cardClone.querySelector('#cardsImg');
    const newsHeading=cardClone.querySelector('#headingText');
    const newsDate=cardClone.querySelector('#dateText');
    const newsDescription=cardClone.querySelector('#descriptionText');
    newsImg.src=article.urlToImage;
    newsHeading.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
newsDate.innerHTML= `${article.source.name} : ${date}`;

cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url, "_blank")
});
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
    navBar.classList.toggle("active");
}
const searchbutton =document.getElementById('searchButton');
const searchText= document.getElementById('search');

searchbutton.addEventListener("click",()=>{
    const query=searchText.value;
    navBar.classList.toggle("active");
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})

const toggleButton=document.getElementById('toggle');
const navBar=document.getElementById("middle-Nav");
toggleButton.addEventListener('click', ()=>{
    navBar.classList.toggle("active");
})

