const visit = require('unist-util-visit');

const addVideo = ({ markdownAST }, options) => {

	visit(markdownAST, 'inlineCode', (node) => {
		const { value } = node;
		const matches = value.match(/video:?\s(.*)+/i);

		if(matches) {
			const url = matches[1].trim();

			node.type = 'html';
			node.value = renderVideoTag(url, options);
		}
	});

};

const renderVideoTag = (url, options) => {

	const videoNode = `
		<video
			src=${url}
			width="${options.width}"
			height="${options.height}"
			preload="${options.preload}"
			muted="${options.muted}"
			${options.autoplay ? 'autoplay' : ''}
			${options.loop ? 'loop' : ''}
		></video>
	`;

	return videoNode;
};

module.exports = addVideo;
