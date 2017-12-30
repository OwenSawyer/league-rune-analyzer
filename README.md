# Champions Reforged

### (Submission for Riot Games API Challenge 2017 - Educate Category)

http://league-rune-analyzer.herokuapp.com/

> Choose better runes for the champions you play!

Our project allows users to look up their match histories and view the champions they have recently played, and which runes they selected on each one. Not only that, but users are also able to see how their runes compare to the optimal runes for each champion. A "Rune rating" also gives players more insight into how well their chosen runes fit with the champion and the champion's assigned role (e.g. Mage, Tank etc.)

For more information about any rune, all rune icons on the page are click-able, and can provide more information about the rune itself, and how they add to a current champion's statistics in terms of Attack, Defense, Toughness, Mobility and Utility. We also provide a comparison of which roles each rune is most picked on, so that players can see the trends between runes and champion roles. This information feature, and the comparison between chosen and optimal runes are the highlights of our project, and what we believe will really help players understand the new runes and how to optimize them on their favourite champions.

In addition, we've also added a few conveniance features, such as displaying basic match information, and links to other players in each match, with a green banner for game victories, and red in defeats.

![Champions Reforged](assets/img/Logo.png?raw=true "Champions Reforged")

### Synopsis

This project is an application based on the Django REST framework along with React JS on the frontend. Our backend uses the Riot API to request match histories, match information and player information, while using Data Dragon for static information such as images, rune information etc. We aggregate common trends between champions/roles and rune choices to display this information in the form of graphs and ratings to help players improve. On the frontend, we used Bootstrap along with React to provide a dynamic, appealing and easy-to-use platform for players to interact with. 

### Motivation

The main motivation behind this project, was to create an application for the 2017 Riot Games API Challenge. While we did develop this application as part of the challenge, we mainly took this as an opportunity to grow as developers and explore new frameworks. The best part about this experience, is that we have now created something that we can use ourselves, and share with other League of Legends players!

## Getting Started


To run this project locally, clone this repository and follow the installation steps below:

### Installing


* `npm install`
* `npm run webpack`
* `pip install -r requirements.txt`
* `python manage.py runserver`

Open a browser and connect to `localhost:8000` and the application should be running locally!

## API Reference

### Summoner
<details>
  <summary><code>POST</code> /summoner</summary>
   
**Request body**
``` json
{
  "region": "NA1",
  "name": "Shimmerstar244"
}
```

**Response**
``` json
{
   "id": 48420758, 
   "accountId": 211278489, 
   "name": "Shimmerstar244", 
   "profileIconId": 3232, 
   "revisionDate": 1514581961000, 
   "summonerLevel": 40
}
```
</details>

### Matchlist
<details>
  <summary><code>POST</code> /matchlist</summary>
   
**Request body**
``` json
{
  "region": "NA1",
  "accountId": "211278489"
}
```

**Response**
``` json
{
   "matches":[
      {
         "champion":64,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2682451832,
         "timestamp":1514580806035,
         "platformId":"NA1"
      },
      {
         "champion":131,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2681752666,
         "timestamp":1514503296480,
         "platformId":"NA1"
      },
      {
         "champion":19,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2680993198,
         "timestamp":1514415661700,
         "platformId":"NA1"
      },
      {
         "champion":203,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2680236915,
         "timestamp":1514328992606,
         "platformId":"NA1"
      },
      {
         "champion":203,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2679474643,
         "timestamp":1514241723526,
         "platformId":"NA1"
      },
      {
         "champion":67,
         "lane":"BOTTOM",
         "role":"SOLO",
         "season":9,
         "queue":850,
         "gameId":2678921014,
         "timestamp":1514157227627,
         "platformId":"NA1"
      },
      {
         "champion":19,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2677965867,
         "timestamp":1514069123287,
         "platformId":"NA1"
      },
      {
         "champion":67,
         "lane":"BOTTOM",
         "role":"DUO",
         "season":9,
         "queue":850,
         "gameId":2677335343,
         "timestamp":1513987026175,
         "platformId":"NA1"
      },
      {
         "champion":18,
         "lane":"BOTTOM",
         "role":"DUO",
         "season":9,
         "queue":850,
         "gameId":2676393912,
         "timestamp":1513901698442,
         "platformId":"NA1"
      },
      {
         "champion":19,
         "lane":"TOP",
         "role":"DUO",
         "season":9,
         "queue":1010,
         "gameId":2675889004,
         "timestamp":1513828735654,
         "platformId":"NA1"
      },
      {
         "champion":127,
         "lane":"TOP",
         "role":"DUO",
         "season":9,
         "queue":1010,
         "gameId":2675870366,
         "timestamp":1513827085898,
         "platformId":"NA1"
      },
      {
         "champion":76,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":850,
         "gameId":2675680334,
         "timestamp":1513812510280,
         "platformId":"NA1"
      },
      {
         "champion":127,
         "lane":"TOP",
         "role":"SOLO",
         "season":9,
         "queue":1010,
         "gameId":2675631742,
         "timestamp":1513809889299,
         "platformId":"NA1"
      },
      {
         "champion":55,
         "lane":"JUNGLE",
         "role":"NONE",
         "season":9,
         "queue":1010,
         "gameId":2675495591,
         "timestamp":1513798797662,
         "platformId":"NA1"
      },
      {
         "champion":90,
         "lane":"MID",
         "role":"SOLO",
         "season":9,
         "queue":1010,
         "gameId":2675501077,
         "timestamp":1513797011716,
         "platformId":"NA1"
      },
      {
         "champion":33,
         "lane":"TOP",
         "role":"DUO",
         "season":9,
         "queue":1010,
         "gameId":2675477585,
         "timestamp":1513795500912,
         "platformId":"NA1"
      },
      {
         "champion":32,
         "lane":"TOP",
         "role":"DUO",
         "season":9,
         "queue":1010,
         "gameId":2675114237,
         "timestamp":1513745276959,
         "platformId":"NA1"
      },
      {
         "champion":1,
         "lane":"TOP",
         "role":"DUO",
         "season":9,
         "queue":1010,
         "gameId":2675076317,
         "timestamp":1513743966257,
         "platformId":"NA1"
      },
      {
         "champion":22,
         "lane":"BOTTOM",
         "role":"DUO",
         "season":9,
         "queue":1010,
         "gameId":2675050954,
         "timestamp":1513742637344,
         "platformId":"NA1"
      },
      {
         "champion":55,
         "lane":"MID",
         "role":"SOLO",
         "season":9,
         "queue":1010,
         "gameId":2674919435,
         "timestamp":1513740558661,
         "platformId":"NA1"
      }
   ],
   "startIndex":0,
   "totalGames":149,
   "endIndex":20
}
```
</details>

