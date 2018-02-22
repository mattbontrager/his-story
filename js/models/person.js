'use strict';
const siblingTypes = ['brother', 'sister'];
const childrenTypes = ['son', 'daughter'];
const sexes = ['male', 'female'];
const handedness = ['left', 'right', 'ambidexterous', 'unknown'];
const hairLength = ['short', 'medium', 'long', 'unknown'];
const skinColors = ['red', 'brown', 'yellow', 'black', 'white', 'unknown'];
const hairColors = ['black', 'brunette', 'dark brown', 'brown', 'light brown', 'auburn', 'copper', 'red', 'strawberry blond', 'blond', 'blonde', 'light blonde', 'grey', 'white'];
const eyeColors = ['amber', 'blue', 'brown', 'grey', 'green', 'hazel']
const salutations = ['Dr.', 'Mr.', 'Mrs.', 'Ms.'];
const suffixes = ['Jr.', 'Sr.', 'III', 'IV'];
const titles = ['Ph.D.', 'Esq.', 'M.D.'];
const relationshipTypes = ['parents', 'spouse', 'spouses', 'siblings', 'children', 'colleagues', 'friends', 'acquaintences'];
var Person = {
	sex: sexes,
	name: {
		salutation: salutations,
		first: '',
		middle: '',
		last: {
			given: '',
			adopted: '',
			married: '',
			maiden: ''
		},
		nickname: '',
		preferred: '',
		suffix: suffixes,
		title: titles
	},
	dates: {
		birth: {
			date: 'date',
			location: '',
			ageOfFatherAtTimeOfBirth: 'date',
			ageOfMotherAtTimeOfBirth: 'date'
		},
		death: {
			date: 'date',
			location: '',
			cause: ''
		},
		lifespan: 'number'
	},
	attributes: {
		physical: {
			height: {
				feet: 'number',
				inches: 'number'
			},
			weight: {
				pounds: 'number'
			},
			hair: {
				color: hairColors,
				'length': hairLength
			},
			eyes: {
				color: eyeColors
			},
			handed: handedness,
			skin_color: skinColors
		}
	},
	relationships: {
		parents: {
			mother: '',
			father: ''
		},
		spouse: '',
		siblings: siblingTypes,
		children: childrenTypes
	}
};

const labels = (l) => {
	return `<label for="${l.name}">${l.text}</label>`
};

const sel = (i) => {
	let opts = [];
	i.opts.forEach(o => {
		opts.push(opt(o));
	});
	let $select = $('<select />', {
		name: i.name,
		id: i.id,

	});
	$select.append(opts.join(''));
	return $select;
};
const opt = (o) => {
	return `<option class="${o.klass}" name="${o.name}" value="${o.value}">${o.text}></option>`;
};
const text = (t) => {
	return $('<input />', {
		type: 'text',
		'class': t.type,
		id: t.id,
		name: t.name,
		placeholder: t.placeholder
	});
};


//called with every property and its value
function process(key, value) {
	if (!Array.isArray(value) && typeof value === "object") {
		traverse(value, process);
	} else {
    console.log(key + " : "+value);
	}
}

function handleFieldset(fsName, objs) {
	console.count('fieldset: ' + JSON.stringify(fsName));
	for (var i in objs) {
    	process.apply(this,[i, objs[i]]);
	    // if (objs[i] !== null && !Array.isArray(objs[i]) && typeof(objs[i])=="object") {
	    //     //going one step down in the object tree!!
	    //     traverse(objs[i],process);
	    // } else {
	    // }
	}
}


function traverse(o,func) {
	console.log('o: ', o);
    for (var i in o) {
        if (o[i] !== null && !Array.isArray(o[i]) && typeof(o[i])=="object") {
            //going one step down in the object tree!!
            if (Object.keys(o[i].length) > 1) {
            	traverse(o[i],func);
            } else {
	            handleFieldset(i, o[i]);
            }
        } else {
        		func.apply(this,[i,o[i]]);
        }
    }
}