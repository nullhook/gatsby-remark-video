const visit = require('unist-util-visit');
const regFileExtension = /(?:\.([^.]+))?$/;

const matchRegExp = new RegExp(
	// Look for a "video" and then possibly ':' and then a space
	`video:?\\s` +
	// Then, optionally find "title" and then possible :
	`(?:title:?\\s"(` +
	// '.*?(?!\\").' is a trick to negative lookbehind (since negative look-behinds have poor node support for now)
	// It allows us to be a able to get "any \"escaped\" quoted value" but lazily to avoid grabbing too much
	`.*?(?!\\\\").)"` +
	// The : is optional much like with 'video', but the title itself is also optional entirely
	`:?\\s)?` +
	// Then grab the video path from the string
	`(.*)`,
	// Make it insensitive
	'i'
);

const addVideo = ({markdownAST}, options) => {

	visit(markdownAST, 'inlineCode', (node) => {
		const {value} = node;
		const matches = value.match(matchRegExp);

		if (matches) {
			const title = matches[1]; // May be null
      const url = matches[2].trim();
      const sources = url.split('|');
      const sourceTags = renderVideoSources(sources);

			node.type = 'html';
			node.value = renderVideoTag(sourceTags, {
				...options,
				title: title || url
			});
		}
	});
};

const renderVideoTag = (sourceTags, options) => {
  const videoNode = `
		<video
			width="${options.width}"
			height="${options.height}"
			preload="${options.preload}"
			muted="${options.muted}"
			title="${options.title}"
			${options.autoplay ? 'autoplay' : ''}
			${options.playsinline ? 'playsinline' : ''}
			${options.controls ? 'controls' : ''}
			${options.loop ? 'loop' : ''}
		>
		${sourceTags.join('')}
		</video>
	`;

  return videoNode;
};

const renderVideoSources = sources => {
  const sourceTags = sources.map(source => {
    const extensionMatches = regFileExtension.exec(source);
    const mimeType = getMimeType(extensionMatches[1]);
    const mimeAttr = mimeType ? `type='video/${mimeType}'` : '';
    const sourceTag = `<source src='${source}' ${mimeAttr}></source>`;

    return sourceTag;
  });
  return sourceTags;
};

const getMimeType = extension => {
  switch (extension) {
    case 'mp4':
      return 'mp4';
    case 'ogg':
      return 'ogg';
    case 'ogv':
      return 'ogg';
    case 'webm':
      return 'webm';
    default:
      return '';
  }
};

module.exports = addVideo;
