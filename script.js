

errorPrompt = document.querySelector(".errorPrompt");
    errorPrompt.style.display= "none";

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let firstName= e.target.children[0].value;
    lastName = e.target.children[1].value;
    country = e.target.children[2].value;
    score = e.target.children[3].value;
    // console.log(firstName, lastName, country, score);

    // errorPrompt = document.querySelector(".errorPrompt");
    // errorPrompt.style.display= "none";
    if(lastName==="" || firstName==="" || country==="" || score===""){
        errorPrompt.style.display = "block";
        return;
    }
    
    let mainWrapperDiv = document.querySelector(".mainWrapperDiv");
    let individualDiv = document.createElement("div");
    individualDiv.classList.add("personScore")
    individualDiv.innerHTML = `
    <div class="nameDiv">
    <p class="fullname">${firstName} ${lastName}</p>
    <p class="timeDetail">${generateDateandTime()}</p>
    </div>
    <p class="country">${country}</p>
    <p class="score">${score}</p>
    <div class="mainScoreOps">
                <button>&#x1f5d1;</button>
                <button>+5</button>
                <button>-5</button>
    </div>
    
    ` ;
    mainWrapperDiv.appendChild(individualDiv);
    sortScoreBoard();
    activateBtnEventListener();
});

// 3 things to create generateDateandTime(), sortScoreBoard() & activateBtnEventListener();

function generateDateandTime(){
    let currTime = new Date();
    // console.log(currTime);
    let mon= currTime.toLocaleString('default', {month:'long'});
    let day= currTime.getDate();
    let year = currTime.getFullYear();
    let time = currTime.toLocaleTimeString().slice(0,7);

    let finalTime = `${mon} ${day},${year} ${time}`;
    return finalTime;
}



function activateBtnEventListener(){
        document.querySelectorAll(".mainScoreOps").forEach((el)=>{
        el.addEventListener("click",(e)=>{
            let textContent = e.target.textContent;
            // console.log(textContent);
            let personScore = e.target.parentElement.parentElement.children[2];
            // console.log(personScore);
            if(textContent.length>2) return;
            if(textContent === '🗑'){
                return e.target.parentElement.parentElement.remove();
            }
            personScore.textContent = parseInt(personScore.textContent) + parseInt(textContent);
                // console.log(personScore.textContent);
            
            sortScoreBoard();
        })
    })
}
activateBtnEventListener();


function sortScoreBoard(){
    let scoreBoardContainer = document.querySelector(".mainWrapperDiv");

    let personScoreBoard = document.querySelectorAll(".personScore");

    let elementsArr = [];
    personScoreBoard.forEach((el)=>elementsArr.push(el));
    let sortedScoreBoard = elementsArr.map((el)=>{
        return el;
    })
    .sort((a,b)=>{
        numA= parseInt(a.children[2].textContent);
        numB= parseInt(b.children[2].textContent);
        if(numA>numB) return -1;
        if(numB>numA) return 1;
    })
    sortedScoreBoard.forEach((el)=>{scoreBoardContainer.append(el)});
}