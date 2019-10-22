## gatsby-remark-video

Embeds video tag in your gatsby project

## Installation
```
npm install gatsby-remark-video
```

## Usage

In your markdown
```
`video: /static/shots-demo-369bfe714a6b8981ecfc743f7e7e7008.mp4`
```

You can also add a title to the video tag by adding it in your markdown

```
`video: title: "Short demo": /static/shots-demo-369bfe714a6b8981ecfc743f7e7e7008.mp4`
```

Keep in mind that you need double quotes in order to title a video.
You can also escape a double quote the way you might expect:
```
`video: title: "Short \"demo\"": /static/shots-demo-369bfe714a6b8981ecfc743f7e7e7008.mp4`
```
 
Add the following in your `gatsby-config.js`
```javascript
{
	resolve: 'gatsby-remark-video',
	options: {
		width: 800,
		height: 'auto',
		preload: 'auto',
		muted: true,
		autoplay: true,
		playsinline: true,
		controls: true,
		loop: true
	}
}
```
