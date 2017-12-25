Django Rest Framework + React
=============================
Example code for the tutorial found at [geezhawk.github.io](http://geezhawk.github.io/using-react-with-django-rest-framework).

To try it yourself, clone the repo and run:

* `npm install`
* `npm run webpack`
* `pip install -r requirements.txt`
* `python manage.py runserver`

Flow:.
1) Login page -> Lookup player by name + region -> returns summoner id
    * If valid, open new page and make request for recent matches (requires summoner id and region)
      * Display the results on analysis page
        - host images static on frontend?
    
2) Analysis page
  * Have 20 matches displayed
    * on match click: make request game info (w/ summoner id and region) + make request opt runes
      * do async
        + pre load / save opt in backend; takes 3sec to load
        + OPT -> runes
        + Circles per rune -> aggregate and pre save (save FE vs BE?)
