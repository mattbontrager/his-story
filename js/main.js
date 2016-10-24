/**
 * HisStory (c) by Matt Bontrager
 *
 * HisStory is licensed under a
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
 *
 * You should have received a copy of the license along with this
 * work. If not, see <http://creativecommons.org/licenses/by-nc-nd/4.0/>.
 */

(function() {
	"use strict";

	const development = true;
	const w = window;
	const store = w.localStorage;
	const log = function(msg, arg = false) {
		if (arg) {
			!!development && w.console && console.log && console.log(msg + ': ', arg);
		} else {
			!!development && w.console && console.log && console.log(msg);
		}
	};
	const logER = function(msg, arg = false) {
		if (arg) {
			!!development && w.console && console.error && console.error(msg + ': ', arg);
		} else {
			!!development && w.console && console.error && console.error(msg);
		}
		return;
	};
	const checkObjectLength = function(obj = false) {
		!obj && logER('no object passed to checkObjectLength');

		const has = Object.prototype.hasOwnProperty;
		let key = 0;

		if (typeof obj !== "object") {
			return key;
		}

		for (var i in obj) {
			if (has.call(obj, i)) {
				key++;
			}
		}
		return key;
	};
	const isEven = function(num) {
		!num && logER('no num passed to isEven');

		log('in isEven' + num);
		return (parseInt(num, 10) %2 === 0) ? true: false;
	};
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
	const encode = function(str) {
		!str && logER('no string to encode');
	  return w.btoa(str);
	};
	/**
	 * The WindowBase64.atob() function decodes a string of data which has been
	 * encoded using base-64 encoding.
	 *
	 * @date   2016-10-07
	 * @author mattbontrager
	 * @param  {String}   str the string to decode
	 * @return {String}       the decoded string
	 */
	const decode = function(str) {
		!str && logER('no string to decode');
		return w.atob(str);
	};
	/**
	 * Returns a random integer, 5 digits in length, each digit being between min and max
	 * @date   2016-10-07
	 * @author mattbontrager
	 * @return {Integer}       the random number
	 */
	const getRandomNumber = function() {
		var min = Math.ceil(11111),
			max = Math.floor(44444);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	class Person {
		constructor(sex) {
			this.id = uuid.v4();

			this.sex = (sex) ? sex: '';

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
					children: {
						sons: [],
						daughters: [],
						unknown: []
					}
				},
				friends: []
			};

			this.name = {
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
		}

		get lifespan() {
			log('in get lifespan');
			var lifespan,
				birthday = moment(this.birth.date),
				deathday = (moment(this.death.date)) ? moment(this.death.date): false;

			if (this.lifespan) {
				return this.lifespan;
			} else if (!deathday || !birthday) {
				return false;
			} else {
				var span = moment.preciseDiff(birthday, deathday, true),
					spanYears = {years: span.years},
					lsToSet = moment.duration().add(spanYears).humanize();

				this.lifespan = lsToSet;
				return this.lifespan;
			}
		}

		set lifespan(lifespan) {
			!lifespan && logER('no lifespan was sent to set lifespan');
			log('in set lifespan', lifespan);
			this.lifespan = moment.duration().add(lifespan).humanize();
		}

		get spouse() {
			log('in get spouse', this.relationships.family.spouse);
			return (checkObjectLength(this.relationships.family.spouse) > 0) ? this.relationships.family.spouse: false;
		}

		set spouse(thespouse) {
			!thespouse && logER('no spouse passed to set spouse');
			log('in set spouse with', thespouse);
			this.relationships.family.spouse = thespouse;
		}

		get children() {
			let childs = this.relationships.family.children;
			let hasChildren = ((childs.sons.length) || (childs.daughters.length) || (childs.unknown.length)) ? true: false;

			!!hasChildren && log('in get children', this.relationships.family.children);
			return (hasChildren) ? this.relationships.family.children: false;
		}

		set children(childObj) {
			!childObj && logER('no child passed to set children');
			log('in set children with', childObj);
			this.relationships.family.children[childObj.type].push(childObj.child);
		}

		get siblings() {
			let sibs = this.relationships.family.siblings;
			let haveSiblings = (sibs.brothers.length || sibs.sisters.length || sibs.unknown.length) ? true: false;
			if (haveSiblings) {
				log('in get siblings', sibs);
			}
			return (haveSiblings) ? sibs: false;
		}

		set siblings(sibObj) {
			!sibObj && logER('no sibling passed to set siblings');
			log('setting a ' + sibObj.type + ' sibling', sibObj.sibling);
			this.relationships.family.siblings[sibObj.type].push(sibObj.sibling);
		}

		get parents() {
			log('getting parents', this.relationships.family.parents);
			return this.relationships.family.parents;
		}

		set parents(rents) {
			let p = this.relationships.family.parents;
			p.father = rents.father;
			p.mother = rents.mother;
			log('set parents', p);
		}

		get grandparents() {
			/**
			 * paternal grandparents
			 * @type {Array}
			 */
			let pgps = [];
			/**
			 * maternal grandparents
			 * @type {Array}
			 */
			let mgps = [];

			/**
			 * TODO: finish this
			 */
		}

		set grandparents(gps) {
			log('in set grandparents', gps);
			let pgps = gps.pgps;
			let mgms = gps.mgms;
			/**
			 * TODO: write this
			 */
		}
	}

	let People = [];

	let $sex = $('form').find('#new-person-sex');
	let $people = $('#people');
	let $families = $('.families');
	let drags = $people.find('.male');
	let drops = $people.find('.female');
	let $nav = $('nav');
	let $navButton = $nav.find('button');
	let $formContainer = $('.formContainer');

	let App;
	App = (function() {
		let addChildForm = function(parents) {
			!parents && logER('no parents were passed to addChildForm');
			if ($formContainer.is(':hidden')) {
				$formContainer.show();
			}

			$formContainer.loadTemplate('tpl/add-child-form.html', {
				fatherID: parents.father.id,
				motherID: parents.mother.id,
				newLastName: parents.father.name.last.given
			}, {
				success: formBindings
			});
		};

		let handleIntercourse = function(fatherID, motherID) {
			log('in handleIntercourse');
			if (arguments.length !== 2) {
				logER('fatherID || motherID missing in handleIntercourse');
			}

			function marryThem(father, mother) {

				if (mother.relationships.family.parents.mother === father.relationships.family.spouse.id) {
					alert('incest alert!');
				}

				if (!father.relationships.family.spouse) {
					father.relationships.family.spouse = mother;
				} else if (father.relationships.family.spouse.id !== mother.id) {
					father.relationships.family.spouses.push(father.relationships.family.spouse);
					father.relationships.family.spouse = mother;
				}

				if (!mother.relationships.family.spouse) {
					mother.relationships.family.spouse = father;
				} else if (mother.relationships.family.spouse.id !== father.id) {
					mother.relationships.family.spouses.push(mother.relationships.family.spouse);
					mother.relationships.family.spouse = father;
				}

				var parents = {};


				mother.name.last.maiden = mother.name.last.given;
				mother.name.last.married = father.name.last.given;
				parents.father = father;
				parents.mother = mother;

				log('father', father);
				log('mother', mother);
				log('mothers mother id', mother.relationships.family.parents.mother);

				return parents;
			}

			var father, mother, parents;

			$.each(People, function(i, person) {
				if (person.id === fatherID) {
					log('found the father', person);
					father = person;
				} else if (person.id === motherID) {
					log('found the mother', person);
					mother = person;
				}
			});

			if (father && mother) {
				parents = marryThem(father, mother);

				if (checkObjectLength(parents) > 0) {
					var ppl = [parents.father, parents.mother];
					// updateLocalPeople(ppl);
					addChildForm(parents);
				} else {
					logER('unable to marry the parents', parents);
				}
			} else {
				logER('couldnt find either the father or the mother. check here to find out.', {'father': father, 'mother': mother});
			}
		};

		let appendPerson = function(the_person) {
			log('the_person: ', the_person);
			addPersonToDom(the_person);
			addPersonToStorage(the_person);
		};

		let clearForm = function() {
			log('in clear form');
			$formContainer.fadeOut().css('background-color', 'inherit').empty();
		};

		let addPersonToDom = function(person) {
			if (!arguments.length) {
				logER('no person passed to addPersonToDom');
			}

			var isMale = (person.sex === 'm') ? true: false,
				theImage = (isMale) ? 'male': 'female',
				draggable = (isMale) ? "true": "false",
				classToAssign = 'personCard ' + theImage,
				thebday = moment(person.birth.date),
				bday = thebday.format("MMM Do, YYYY"),
				thelastName = (function() {
					if (isMale) {
						return person.name.last.given;
					} else {
						log('married name', person.name.last.married);
						if (person.name.last.married.length) {
							return person.name.last.married;
						} else {
							return person.name.last.given;
						}
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
					bday: bday
				};

			if (person.name.last.maiden.length) {
				data.maidenName = ' (' + person.name.last.maiden + ') ';
			}

			if (person.name.preferred) {
				data.preferredName = person.name.preferred;
			}

			$people.loadTemplate("tpl/person.html", data, {append: true});
		};

		let addPersonToStorage = function(the_person) {
			var storedPeople = JSON.parse(localStorage.getItem('People')) || [];

			storedPeople.push(the_person);
			localStorage.setItem('People', JSON.stringify(storedPeople));
		};

		let initialPersonList = function() {
			log('in initialPersonList');
			$people.empty();

			/* trying with the template */

			$.each(People, function(i, person) {
				addPersonToDom(person);
			});
		};

		let formBindings = function() {
			log('in form bindings');

			$('.show-death-date-and-time').hide();

			$('#living_or_dead').off('change').on('change', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $me = $(this),
					val = $me.val();

				if (!val) {
					confirm('confess you are the stupidest motherfucker in the world');
				} else if (val === 'no') {
					$('.show-death-date-and-time').show();
				} else if (val === 'yes') {
					$('.show-death-date-and-time').hide();
				}
			});

			$('form').off('submit').on('submit', function(e) {
				log('in submit form');
				e.preventDefault();
				e.stopPropagation();

				let $form = $('form');
				let $sex = $form.find('#new-person-sex');
				let newPerson = new Person($sex.val());
				let birthDay = $form.find('#birthdate').val();
				let birthTime = ($form.find('#birthtime').val()) ? $form.find('#birthtime').val(): undefined;
				let birthDateAndTime = (function() {
					var comb = birthDay + ' ' + birthTime;
					return (!birthTime) ? moment(birthday, 'YYYY-MM-DD'): moment(comb, 'YYYY-MM-DD HH:mm');
				}());
				let fatherID = (function() {
					return ($('#father_id').length) ? $('#father_id').val(): undefined;
				}());
				let motherID = (function() {
					return ($('#mother_id').length) ? $('#mother_id').val(): undefined;
				}());

				if (!newPerson) {
					logER('no person');
					return;
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
		};

		let bindings = function() {
			log('in bindings');
			let createItem = function(item) {
				log('in createItem', item);
				var newPerson,
					$fc = $('.formContainer'),
					// fcBGC = (item === "male") ? "blue": "pink";
					fcBGC = (item === "male") ? "white": "white";


				newPerson = new Person(item.charAt(0));

				if ($fc.is(':hidden')) {
					$fc.show();
				}

				$fc.css('background-color', fcBGC);
				$fc.loadTemplate('tpl/add-person-form.html', {
					newPersonSex: newPerson.sex
				}, {
					success: formBindings
				});
			};

			let revealElement = function(elem) {
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
		};

		let getAllPeople = function() {
			log('in getAllPeople');
			return $.Deferred(function deferredGetAllPeople(dgap) {
				try {
					var storedPeople = JSON.parse(store.getItem('People'));
					if (storedPeople) {
						People.length = 0;
						$.each(storedPeople, function(i, person) {
							People.push(person);
						});
					}
					dgap.resolve();
				} catch(e) {
					dgap.reject(e);
				}
			}).promise();
		};

		return {
			init: function() {
				log('in app init');
				$('.family-section').hide();
				$.when(getAllPeople()).then(function getAllPeopleSuccess() {
					log('in getAllPeopleSuccess');
					bindings();
					formBindings();

					window.Person = Person;

					if (People.length && development) {
						window.People = People;
					}

					!!People.length && initialPersonList();
				}, function getAllPeopleFailure(err) {
					error('in getAllPeopleFailure', err);
				});
			}
		};
	}());

	App.init();
}());