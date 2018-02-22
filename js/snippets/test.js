var Person = (function() {
	var names = {
		salutation: '',
		first: '',
		middle: '',
		last: {
			given: '',
			married: '',
			maiden: ''
		},
		nickname: '',
		preferred_name: '',
		suffix: ''
	};

	return {
		name: names
	};
}());