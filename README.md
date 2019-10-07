## gatsby-remark-video

Embeds video tag in your gatsby project

## Installation
```
npm install gatsby-remark-video
```

## Usage

In your markdown
```
`video: /shots-demo-369bfe714a6b8981ecfc743f7e7e7008.mp4`
```

For adding multiple sources, ensure the urls are separated by the `|` character

```
`video: https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm|https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4`
```

```
`video: /flower.webm|/flower.mp4`
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
		controls: true,
		loop: true
	}
}
```
