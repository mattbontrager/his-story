'use strict';

export const log = (msg, arg = false) => {
	if (arg) {
		!!development && w.console && console.log && console.log(msg + ': ', arg);
	} else {
		!!development && w.console && console.log && console.log(msg);
	}
};