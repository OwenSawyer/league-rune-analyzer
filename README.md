Todo
1) High priority
    * get prod api key / apply to contest
    * improve match history (add players to Backend)
    * fix bad role readings -> default to a popular page for another role if no info available
    * title the your rune / popular rune panels
    * write DOCUMENTATION!

2) Low Priority
    * dynamic slides (filter matches by current champ)
    * better rune descriptions (scrape / copy from opgg)
    * Cleanup css for primary/secondary pages (merge into 1 panel)?
    * New page -> view popular runes for a champion from some champion list..

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

### Runes
<details>
  <summary><code>GET</code> photos</summary>
   
**Request body**
``` json
{
  "a": "popular",
  "b": "b
}
```

**Response**
``` json
{
  "feature": "popular",
  "filters": {
      "category": false,
      "exclude": false
  },
  "current_page": 1,
  "total_pages": 250,
  "total_items": 5000
}
```
</details>

## Authors

* **Owen Sawyer** - [OwenSawyer](https://github.com/OwenSawyer)
* **Meeral Qureshi** - [MeeralQureshi](https://github.com/MeeralQureshi)

## License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE) file for details.
