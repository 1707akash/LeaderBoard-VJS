


document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const firstName = e.target.children[0].value;
     lastName= e.target.children[1].value;
     country= e.target.children[2].value;
     playerScore= e.target.children[3].value;
     errorPrompter= document.querySelector(".mainErrorPrompt");

    errorPrompter.style.display= "none";

    if(firstName==='' || lastName==='' || country==='' || playerScore===''){
        errorPrompter.style.display="block";
    }

    let scoreBoardContainer = document.querySelector(".mainScoreboardWrapper");

    const scoreElement = document.createElement("div");
    scoreElement.classList.add("mainScoreboard");
    scoreElement.innerHTML = `
    <div>
                <p  class="mainPayername">${firstName} ${lastName}</p>
                <p class="mainTimeStamp">${generateDateandTime()}</p>
    </div>
            <p class="maincountry">${country}</p>
            <p class="mainScore">${playerScore}</p>
    <div class="mainScoreOps">
                <button>&#x1f5d1;</button>
                <button>+5</button>
                <button>-5</button>
    </div>
            `
    scoreBoardContainer.appendChild(scoreElement);
    sortScoreBoard();
    activateBtnEventListener();

})


function generateDateandTime(){
    let dateObject = new Date();
    // console.log(dateObject);
    let month = dateObject.toLocaleString("default", {month:"long"});
    day= dateObject.getDate();
    year= dateObject.getFullYear();
    time= dateObject.toLocaleString().slice(0,7);

    let generateResult = `${month} ${day},${year} ${time}; `
    return generateResult;

}

function activateBtnEventListener(){
    document.querySelectorAll(".mainScoreOps").forEach((el)=>{
        el.addEventListener("click",(e)=>{
            let textContent = e.target.textContent;
            // console.log(textContent);
            let scoreOfPlayer = e.target.parentElement.parentElement.children[2];
            // console.log(scoreOfPlayer);

            if(textContent.length>2) return;

            if(textContent === '🗑'){
                return e.target.parentElement.parentElement.remove();
            }
            scoreOfPlayer.textContent = parseInt(scoreOfPlayer.textContent) + parseInt(textContent);

            sortScoreBoard();
        })
    })
}


activateBtnEventListener();


function sortScoreBoard(){
    scoreBoardContainer = document.querySelector(".mainScoreboardWrapper");

    let scoreBoards = document.querySelectorAll(".mainScoreboard");

    let elementsInArray = [];
    scoreBoards.forEach((el)=>elementsInArray.push(el));

    // console.log(elementsInArray);

    let sortedElements = elementsInArray.map((el)=>{
        return el;
    })
    .sort((a,b)=>{
        let numA = parseInt(a.children[2].textContent),
        numB = parseInt(b.children[2].textContent);

        if(numA > numB) return -1;
        if(numA < numB) return 1;
    })

    sortedElements.forEach((el)=>{
        scoreBoardContainer.append(el);
    })
}