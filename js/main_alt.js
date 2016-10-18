var Person = function() {
	this.id = uuid.v4();

	this.relationships = {
		family: {
			id: '',
			parents: {
				father: {},
				mother: {}
			},
			spouse: {},
			siblings: {
				brothers: [],
				sisters: [],
				unknown: [],
			},
			spouses: [],
			children: []
		},
		friends: []
	};

	this.name = {
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

	this.race = '';

	this.birth = {
		date: '',
		location: ''
	};
	this.death = {
		date: '',
		location: '',
		cause: ''
	};


	this.height = {
		feet: 0,
		inches: 0
	};

	this.weight = {
		pounds: 0,
		ounces: 0
	};

	this.attributes = {
		hair: {
			color: ''
		},
		eyes: {
			color: ''
		},
		handed: '' // left, right, or ambidexterous
	};

	this.color = '';
	this.hair = '';
	this.eyes = '';
	this.handed = '';

	/**
	 * make this a prototypal method
	 * @type {Boolean}
	 */
	this.living = true;
};


Person.prototype.sayMyName = function() {
	return (this.preferred_name) ? this.preferred_name: this.first_name;
};

Person.prototype.howTall = function() {
	return parseInt(this.height.feet, 10) + "' " + parseInt(this.height.inches, 10) + "\"";
};

Person.prototype.siblings = function() {
	var parents = this.relationships.parents,
		siblings = this.relationships.siblings,
		father_id = parents.father.id,
		mother_id = parents.mother.id,
		paternal_half_siblings = {
			brothers: [],
			sisters: [],
			unknown: []
		},
		maternal_half_siblings = {
			brothers: [],
			sisters: [],
			unknown: []
		},
		population = People.length,
		i = 0;

	for (var i = population - 1; i >= 0; i--) {
		var person = People[i],
			pID = person.id,
			pFatherID = person.father.id,
			pMotherID = person.mother.id,
			pSex = person.sex,
			sID = self.id,
			sFatherID = self.father.id,
			sMotherID = self.mother.id,
			isSameFather = (pFatherID === sFatherID) ? true: false,
			isSameMother = (pMotherID === sMotherID) ? true: false,
			isMale = (pSex === 'm') ? true: false,
			isFemale = (pSex === 'f') ? true: false,
			isMyself = (pID === sID) ? true: false;

		if (isMyself) {
			continue;
		}

		if (isSameFather && isSameMother) {
			if (isMale) {
				console.log(person.preferred_name + ' is a male. ===> brother');
				siblings.brothers.push(person);
			} else if (isFemale) {
				console.log(person.preferred_name + ' is a female. ===> sister');
				siblings.sisters.push(person);
			} else {
				console.log('We don\'t know whether or not ' + person.preferred_name + ' is a male or a female. ===> unknown');
				siblings.unknown.push(person);
			}
		}

		if (isSameFather && !isSameMother) {
			!!development && console.log('paternal half sibling');
			if (isMale) {
				paternal_half_siblings.brothers.push(person);
			} else if (isFemale) {
				paternal_half_siblings.sisters.push(person);
			} else {
				paternal_half_siblings.unknown.push(person);
			}
		}

		if (!isSameFather && isSameMother) {
			!!development && console.log('maternal half sibling');
			if (isMale) {
				maternal_half_siblings.brothers.push(person);
			} else if (isFemale) {
				maternal_half_siblings.sisters.push(person);
			} else {
				maternal_half_siblings.unknown.push(person);
			}
		}
	}

	if (paternal_half_siblings.brothers.length) {
		var phbs = [];
		phbs['paternal_half_brothers'] = paternal_half_siblings.brothers;
		siblings.brothers.push(phbs);
	}
	if (paternal_half_siblings.sisters.length) {
		var phss = [];
		phss['paternal_half_sisters'] = paternal_half_siblings.sisters;
		siblings.sisters.push(phss);
	}
	if (paternal_half_siblings.unknown.length) {
		var phu = [];
		phu['paternal_half_unknowns'] = paternal_half_siblings.unknown;
		siblings.unknown.push(phu);
	}
	if (maternal_half_siblings.brothers.length) {
		var mhbs = [];
		mhbs['maternal_half_brothers'] = maternal_half_siblings.brothers;
		siblings.brothers.push(mhbs);
	}
	if (maternal_half_siblings.sisters.length) {
		var mhss = [];
		mhss['maternal_half_sisters'] = maternal_half_siblings.sisters;
		siblings.sisters.push(mhss);
	}
	if (maternal_half_siblings.unknown.length) {
		var mhu = [];
		mhu['maternal_half_unknowns'] = maternal_half_siblings.unknown;
		siblings.unknown.push(mhu);
	}
	if (siblings.brothers.length || siblings.sisters.length || siblings.unknown.length) {
		return siblings;
	}
};

Person.prototype.parents = function() {
	var rents = {},
		foundFather = false,
		foundMother = false,
		population = People.length,
		i = 0;

	for (var i = population - 1; i >= 0; i--) {
		var person = People[i];
		if (person.id === this.relationships.parents.father.id) {
			foundFather = true;
			rents.father = person;
		}
		if (person.id === this.relationships.parents.mother.id) {
			rents.mother = person;
		}
	}

	if (foundFather && foundMother) {
		return rents;
	}
}

Person.prototype.grandparents = function() {
	var self = this,
		myFather,
		myMother,
		grandparents = {
			paternal: [],
			maternal: []
		},
		father_id = this.relationships.parents.father.id,
		mother_id = this.relationships.parents.mother.id,
		getGrandParents = function(myParent) {
			console.log('in getPaternalParents()');
			if (myParent.sex === "m") {
				var pgfId = myParent.relationships.parents.father.id,
					pfmId = myParent.relationships.parents.mother.id,
					pgf = [], pgm = [];


				$.each(People, function(i, person) {
					if (parseInt(person.id, 10) === pgfId) {
						pgf['paternal_grandfather'] = person;
						grandparents.paternal.push(pgf);
					} else if (parseInt(person.id, 10) === pgmId) {
						pgm['paternal_grandmother'] = person;
						grandparents.paternal.push(pgm);
					}
				});
			} else {
				var mgf = [], mgm = [];
				$.each(People, function(i, person) {
					if (parseInt(person.id, 10) === myParent.father) {
						mgf['maternal_grandfather'] = person;
						grandparents.maternal.push(mgf);
					} else if (parseInt(person.id, 10) === myParent.mother) {
						mgm['maternal_grandmother'] = person;
						grandparents.maternal.push(mgm);
					}
				});
			}
		};

	$.each(People, function(i, person) {
		if (parseInt(person.id, 10) === father_id || parseInt(person.id, 10) === mother_id) {
			getGrandParents(person);
		}
	});

	if (grandparents.maternal.length || grandparents.paternal.length) {
		return grandparents;
	}
};

Person.prototype.getChildren = function() {
	var self = this,
		myChildren = [];

	$.each(People, function(i, person) {
		if (parseInt(person.mother, 10) === parseInt(self.spouse.id, 10)) {
			myChildren.push(person);
		} else if (parseInt(person.father, 10) === parseInt(self.id, 10)) {
			myChildren.push(person);
		}
	});

	if (myChildren.length) {
		return myChildren;
	}
};

var Woman = (function() {
		var w = new Person;
		w.sex = 'f';
		return w;
	}),
	Man = (function() {
		var m = new Person;
		m.sex = 'm';
		return m;
	});