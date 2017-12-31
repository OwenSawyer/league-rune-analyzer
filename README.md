# Champions Reforged

### (Submission for Riot Games API Challenge 2017 - Educate Category)

http://league-rune-analyzer.herokuapp.com/

> Choose better runes for the champions you play!

Our project allows users to look up their match histories and view the champions they have recently played, and which runes they selected on each one. Not only that, but users are also able to see how their runes compare to the optimal runes for each champion. A "Rune rating" also gives players more insight into how well their chosen runes fit with the champion and the champion's assigned role (e.g. Mage, Tank etc.)

For more information about any rune, all rune icons on the page are click-able, and can provide more information about the rune itself, and how they add to a current champion's statistics in terms of Attack, Defense, Toughness, Mobility and Utility. We also provide a comparison of which roles each rune is most picked on, so that players can see the trends between runes and champion roles. This information feature, and the comparison between chosen and optimal runes are the highlights of our project, and what we believe will really help players understand the new runes and how to optimize them on their favourite champions.

In addition, we've also added a few conveniance features, such as displaying basic match information, and links to other players in each match, with a green banner for game victories, and red in defeats.

![Champions Reforged](assets/img/screenshot.PNG?raw=true "Champions Reforged")

### Synopsis

This project is an application based on the Django REST framework along with React JS on the frontend. Our backend uses the Riot API to request match histories, match information and player information, while using Data Dragon for static information such as images, rune information etc. We aggregate common trends between champions/roles and rune choices to display this information in the form of graphs and ratings to help players improve. On the frontend, we used Bootstrap along with React to provide a dynamic, appealing and easy-to-use platform for players to interact with. 

### Motivation

The main motivation behind this project, was to create an application for the 2017 Riot Games API Challenge. While we did develop this application as part of the challenge, we mainly took this as an opportunity to grow as developers and explore new frameworks. The best part about this experience, is that we have now created something that we can use ourselves, and share with other League of Legends players!

## Getting Started


To run this project locally, clone this repository and follow the installation steps below:

### Installing

Start by setting a system environment variable `RIOT_API_KEY` with your Riot Developer API key as the value. Then run the following commands in the root folder of your cloned repository:

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
   "rune":8112
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

### Champions
<details>
  <summary><code>GET</code> /champions</summary>
  
