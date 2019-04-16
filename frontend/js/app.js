const game1 = document.querySelector("#game-1");
const game2 = document.querySelector("#game-2");

const teamDiv = document.querySelector("#team-1 .main__header");
const teamDiv2 = document.querySelector("#team-2 .main__header");

const games = document.querySelectorAll(".game");

const Teams = {
  game: 0,
  teams: []
}

function createDivElement() {
    let div = document.createElement("div");
    return div;
}

function createSpanElement() {
  let span = document.createElement("span");
  return span;
}

function createUlElement() {
  let ul = document.createElement("ul");
  ul.className = "scores";

  return ul;
}

function createLiElement() {
    let li = document.createElement("li");
    li.className = "scores__item";

    return li;
}

function getParticipantsElement(participant){

    //participant row
    let li = createLiElement();

    let span =  document.createElement("span");
    span.className = "scores__name";
    span.title = participant["name"];
    span.innerHTML = participant["name"];

    let span1 =  document.createElement("span");
    span1.className = "scores__kda";
    span1.innerHTML = participant["stats"];

    let span2 =  document.createElement("span");
    span2.className = "scores__exp";
    span2.innerHTML = participant["pointsEarned"];

    let span3 =  document.createElement("span");
    span3.className = "scores__total";
    span3.innerHTML = participant["totalScore"];

    li.appendChild(span);
    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);

    return li;
} 

 async function fetchData(gameId) {

   let gameData =  fetch('https://riot-games-technical-exercise.herokuapp.com/game/'+gameId)
      .then(x => x.json());
      return await gameData;
 }


 async function getData(gameId) {

  let gameData =  await fetchData(gameId);
  Teams.game = gameData.game;
  
  for(let data of gameData.teams) {
    Teams.teams.push(data)
  }

  return Teams;
}

games.forEach(function(game) {

  game.addEventListener("click", function(event) {

    //toggle tab
    document.querySelectorAll(".game").forEach(function(el){
      if(el.id == event.target.id) {
        game.classList.add("selected");
      }
      else {
        el.classList.remove("selected");
      }

      document.querySelector(".teamParticipants").remove();
    })

    //to reset the div
    teamDiv.innerHTML = "";
    teamDiv2.innerHTML = "";

    //to reset the object
    Teams.game = 0;
    Teams.teams = [];

    //call main draw function
    main();
  })
});


 async function main() {

  let gameId = 0;

  //game id selection
  if(games.item(0).classList.contains("selected")) {
    gameId = 1 
  }
  else {
    gameId = 2;
  }
  
  let gameData = await getData(gameId);

  for(let i = 0; i <= 1 ; i++) {

    let team = gameData.teams[i];
    let participants = gameData.teams[i]["participants"];

    //TeamName and Status Info
    let teamInfoDiv = createDivElement();
    teamInfoDiv.className = "team__name";
    let teamInfoSpan = createSpanElement();
    teamInfoSpan.className = "team__name--short";
    teamInfoSpan.innerHTML = team["shortName"];
    teamInfoDiv.appendChild(teamInfoSpan);

    let teamStatusDiv = createDivElement();
    teamStatusDiv.className = team["isWinner"] ?  "game__status game__status--victory" :  "game__status game__status--defeat";
    teamStatusDiv.innerHTML= team["isWinner"] ?  "WINNER" : "DEFEAT";

    //participants info
    let div = createDivElement();
    div.classList.add("teamParticipants")
    let ul = createUlElement();


    for(let i=0; i< participants.length; i++ ) {
    ul.appendChild(getParticipantsElement(participants[i]));
    }

    div.appendChild(ul);

    if(i === 0) {
      //Team1
      teamDiv.appendChild(teamInfoDiv);
      teamDiv.appendChild(teamStatusDiv);
      teamDiv.after(div);
    }
    else {
        //Team2
      teamDiv2.appendChild(teamInfoDiv);
      teamDiv2.appendChild(teamStatusDiv);
      teamDiv2.after(div);
    } 
  }
 }

 main();