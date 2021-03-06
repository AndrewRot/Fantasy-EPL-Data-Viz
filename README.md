# Fantasy-EPL-Data-Viz

By: Andrew Rottier

Context: Project completed for course Data Science 3001

Project link: [Fantasy-Premier-League](https://fantasy-premier-league.herokuapp.com/)

* *Project built in 36 hours.*


---


### Running this program
To run this program, clone the repository and then run the following commands from within the main directory:
`npm install`
`node server`


---


### Description
This is a data visualization of the current English Premier League team. The size of each team's badge corresponds to the total number of Fantasy Premier League points a team's player's have collected over the course of the season. Data has been normalized and badges are proportional to the normalized score.

Data for this application is pulled each time the page is loaded from [Fantasy.PremierLeague.com](https://fantasy.premierleague.com/drf/bootstrap-static)

Player data is then compiled and summarized to the total points earned by each team. Data is then fed to the client where it is normalized and plotted.

---


### Plotting of EPL team crests
Team crests are dropped in order from worst to best performing teams. The size of each crest is proportional to their EPL Fantasy Point total.


![Alt text](images/EPLDataViz.gif?raw=true )


---


### Screenshot of application
Below is a screenshot of the full application.


![Alt text](images/App.jpeg?raw=true )


---


### Info modals
Each badge can be clicked for more information. The opened modal displays team name, stadium, fantasy point total, and their normalized data score.


![Alt text](images/EPLmodals.gif?raw=true )


