// @codekit-prepend "uuid.js", "hexify.js", "modernizr-custom.js", "moment.js", "jquery.js";

/**
 * HisStory (c) by Matt Bontrager
 *
 * HisStory is licensed under a
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
 *
 * You should have received a copy of the license along with this
 * work. If not, see <http://creativecommons.org/licenses/by-nc-nd/4.0/>.
 */

"use strict";

var development = true,
	w = window,
	store = w.localStorage,
	log = function log(msg, arg) {
		if (arguments.length < 2) {
			!!development && w.console && console.log && console.log(msg);
		} else {
			!!development && w.console && console.log && console.log(msg + ': ', arg);
		}
	},
	logER = function (msg, arg) {
		if (arguments.length < 2) {
			!!development && w.console && console.log && console.error(msg);
		} else {
			!!development && w.console && console.log && console.error(msg + ': ', arg);
		}
		return;
	},
	checkObjectLength = function checkObjectLength(obj) {
		!arguments.length && logER('no object passed to checkObjectLength');

		var has = Object.prototype.hasOwnProperty,
			key = 0;

		if (typeof obj !== "object") {
			return key;
		}

		for (var i in obj) {
			if (has.call(obj, i)) {
				key++;
			}
		}
		return key;
	},
	isEven = function isEven(num) {
		!num && logER('no num passed to isEven');

		log('in isEven' + num);
		return (parseInt(num, 10) %2 === 0) ? true: false;
	},
	/**
	 * The WindowBase64.btoa() method creates a base-64 encoded ASCII string
	 * from a String object in which each character in the string is treated
	 * as a byte of binary data.
	 *
	 * @date   2016-10-07
	 * @author mattbontrager
	 * @param  {String}   str the string to encode
	 * @return {String}       the encoded string
	 */
	encode = function encode(str) {
		!str && logER('no string to encode');
		return w.btoa(str);
	},

	/**
	 * The WindowBase64.atob() function decodes a string of data which has been
	 * encoded using base-64 encoding.
	 *
	 * @date   2016-10-07
	 * @author mattbontrager
	 * @param  {String}   str the string to decode
	 * @return {String}       the decoded string
	 */
	decode = function decode(str) {
		!str && logER('no string to decode');
		return w.atob(str);
	},
	/**
	 * Returns a random integer, 5 digits in length, each digit being between min and max
	 * @date   2016-10-07
	 * @author mattbontrager
	 * @return {Integer}       the random number
	 */
	getRandomNumber = function getRandomNumber() {
		var min = Math.ceil(11111),
			max = Math.floor(44444);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	Person = function Person() {
		this.id = uuid.v4();

		this.family_association = {
			up: '', // parents
			across: '', // spouse
			down: '' // children
		};

		this.relationships = {
			family: {
				id: '',
				parents: {
					father: '',
					mother: '',
					unknown: []
				},
				spouse: '',
				siblings: {
					brothers: [],
					sisters: [],
					unknown: [],
				},
				spouses: [],
				children: {
					sons: [],
					daughters: [],
					unknown: []
				}
			},
			friends: []
		};

		this.race = '';

		this.birth = {
			date: {},
			location: ''
		};

		this.death = {
			date: {},
			location: '',
			cause: ''
		};

		this.physical_attributes = {
			height: {
				feet: 0,
				inches: 0
			},
			weight: {
				pounds: 0,
				ounces: 0
			},
			hair: {
				color: ''
			},
			eyes: {
				color: ''
			},
			handed: '' // left, right, or ambidexterous
		};

		this.getLifeSpan = function getLifeSpan() {
			!!development && console.log('in getLifeSpan');

			var lifespan,
				birthday = moment(this.birth.date),
				deathday = (moment(this.death.date)) ? moment(this.death.date): false;

			if (!birthday || !deathday) {
				return false;
			}

			if (this.lifespan) {
				return this.lifespan;
			}

			var span = moment.preciseDiff(birthday, deathday, true),
				spanYears = {years: span.years},
				lsToSet = moment.duration().add(spanYears).humanize();

			this.lifespan = lsToSet;

			return this.lifespan;
		}

		this.setLifeSpan = function setLifeSpan(ls) {
			!!development && console.log('in setLifeSpan');
			if (!arguments.length) {
				logER('no span sent to setLifeSpan');
				return false;
			}
			this.lifespan = moment.duration().add(lifespan).humanize();
		};

		this.getSpouse = function getSpouse() {
			!!development && console.log('in getSpouse');
			return People.find(function(person) {
				return person.id === this.relationships.family.spouse;
			});
		};

		this.setSpouse = function setSpouse(sid) {
			!!development && console.log('in setSpouse');
			if (!arguments.length) {
				logER('no spouse id passed to set spouse');
				return false;
			}
			this.relationships.family.spouse = sid;
		}

		this.getChildren = function getChildren() {
			!!development && console.log('in getChildren');
			var childs = this.relationships.family.children,
				sons = childs.sons,
				daughters = childs.daughters,
				unknowns = childs.unknown,
				hasSons = sons.length,
				hasDaughters = daughters.length,
				hasUnknowns = unknowns.length,
				hasChildren = (hasSons || hasDaughters || hasUnknowns) ? true: false,
				children = [];
			if (!hasChildren) {
				return false;
			}
			if (hasSons) {
				$.each(sons, function(i, son) {
					var s = People.find(function(person) {
						person.id === son;
					});
					if (s) {
						children.push(s);
					}
				});
			}
			if (hasDaughters) {
				$.each(daughters, function(i, daughter) {
					var d = People.find(function(person) {
						person.id === daughter;
					});
					if (d) {
						children.push(s);
					}
				});
			}
			if (hasUnknowns) {
				$.each(unknowns, function(i, uk) {
					var u = People.find(function(person) {
						person.id === uk;
					});
					if (u) {
						children.push(u);
					}
				});
			}
			return children;
		};

		this.setChild = function setChild(childObj) {
			!!development && console.log('in setChild');
			if (!arguments.length) {
				logER('no childObj passed to setChild');
				return false;
			}
			this.relationships.family.children[childObj.type].push(childObj.child);
		};

		this.getSiblings = function getSiblings() {
			!!development && console.log('in getSiblings');
			var sibs = this.relationships.family.siblings,
				hasBrothers = sibs.brothers.length,
				brothers = (hasBrothers) ? sibs.brothers: undefined,
				hasSisters = sibs.sisters.length,
				sisters = (hasSisters) ? sibs.sisters: undefined,
				hasUnknowns = sibs.unknown.length,
				unknowns = (hasUnknowns) ? sibs.unknown: undefined,
				haveSiblings = (hasBrothers || hasSisters || hasUnknowns) ? true: false,
				siblings = [];

			if (!haveSiblings) {
				return false;
			}

			$.each(brothers, function(i, brother) {
				var b = People.find(function(person) {
					return person.id === brother;
				});
				if (b) {
					siblings.push(b);
				}
			});

			$.each(sisters, function(i, sister) {
				var s = People.find(function(person) {
					return person.id === sister;
				});
				if (s) {
					siblings.push(s);
				}
			});

			$.each(unknowns, function(i, uk) {
				var u = People.find(function(person) {
					return person.id === uk;
				});
				if (u) {
					siblings.push(u);
				}
			});
			return siblings;
		};

		this.setSibling = function setSibling(sibObj) {
			!!development && console.log('in setSibling');
			if (!arguments.length) {
				logER('no sibling id sent to setSibling');
				return false;
			}
			this.relationships.family.siblings[sibObj.type].push(sibObj.sibling);
		};

		this.getParents = function getParents() {
			!!development && console.log('in getParents');
			var pars = this.relationships.family.parents,
				mom = pars.mother,
				pop = pars.father,
				hasFather = false,
				hasMother = false,
				parents = {},
				father = People.find(function(person) {
					return person.id === pop.id;
				}),
				mother = People.find(function(person) {
					return person.id === mom.id;
				});

			if (father) {
				hasFather = true;
				parents.father = father;
			}
			if (mother) {
				hasMother = true;
				parents.mother = mother;
			}
			if (hasFather || hasMother) {
				return parents;
			} else {
				return false;
			}
		};

		this.setParent = function setParent(parentObj) {
			!!development && console.log('in setParent');
			if (!arguments.length) {
				logER('no parentObj sent to setParent');
				return false;
			}
			this.relationships.family.parents[parentObj.type] = parentObj.parent;
		};

		this.getGrandParents = function getGrandParents() {
			!!development && console.log('in getGrandParents');
			/**
			 * paternal grandparents
			 * @type {Array}
			 */
			var pgps = [],
			/**
			 * maternal grandparents
			 * @type {Array}
			 */
				mgps = [];

			/**
			 * TODO: finish this
			 */
		}

		this.setGrandParent = function setGrandParent(gParentObj) {
			!!development && console.log('in setGrandParent');
			if (!arguments.length) {
				logER('no gParentObj sent to setGrandParent');
				return false;
			}
			this.relationships.family.grandparents[gParentObj.type] = gParentObj.gParent;
			/**
			 * TODO: write this
			 */
		};

		return this;
	},
	Man = function Man(opts) {
		var m = new Person();
		m.sex = 'm';
		m.name = {
			salutation: '',
			first: '',
			middle: '',
			last: {
				given: '',
				adopted: ''
			},
			nickname: '',
			preferred: '',
			suffix: ''
		};

		if (arguments.length) {
			for (var i in opts) {
				if (i && opts.hasOwnProperty(i) && opts[i] !== '') {
					!!development && console.log('declaring ' + i + ' to ' + opts[i]);
					m[i] = opts[i];
				}
			}
		}
		return m;
	},
	Woman = function Woman(opts) {
		!!development && console.log('in Woman');
		var w = new Person();

		w.sex = 'f';
		w.name = {
			salutation: '',
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
			suffix: ''
		};

		if (arguments.length) {
			for (var i in opts) {
				if (i && opts.hasOwnProperty(i) && opts[i] !== '') {
					!!development && console.log('declaring ' + i + ' to ' + opts[i]);
					w[i] = opts[i];
				}
			}
		}
		return w;
	},
	People = [],
	$sex = $('form').find('#new-person-sex'),
	$people = $('#people'),
	$families = $('.families'),
	drags = $people.find('.male'),
	drops = $people.find('.female'),
	$nav = $('nav'),
	$navButton = $nav.find('button'),
	$formContainer = $('.formContainer'),
	App = (function App() {
		var getPerson = function getPerson(pid) {
				!!development && console.log('in getPerson');
				if (!arguments.length) {
					logER('no person id sent to getPerson');
					return false;
				}

				var person = People.find(function(person) {
					return person.id === pid;
				});

				return (person) ? person: false;
			},
			addChildForm = function addChildForm(parents) {
				!parents && logER('no parents were passed to addChildForm');
				if ($formContainer.is(':hidden')) {
					$formContainer.show();
				}

				$formContainer.loadTemplate('tpl/add-child-form.html', {
					fatherID: parents.father.id,
					motherID: parents.mother.id,
					newLastName: parents.father.name.last.given
				}, {success: formBindings});
			},
			handleIntercourse = function handleIntercourse(fatherID, motherID) {
				log('in handleIntercourse');
				if (arguments.length < 2) {
					logER('fatherID || motherID missing in handleIntercourse');
				}

				function marryThem(father, mother) {
					var parents = {};

					if (mother.relationships.family.parents.mother === father.relationships.family.spouse.id) {
						alert('incest alert!');
					}

					/**
					 * if the father has no current spouse, make the mother of his child his wife
					 *
					 * @date   2017-09-04
					 * @author mattbontrager
					 * @param  {string}   father.relationships.family.spouse id of the mother of his child
					 */
					if (!father.relationships.family.spouse) {
						father.relationships.family.spouse = mother.id;
					}

					/**
					 * if the mother of the child isn't his current wife, make it so and add the previous woman to the spouses array
					 *
					 * @date   2017-09-04
					 * @author mattbontrager
					 * @param  {string}   father.relationships.family.spouse   id of the mother of most recent child
					 */
					if (father.relationships.family.spouse !== mother.id) {
						father.relationships.family.spouses.push(father.relationships.family.spouse);
						father.relationships.family.spouse = mother.id;
					}

					/**
					 * if the mother is not married, marry her to the father
					 *
					 * @date   2017-03-27
					 * @author mattbontrager
					 * @param  {string}   mother.relationships.family.spouse   the mother's husband
					 *
					 */
					if (!mother.relationships.family.spouse) {
						mother.relationships.family.spouse = father.id;
					}

					/**
					 * if mother is currently married to another man, marry her to current man and add the previous man to the spouses array
					 *
					 * @date   2017-03-27
					 * @author mattbontrager
					 * @param  {string}   mother.relationships.family.spouse   the mother's current spouse
					 *
					 */
					if (mother.relationships.family.spouse !== father.id) {
						mother.relationships.family.spouses.push(mother.relationships.family.spouse);
						mother.relationships.family.spouse = father.id;
					}


					mother.name.last.maiden = (mother.name.last.adopted.length) ? mother.name.last.adopted: mother.name.last.given;
					mother.name.last.married = (father.name.last.adopted.length) ? father.name.last.adopted: father.name.last.given;

					/**
					 * update mothers last name in DOM
					 */
					var ladies = $('.female'),
						mom = $.each(function(li) {
							return $(li).data('id') === mother.id;
						}),
						$li = $(mom),
						$name = $li.find('.nameContainer'),
						$lastName = $name.find('.lastName');

					!!development && console.log('$lastName: ', $lastName);

					$lastName.text(mother.name.last.married);


					parents.father = father;
					parents.mother = mother;

					log('father', father);
					log('mother', mother);

					if (mother.relationships.family.parents.mother.length) {
						log('mothers mother', mother.relationships.family.parents.mother);
					}

					return parents;
				}

				var father = getPerson(fatherID),
					mother = getPerson(motherID),
					hasBothParents = (father && mother) ? true: false,
					hasFather = (father) ? true: false,
					hasMother = (mother) ? true: false,
					parents;

				if (!hasBothParents) {
					logER('couldnt find either the father or the mother. check here to find out.', {'father': father, 'mother': mother});
				} else if (!hasFather) {
					logER('couldnt find the father. check here to find out.', {'father': father});
				} else if (!hasMother) {
					logER('couldnt find the mother. check here to find out.', {'mother': mother});
				} else {
					parents = marryThem(father, mother);

					if (checkObjectLength(parents) > 0) {
						// var ppl = [parents.father, parents.mother];
						// updateLocalPeople(ppl);
						addChildForm(parents);
					} else {
						logER('unable to marry the parents', parents);
					}
				}
			},
			appendPerson = function appendPerson(the_person) {
				log('the_person: ', the_person);
				addPersonToDom(the_person);
				addPersonToStorage(the_person);
			},
			clearForm = function clearForm() {
				log('in clear form');
				$formContainer.fadeOut().css('background-color', 'inherit').empty();
			},
			personFactory = function personFactory(person) {
				!!development && console.log('in personFactory');
				if (!arguments.length) {
					!!development && console.error('no person sent to personFactory');
					return;
				}
			},
			addPersonToDom = function addPersonToDom(person) {
				/**
				 * TODO: create family associations
				 * 		 this will be for the visual grouping of families
				 * 		 e.g. familyUpId = uuid.v4(), // parents
				 * 		 	  familyAcrossId = uuid.v4() // spouse || theirOwnFamily
				 * 		 	  familyDownId = uuid.v4() // children
				 */

				if (!arguments.length) {
					logER('no person passed to addPersonToDom');
				}

				var isMale = (person.sex === 'm') ? true: false,
					theImage = (isMale) ? 'male': 'female',
					draggable = (isMale) ? "true": "false",
					classToAssign = 'personCard ' + theImage,
					thebday = moment(person.birth.date),
					bday = thebday.format("MMM Do, YYYY"),
					age = thebday.fromNow(true),
					thelastName = (function() {
						if (isMale) {
							return person.name.last.given;
						} else {
							log('married name', person.name.last.married);
							return person.name.last.married.length ? person.name.last.married: person.name.last.given;
						}
					}()),
					data = {
						elemID: person.id,
						theClass: classToAssign,
						isDraggable: draggable,
						firstName: person.name.first,
						middleName: person.name.middle,
						lastName: thelastName,
						personPicture: 'images/' + theImage + '.png',
						bday: age
					};

				if (person.name.last.maiden.length) {
					data.maidenName = ' (' + person.name.last.maiden + ') ';
				}

				if (person.name.preferred) {
					data.preferredName = person.name.preferred;
				}

				$people.loadTemplate("tpl/person.html", data, {append: true});
			},
			addPersonToStorage = function addPersonToStorage(the_person) {
				var storedPeople = JSON.parse(localStorage.getItem('People')) || [];
				storedPeople.push(the_person);
				localStorage.setItem('People', JSON.stringify(storedPeople));
			},
			initialPersonList = function initialPersonList() {
				log('in initialPersonList');
				$people.empty();

				/* trying with the template */

				$.each(People, function(i, person) {
					addPersonToDom(person);
				});
			},
			formBindings = function formBindings() {
				log('in form bindings');

				$('.show-death-date-and-time').hide();

				$('#first_name').focus();

				$('#living_or_dead').off('change').on('change', function(e) {
					e.preventDefault();
					e.stopPropagation();
					var $me = $(this),
						val = $me.val();

					if (val === 'no') {
						$('.show-death-date-and-time').show();
					} else if (val === 'yes') {
						$('.show-death-date-and-time').hide();
					}
				});

				$('form').off('submit').on('submit', function(e) {
					log('in submit form');
					e.preventDefault();
					e.stopPropagation();

					var $form = $('form'),
						$sex = $form.find('#new-person-sex'),
						newPerson = new Person($sex.val()),
						birthDay = $form.find('#birthdate').val(),
						birthTime = ($form.find('#birthtime').val()) ? $form.find('#birthtime').val(): undefined,
						birthDateAndTime = (function() {
							var comb = birthDay + ' ' + birthTime;
							return (!birthTime) ? moment(birthDay, 'YYYY-MM-DD'): moment(comb, 'YYYY-MM-DD HH:mm');
						}()),
						fatherID = (function() {
							return ($('#father_id').length) ? $('#father_id').val(): undefined;
						}()),
						motherID = (function() {
							return ($('#mother_id').length) ? $('#mother_id').val(): undefined;
						}());

					if (!newPerson) {
						logER('no person');
					}

					if (fatherID) {
						newPerson.relationships.family.parents.father = $('#father_id').val();
					}
					if (motherID) {
						newPerson.relationships.family.parents.mother = $('#mother_id').val();
					}
					newPerson.name.first = $('#first_name').val();
					newPerson.name.middle = $('#middle_name').val();
					newPerson.name.last.given = $('#last_name').val();
					newPerson.birth.date = birthDateAndTime;

					People.push(newPerson);

					appendPerson(newPerson);

					clearForm();
				});
			},
			bindings = function bindings() {
				log('in bindings');
				var createItem = function(item) {
					log('in createItem', item);
					var newPerson,
						$fc = $('.formContainer'),
						fcBGC = (item === "male") ? "blue": "pink";
						// fcBGC = (item === "male" || "m") ? "white": "white";


					newPerson = new Person(item.charAt(0));

					if ($fc.is(':hidden')) {
						$fc.show();
					}

					$fc.css('background-color', fcBGC);
					$fc.loadTemplate('tpl/add-person-form.html', {
						newPersonSex: newPerson.sex
					}, {success: formBindings});
				}, revealElement = function(elem) {
					log('in reveal element with ', elem);
					var $element = $('.' + elem),
						$sib = $element.siblings();

					$sib.hide();
					$element.fadeIn();
				};

				$navButton.off('click').on('click', function(e) {
					log('in nav button click', $(e.target));
					e.preventDefault();
					e.stopPropagation();
					var $me = $(e.target),
						method = $me.data('method'),
						element,
						item;

					if (method === 'create') {
						item = $me.data('item');
						log('item: ', item);
						createItem(item);
					} else if (method === 'reveal') {
						element = $me.data('element');
						revealElement(element);
					}
				});

				$people.off('dragstart', '.male').on('dragstart', '.male', function(e) {
					log('in dragstart', $(e.target).data('id'));
					e.originalEvent.dataTransfer.setData('daddy', $(e.target).data('id'));
				});

				$people.off('dragover', '.female').on('dragover', '.female', function(e) {
					log('in dragover', $(e.target).data('id'));
					e.preventDefault();
					return false;
				});

				$people.off('dragenter', '.female').on('dragenter', '.female', function(e) {
					log('in dragenter', $(e.target).data('id'));
					e.preventDefault();
					return false;
				});


				$people.off('drop', '.female').on('drop', '.female', function(e) {
					var target = e.target;
					// log('in drop with mother', $(this).data('id'));

					e.preventDefault();
					var $mother = $(this),
						mother_id = $mother.data('id'),
						father_id = e.originalEvent.dataTransfer.getData('daddy');

					log('father_id: ', father_id);
					log('mother_id: ', mother_id);

					handleIntercourse(father_id, mother_id);

					if ($formContainer.is(':hidden')) {
						$formContainer.fadeIn();
					}
				});

				formBindings();
			},
			getAllPeople = function getAllPeople() {
				log('in getAllPeople');

				var dfd = $.Deferred();

				try {
					var storedPeople = JSON.parse(store.getItem('People'));
					if (storedPeople) {
						People.length = 0;
						$.each(storedPeople, function(i, person) {
							var np = new Person(person);
							console.log('new person from storage: ', np);
							People.push(person);
						});
					}
					dfd.resolve();
				} catch (e) {
					dfd.reject(e);
				}

				return dfd.promise();
			};

		return {
			init: function() {
				log('in app init');

				$('.family-section').hide();

				function getAllPeopleSuccess() {
					log('in getAllPeopleSuccess');

					bindings();

					formBindings();

					if (development) {
						window.Person = Person;
						window.Man = Man;
						window.Woman = Woman;
					}

					if (People.length && development) {
						window.People = People;
					}

					!!People.length && initialPersonList();
				}

				function getAllPeopleFailure(err) {
					logER('in getAllPeopleFailure', err);
				}

				$.when(getAllPeople()).then(getAllPeopleSuccess, getAllPeopleFailure);
			}
		};
	}());

$(function() {
	App.init();
});