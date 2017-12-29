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
> Short blurb about what your product does.

One to two paragraph statement about your product and what it does.

![pic](header.png)

### Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

### Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

What things you need to install the software and how to install them

```
Give examples
```

### Installing


* `npm install`
* `npm run webpack`
* `pip install -r requirements.txt`
* `python manage.py runserver`

### Deployment

Add additional notes about how to deploy this on a live system

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

## Release History

* 0.1.0 12/31/17
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1 12/29/17
    * Work in progress

## Authors

* **John Doe** - *Initial work* - [JohnDoe](https://github.com/JohnDoe)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the **BSD License** - see the [LICENSE.md](LICENSE.md) file for details.


## FAQ
### What do I need to know before I start using the API?
Got rust on your skills? No worries. Here are the docs you might need to get started:

- HTTPS protocol
- [REST software pattern][]
- Authentication with [OAuth][] (or the official [Beginner’s Guide][])
- Data serialization with [JSON][] (or see a [quick tutorial][])

### Why did you decide to do *insert bad coding practice here*?
time
