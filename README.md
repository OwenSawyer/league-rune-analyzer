# Champions Reforged

### (Submission for Riot Games API Challenge 2017 - Educate Category)

https://champions-reforged.herokuapp.com/

> Choose better runes for the champions you play!

Our project allows users to look up their match histories and view the champions they have recently played, and which runes they selected on each one. Not only that, but users are also able to see how their runes compare to the optimal runes for each champion. A "Rune rating" also gives players more insight into how well their chosen runes fit with the champion and the champion's assigned role (e.g. Mage, Tank etc.)

For more information about any rune, all rune icons on the page are click-able, and can provide more information about the rune itself, and how they add to a current champion's statistics in terms of Attack, Defense, Toughness, Mobility and Utility. We also provide a comparison of which roles each rune is most picked on, so that players can see the trends between runes and champion roles. This information feature, and the comparison between chosen and optimal runes are the highlights of our project, and what we believe will really help players understand the new runes and how to optimize them on their favourite champions.

We also feature a page where users can click any champion and view their most popular runes by role. (The 'View Champions' tab in the nav bar)

![Champions Reforged](assets/img/screenshot.PNG?raw=true "Champions Reforged")

### Synopsis

This project is an application based on the Django REST framework along with React JS on the frontend. Our backend uses the Riot API to request match histories, match information and player information, while using Data Dragon for static information such as images, rune information etc. We aggregate common trends between champions/roles and rune choices to display this information in the form of graphs and ratings to help players improve. On the frontend, we used Bootstrap along with React to provide a dynamic, appealing and easy-to-use platform for players to interact with. 

### Motivation

The main motivation behind this project, was to create an application for the 2017 Riot Games API Challenge. While we did develop this application as part of the challenge, we mainly took this as an opportunity to grow as developers and explore new frameworks. The best part about this experience, is that we have now created something that we can use ourselves, and share with other League of Legends players!

## Getting Started


To run this project locally, clone this repository and follow the installation steps below:

### Installing

This project requires python 3+
Start by setting a system environment variable `RIOT_API_KEY` with your Riot Developer API key as the value. Then run the following commands in the root folder of your cloned repository:

* `npm install`
* `pip3 install -r requirements.txt`
* `npm run webpack`
* `python manage.py collectstatic`
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
      ...
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
         "name":"Aatrox",
         "attr": {
             "attack": 2, 
             "defense": 2, 
             "toughness": 2, 
             "mobility": 2, 
             "utility": 0
             }
      },
      {
         "id":103,
         "key":"Ahri",
         "name":"Ahri",
         "attr": {
             "attack": 3, 
             "defense": 1, 
             "toughness": 2, 
             "mobility": 3, 
             "utility": 0
             }
      },
      {
         "id":84,
         "key":"Akali",
         "name":"Akali",
         "attr": {
             "attack": 3, 
             "defense": 1, 
             "toughness": 1, 
             "mobility": 3, 
             "utility": 1
             }
      },
      ...
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
