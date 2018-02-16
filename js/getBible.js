(function() {
	"use strict";
	const development = true;

	const booknames = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', '1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalms', 'proverbs', 'ecclesiastes', 'song of solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1-corinthians', '2-corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', '1-thessalonians', '2-thessalonians', '1-timothy', '2-timothy', 'titus', 'philemon', 'hebrews', 'james', '1-peter', '2-peter', '1-john', '2-john', '3-john', 'jude', 'revelation'];

	const getTime = () => {
		postMessage({"thetime": Date.now()});
	};

	const getBook = (bookname) => {
		return fetch(`http://127.0.0.1:3000/books/view/${bookname}`).then(response => {
			return response.json();
		}).then(book => {
			return book;
		});
	};

	const sendBook = (book) => {
		postMessage({"yourbookhasarrived": book});
	};

	const sendError = (err) => {
		postMessage({"error": err});
	};

	const startDownloads = () => {
		postMessage({"msg": "Starting downloads now..."});

		for (let name of booknames) {
			postMessage({"msg": `skipping ${name}, cus Im a good boy.`});
			continue;
			// if (name === 'exodus') {
			// 	postMessage({"msg": `skipping ${name}, cus Im a good boy.`});
			// 	continue;
			// } else if (name === 'leviticus') {
			// 	postMessage({"msg": `skipping ${name}, cus Im a good boy.`});
			// 	continue;
			// } else if (name === 'genesis') {

			// } else {
			// 	getBook(name).then(sendBook, sendError);
			// }
		}
	};

	const stopDownloads = () => {
		postMessage({"msg": "Stopping downloads now."});
	};

	self.addEventListener('message', function(e) {
		var data = e.data,
			cmd = (data.cmd) ? data.cmd: null;

		if (!cmd) {
			postMessage({"msg": "no command sent"});
			return;
		}

		switch(cmd) {
			case 'start':
				startDownloads();
				break;
			case 'stop':
				stopDownloads();
				break;
			case 'getTime':
				getTime();
				break;
		}
	}, false);
}());