### Match
<details>
  <summary><code>POST</code> /match</summary>
   
**Request body**
``` json
{
   "region": "NA1",
   "matchId": 2682451832,
   "accountId":211278489
}
```

**Response**
``` json
{
   "players":{
      "team2":[
         {
            "accountId":0,
            "championId":157,
            "summonerName":"Yasuo",
            "participantId":6,
            "platformId":"NA1"
         },
         {
            "accountId":0,
            "championId":5,
            "summonerName":"XinZhao",
            "participantId":7,
            "platformId":"NA1"
         },
         {
            "accountId":0,
            "championId":50,
            "summonerName":"Swain",
            "participantId":8,
            "platformId":"NA1"
         },
         {
            "accountId":0,
            "championId":25,
            "summonerName":"Morgana",
            "participantId":9,
            "platformId":"NA1"
         },
         {
            "accountId":0,
            "championId":36,
            "summonerName":"DrMundo",
            "participantId":10,
            "platformId":"NA1"
         }
      ],
      "team1":[
         {
            "accountId":34750034,
            "championId":112,
            "summonerName":"Darps",
            "participantId":1,
            "platformId":"NA1"
         },
         {
            "accountId":211278489,
            "championId":64,
            "summonerName":"Shimmerstar244",
            "participantId":2,
            "platformId":"NA1"
         },
         {
            "accountId":215680375,
            "championId":420,
            "summonerName":"A Small Radish",
            "participantId":3,
            "platformId":"NA1"
         },
         {
            "accountId":222810087,
            "championId":236,
            "summonerName":"Lanvon Pixbutts",
            "participantId":4,
            "platformId":"NA1"
         },
         {
            "accountId":35589883,
            "championId":44,
            "summonerName":"Jasonzar",
            "participantId":5,
            "platformId":"NA1"
         }
      ]
   },
   "deaths":1,
   "gameMode":"Classic",
   "map":"Summoner's Rift",
   "assists":8,
   "spell2":4,
   "kills":4,
   "win":"true",
   "championAttributes":{
      "toughness":2,
      "mobility":3,
      "attack":3,
      "defense":2,
      "utility":1
   },
   "champion":64,
   "championTags":[
      "Fighter",
      "Assassin"
   ],
   "runes":{
      "secondary":{
         "runes":[
            8243,
            8237
         ],
         "id":8200
      },
      "rating":80.0,
      "primary":{
         "runes":[
            8112,
            8143,
            8136,
            8105
         ],
         "id":8100
      }
   },
   "lane":"JUNGLE",
   "gameType":"Co-op vs. AI Intermediate Bot",
   "gameDuration":"0:18:23",
   "gameDate":"29/12/17",
   "championName":"LeeSin",
   "spell1":11
}
```
</details>

### Optimal Runes
<details>
  <summary><code>POST</code> /rune/opt</summary>
   
**Request body**
``` json
{
   "champion": "LeeSin",
   "role": "jungle"
}
```

**Response**
``` json
{
   "secondary":{
      "runes":[
         9111,
         8014
      ],
      "id":8000
   },
   "primary":{
      "runes":[
         8112,
         8143,
         8138,
         8105
      ],
      "id":8100
   }
}
```
</details>

### Rune Info
<details>
  <summary><code>POST</code> /rune/info</summary>
   
**Request body**
``` json
{
   "rune":8112,
   "championAttributes":{
      "toughness":2,
      "mobility":3,
      "attack":3,
      "defense":2,
      "utility":1
   }
}
```

**Response**
``` json
{
   "attributes":{
      "toughness":"1.481",
      "mobility":"2.444",
      "attack":"2.777",
      "defense":"1.185",
      "utility":"0.851"
   },
   "name":"Electrocute",
   "id":8112,
   "desc":"Hitting a champion with 3 separate attacks or abilities within 3 seconds deals bonus adaptive damage. Damage: 50 - 220 (+0.50 bonus AD, +0.3 AP) damage. Cooldown: 50 - 25s.",
   "roles":{
      "Support":"0",
      "Assassin":"0.352",
      "Marksman":"0.078",
      "Mage":"0.117",
      "Tank":"0.058",
      "Fighter":"0.392"
   },
   "category":8100
}
```
</details>

## Authors

* **Owen Sawyer** - [OwenSawyer](https://github.com/OwenSawyer)
* **Meeral Qureshi** - [MeeralQureshi](https://github.com/MeeralQureshi)

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