**Response**
``` json
{
   "champions":[
      {
         "id":266,
         "key":"Aatrox",
         "name":"Aatrox"
      },
      {
         "id":103,
         "key":"Ahri",
         "name":"Ahri"
      },
      {
         "id":84,
         "key":"Akali",
         "name":"Akali"
      },
      {
         "id":12,
         "key":"Alistar",
         "name":"Alistar"
      },
      {
         "id":32,
         "key":"Amumu",
         "name":"Amumu"
      },
      {
         "id":34,
         "key":"Anivia",
         "name":"Anivia"
      },
      {
         "id":1,
         "key":"Annie",
         "name":"Annie"
      },
      {
         "id":22,
         "key":"Ashe",
         "name":"Ashe"
      },
      {
         "id":136,
         "key":"AurelionSol",
         "name":"Aurelion Sol"
      },
      {
         "id":268,
         "key":"Azir",
         "name":"Azir"
      },
      {
         "id":432,
         "key":"Bard",
         "name":"Bard"
      },
      {
         "id":53,
         "key":"Blitzcrank",
         "name":"Blitzcrank"
      },
      {
         "id":63,
         "key":"Brand",
         "name":"Brand"
      },
      {
         "id":201,
         "key":"Braum",
         "name":"Braum"
      },
      {
         "id":51,
         "key":"Caitlyn",
         "name":"Caitlyn"
      },
      {
         "id":164,
         "key":"Camille",
         "name":"Camille"
      },
      {
         "id":69,
         "key":"Cassiopeia",
         "name":"Cassiopeia"
      },
      {
         "id":31,
         "key":"Chogath",
         "name":"Cho'Gath"
      },
      {
         "id":42,
         "key":"Corki",
         "name":"Corki"
      },
      {
         "id":122,
         "key":"Darius",
         "name":"Darius"
      },
      {
         "id":131,
         "key":"Diana",
         "name":"Diana"
      },
      {
         "id":36,
         "key":"DrMundo",
         "name":"Dr. Mundo"
      },
      {
         "id":119,
         "key":"Draven",
         "name":"Draven"
      },
      {
         "id":245,
         "key":"Ekko",
         "name":"Ekko"
      },
      {
         "id":60,
         "key":"Elise",
         "name":"Elise"
      },
      {
         "id":28,
         "key":"Evelynn",
         "name":"Evelynn"
      },
      {
         "id":81,
         "key":"Ezreal",
         "name":"Ezreal"
      },
      {
         "id":9,
         "key":"Fiddlesticks",
         "name":"Fiddlesticks"
      },
      {
         "id":114,
         "key":"Fiora",
         "name":"Fiora"
      },
      {
         "id":105,
         "key":"Fizz",
         "name":"Fizz"
      },
      {
         "id":3,
         "key":"Galio",
         "name":"Galio"
      },
      {
         "id":41,
         "key":"Gangplank",
         "name":"Gangplank"
      },
      {
         "id":86,
         "key":"Garen",
         "name":"Garen"
      },
      {
         "id":150,
         "key":"Gnar",
         "name":"Gnar"
      },
      {
         "id":79,
         "key":"Gragas",
         "name":"Gragas"
      },
      {
         "id":104,
         "key":"Graves",
         "name":"Graves"
      },
      {
         "id":120,
         "key":"Hecarim",
         "name":"Hecarim"
      },
      {
         "id":74,
         "key":"Heimerdinger",
         "name":"Heimerdinger"
      },
      {
         "id":420,
         "key":"Illaoi",
         "name":"Illaoi"
      },
      {
         "id":39,
         "key":"Irelia",
         "name":"Irelia"
      },
      {
         "id":427,
         "key":"Ivern",
         "name":"Ivern"
      },
      {
         "id":40,
         "key":"Janna",
         "name":"Janna"
      },
      {
         "id":59,
         "key":"JarvanIV",
         "name":"Jarvan IV"
      },
      {
         "id":24,
         "key":"Jax",
         "name":"Jax"
      },
      {
         "id":126,
         "key":"Jayce",
         "name":"Jayce"
      },
      {
         "id":202,
         "key":"Jhin",
         "name":"Jhin"
      },
      {
         "id":222,
         "key":"Jinx",
         "name":"Jinx"
      },
      {
         "id":429,
         "key":"Kalista",
         "name":"Kalista"
      },
      {
         "id":43,
         "key":"Karma",
         "name":"Karma"
      },
      {
         "id":30,
         "key":"Karthus",
         "name":"Karthus"
      },
      {
         "id":38,
         "key":"Kassadin",
         "name":"Kassadin"
      },
      {
         "id":55,
         "key":"Katarina",
         "name":"Katarina"
      },
      {
         "id":10,
         "key":"Kayle",
         "name":"Kayle"
      },
      {
         "id":141,
         "key":"Kayn",
         "name":"Kayn"
      },
      {
         "id":85,
         "key":"Kennen",
         "name":"Kennen"
      },
      {
         "id":121,
         "key":"Khazix",
         "name":"Kha'Zix"
      },
      {
         "id":203,
         "key":"Kindred",
         "name":"Kindred"
      },
      {
         "id":240,
         "key":"Kled",
         "name":"Kled"
      },
      {
         "id":96,
         "key":"KogMaw",
         "name":"Kog'Maw"
      },
      {
         "id":7,
         "key":"Leblanc",
         "name":"LeBlanc"
      },
      {
         "id":64,
         "key":"LeeSin",
         "name":"Lee Sin"
      },
      {
         "id":89,
         "key":"Leona",
         "name":"Leona"
      },
      {
         "id":127,
         "key":"Lissandra",
         "name":"Lissandra"
      },
      {
         "id":236,
         "key":"Lucian",
         "name":"Lucian"
      },
      {
         "id":117,
         "key":"Lulu",
         "name":"Lulu"
      },
      {
         "id":99,
         "key":"Lux",
         "name":"Lux"
      },
      {
         "id":54,
         "key":"Malphite",
         "name":"Malphite"
      },
      {
         "id":90,
         "key":"Malzahar",
         "name":"Malzahar"
      },
      {
         "id":57,
         "key":"Maokai",
         "name":"Maokai"
      },
      {
         "id":11,
         "key":"MasterYi",
         "name":"Master Yi"
      },
      {
         "id":21,
         "key":"MissFortune",
         "name":"Miss Fortune"
      },
      {
         "id":62,
         "key":"MonkeyKing",
         "name":"Wukong"
      },
      {
         "id":82,
         "key":"Mordekaiser",
         "name":"Mordekaiser"
      },
      {
         "id":25,
         "key":"Morgana",
         "name":"Morgana"
      },
      {
         "id":267,
         "key":"Nami",
         "name":"Nami"
      },
      {
         "id":75,
         "key":"Nasus",
         "name":"Nasus"
      },
      {
         "id":111,
         "key":"Nautilus",
         "name":"Nautilus"
      },
      {
         "id":76,
         "key":"Nidalee",
         "name":"Nidalee"
      },
      {
         "id":56,
         "key":"Nocturne",
         "name":"Nocturne"
      },
      {
         "id":20,
         "key":"Nunu",
         "name":"Nunu"
      },
      {
         "id":2,
         "key":"Olaf",
         "name":"Olaf"
      },
      {
         "id":61,
         "key":"Orianna",
         "name":"Orianna"
      },
      {
         "id":516,
         "key":"Ornn",
         "name":"Ornn"
      },
      {
         "id":80,
         "key":"Pantheon",
         "name":"Pantheon"
      },
      {
         "id":78,
         "key":"Poppy",
         "name":"Poppy"
      },
      {
         "id":133,
         "key":"Quinn",
         "name":"Quinn"
      },
      {
         "id":497,
         "key":"Rakan",
         "name":"Rakan"
      },
      {
         "id":33,
         "key":"Rammus",
         "name":"Rammus"
      },
      {
         "id":421,
         "key":"RekSai",
         "name":"Rek'Sai"
      },
      {
         "id":58,
         "key":"Renekton",
         "name":"Renekton"
      },
      {
         "id":107,
         "key":"Rengar",
         "name":"Rengar"
      },
      {
         "id":92,
         "key":"Riven",
         "name":"Riven"
      },
      {
         "id":68,
         "key":"Rumble",
         "name":"Rumble"
      },
      {
         "id":13,
         "key":"Ryze",
         "name":"Ryze"
      },
      {
         "id":113,
         "key":"Sejuani",
         "name":"Sejuani"
      },
      {
         "id":35,
         "key":"Shaco",
         "name":"Shaco"
      },
      {
         "id":98,
         "key":"Shen",
         "name":"Shen"
      },
      {
         "id":102,
         "key":"Shyvana",
         "name":"Shyvana"
      },
      {
         "id":27,
         "key":"Singed",
         "name":"Singed"
      },
      {
         "id":14,
         "key":"Sion",
         "name":"Sion"
      },
      {
         "id":15,
         "key":"Sivir",
         "name":"Sivir"
      },
      {
         "id":72,
         "key":"Skarner",
         "name":"Skarner"
      },
      {
         "id":37,
         "key":"Sona",
         "name":"Sona"
      },
      {
         "id":16,
         "key":"Soraka",
         "name":"Soraka"
      },
      {
         "id":50,
         "key":"Swain",
         "name":"Swain"
      },
      {
         "id":134,
         "key":"Syndra",
         "name":"Syndra"
      },
      {
         "id":223,
         "key":"TahmKench",
         "name":"Tahm Kench"
      },
      {
         "id":163,
         "key":"Taliyah",
         "name":"Taliyah"
      },
      {
         "id":91,
         "key":"Talon",
         "name":"Talon"
      },
      {
         "id":44,
         "key":"Taric",
         "name":"Taric"
      },
      {
         "id":17,
         "key":"Teemo",
         "name":"Teemo"
      },
      {
         "id":412,
         "key":"Thresh",
         "name":"Thresh"
      },
      {
         "id":18,
         "key":"Tristana",
         "name":"Tristana"
      },
      {
         "id":48,
         "key":"Trundle",
         "name":"Trundle"
      },
      {
         "id":23,
         "key":"Tryndamere",
         "name":"Tryndamere"
      },
      {
         "id":4,
         "key":"TwistedFate",
         "name":"Twisted Fate"
      },
      {
         "id":29,
         "key":"Twitch",
         "name":"Twitch"
      },
      {
         "id":77,
         "key":"Udyr",
         "name":"Udyr"
      },
      {
         "id":6,
         "key":"Urgot",
         "name":"Urgot"
      },
      {
         "id":110,
         "key":"Varus",
         "name":"Varus"
      },
      {
         "id":67,
         "key":"Vayne",
         "name":"Vayne"
      },
      {
         "id":45,
         "key":"Veigar",
         "name":"Veigar"
      },
      {
         "id":161,
         "key":"Velkoz",
         "name":"Vel'Koz"
      },
      {
         "id":254,
         "key":"Vi",
         "name":"Vi"
      },
      {
         "id":112,
         "key":"Viktor",
         "name":"Viktor"
      },
      {
         "id":8,
         "key":"Vladimir",
         "name":"Vladimir"
      },
      {
         "id":106,
         "key":"Volibear",
         "name":"Volibear"
      },
      {
         "id":19,
         "key":"Warwick",
         "name":"Warwick"
      },
      {
         "id":498,
         "key":"Xayah",
         "name":"Xayah"
      },
      {
         "id":101,
         "key":"Xerath",
         "name":"Xerath"
      },
      {
         "id":5,
         "key":"XinZhao",
         "name":"Xin Zhao"
      },
      {
         "id":157,
         "key":"Yasuo",
         "name":"Yasuo"
      },
      {
         "id":83,
         "key":"Yorick",
         "name":"Yorick"
      },
      {
         "id":154,
         "key":"Zac",
         "name":"Zac"
      },
      {
         "id":238,
         "key":"Zed",
         "name":"Zed"
      },
      {
         "id":115,
         "key":"Ziggs",
         "name":"Ziggs"
      },
      {
         "id":26,
         "key":"Zilean",
         "name":"Zilean"
      },
      {
         "id":142,
         "key":"Zoe",
         "name":"Zoe"
      },
      {
         "id":143,
         "key":"Zyra",
         "name":"Zyra"
      }
   ]
}
```
</details>

### Runes by Champion
<details>
  <summary><code>POST</code> /rune/champion</summary>
   
**Request body**
``` json
{
  "champion":"Aatrox"
}
```

**Response**
``` json
{
   "roles":[
      {
         "role":"Top",
         "runes":{
            "primary":{
               "id":8000,
               "runes":[
                  8008,
                  9111,
                  9104,
                  8014
               ]
            },
            "secondary":{
               "id":8400,
               "runes":[
                  8430,
                  8453
               ]
            },
            "spellStyle":41.94736842105263,
            "damageStyle":20.0
         }
      },
      {
         "role":"Jungle",
         "runes":{
            "primary":{
               "id":8000,
               "runes":[
                  8008,
                  9111,
                  9104,
                  8299
               ]
            },
            "secondary":{
               "id":8300,
               "runes":[
                  8304,
                  8410
               ]
            },
            "spellStyle":43.3955223880597,
            "damageStyle":22.388059701492537
         }
      }
   ]
}
```
</details>

## Authors

* **Owen Sawyer** - [OwenSawyer](https://github.com/OwenSawyer)
* **Meeral Qureshi** - [MeeralQureshi](https://github.com/MeeralQureshi)

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
