const game1 = document.querySelector(".game1");
const game2 = document.querySelector(".game2");



game1.addEventListener("click", function() {
  game1.classList.add("selected");
  game2.classList.remove("selected");
  game2.removeAttribute("style");
  loadGameData();
  game1.classList.replace("game2","game1");
  game2.classList.replace("game1","game2");
})


game2.addEventListener("click", function() {
  game1.classList.remove("selected");
  game2.classList.add("selected");
  game2.setAttribute("style","margin-left:10px");
  loadGameData();
  game1.classList.replace("game1","game2");
  game2.classList.replace("game2","game1");
})



function loadGameData() {


  if(game1.classList.contains("selected")) {

    fetch('https://riot-games-technical-exercise.herokuapp.com/game/1').then(x => x.json()).then(function(data) {

      let teams = data.teams;

      const template = document.querySelector('#participantsTemplate').innerHTML
      Mustache.parse(template);   

      const renderedTeamOneParticipants = Mustache.render(template, teams[0]);
      const renderedTeamTwoParticipants = Mustache.render(template, teams[1]);

      document.querySelector('#teamOneParticipants').innerHTML = renderedTeamOneParticipants
      document.querySelector('#teamTwoParticipants').innerHTML = renderedTeamTwoParticipants

      const template2 = document.querySelector('#statusandnameTemplate').innerHTML
      Mustache.parse(template2);   

      const renderedTeamOneInfo = Mustache.render(template2, teams[0]);
      const renderedTeamTwoInfo = Mustache.render(template2, teams[1]);


      document.querySelector('#teamOneInfo').innerHTML = renderedTeamOneInfo;
      document.querySelector('#teamTwoInfo').innerHTML = renderedTeamTwoInfo;



     })
  }
  else {

    fetch('https://riot-games-technical-exercise.herokuapp.com/game/2').then(x => x.json()).then(function(data) {

      const teams = data.teams;

      const template = document.querySelector('#participantsTemplate').innerHTML
      Mustache.parse(template);   
      const renderedTeamOne = Mustache.render(template, teams[0]);
      const renderedTeamTwo = Mustache.render(template, teams[1]);

      document.querySelector('#teamOneParticipants').innerHTML = renderedTeamOne
      document.querySelector('#teamTwoParticipants').innerHTML = renderedTeamTwo

      const template2 = document.querySelector('#statusandnameTemplate').innerHTML
      Mustache.parse(template2);   

      const renderedTeamOneInfo = Mustache.render(template2, teams[0]);
      const renderedTeamTwoInfo = Mustache.render(template2, teams[1]);


      document.querySelector('#teamOneInfo').innerHTML = renderedTeamOneInfo;
      document.querySelector('#teamTwoInfo').innerHTML = renderedTeamTwoInfo;



     })

  } 



} 



