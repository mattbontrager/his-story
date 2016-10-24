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
			!!development && w.console && console.log && console.log(msg + ': ' + arg);
		} else {
			!!development && w.console && console.log && console.log(msg);
		}
	};
	const logER = function(msg, arg = false) {
		if (arg) {
			!!development && w.console && console.error && console.error(msg + ': ' + arg);
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

	let App;
	App = (function() {
		let self;
		let Bindings;
		Bindings = function() {
			/**
			 * FIXME: fix this bullcrap.. this whole bull crap
			 **/
			function formBindings() {
				$('form').off('submit').on('submit', function(e) {
					!!development && console.log('in submit form');
					e.preventDefault();
					e.stopPropagation();

					var $form = $(e.target),
						$sex = $form.find('#new-person-sex'),
						clearForm = function clearForm() {
							$('.formContainer').fadeOut().css('background-color', 'inherit').empty();
						};

					if (!newPerson) {
						alert('no person');
						return;
					}

					newPerson.name.first = $('#first_name').val();
					newPerson.name.middle = $('#middle_name').val();
					newPerson.name.last.given = $('#last_name').val();
					newPerson.birth.date = moment($('#birthdate').val(), "YYYY-MM-DD"); // need to reformat?
					newPerson.sex = $sex.val();

					!!development && console.log('newPerson: ', newPerson);

					People.push(newPerson);

					appendPerson(newPerson);

					clearForm();
				});
			}

			function bindings() {
				createItem = function createItem(item) {
					!!development && console.log('in createItem', item);
					var $fc = $('.formContainer'),
						// fcBGC = (item === "male") ? "blue": "pink";
						fcBGC = (item === "male") ? "white": "white";

					if (item === ("male" || "female")) {
						newPerson = new Person;
					}

					newPerson.sex = (item === "male") ? 'm': 'f';
					if ($fc.is(':hidden')) {
						$fc.show();
					}
					$fc.css('background-color', fcBGC);
					$fc.loadTemplate('tpl/add-person-form.html', {
						newPersonSex: newPerson.sex
					}, {
						success: formBinding
					});
				},
				clearForm = function clearForm() {
					$('.formContainer').fadeOut().css('background-color', 'inherit').empty();
				},
				revealElement = function revealElement(elem) {
					!!development && console.log('elem: ', elem);
					var $element = $('#' + elem),
						$sib = $element.siblings();

					$sib.hide();
					$element.fadeIn();
				};

				$navButton.off('click').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					var $me = $(e.target),
						method = $me.data('method'),
						element,
						item;

					if (method === 'create') {
						item = $me.data('item');
						!!development && console.log('item: ', item);
						createItem(item);
					} else if (method === 'reveal') {
						element = $me.data('element');
						revealElement(element);
					}
				});

				$people.off('dragstart', '.male').on('dragstart', '.male', function(e) {
					e.originalEvent.dataTransfer.setData('daddy', $(e.target).data('id'));
				});

				$people.off('dragover', '.female').on('dragover', '.female', function(e) {
					e.preventDefault();
					return false;
				});

				$people.off('dragenter', '.female').on('dragenter', '.female', function(e) {
					e.preventDefault();
					return false;
				});


				$people.off('drop', '.female').on('drop', '.female', function(e) {
					/**
					 * TODO: add mother's last name in parentheses and then
					 * change her last name to the father's last name
					 * also update maiden, given, etc.
					 */

					/**
					 * TODO: wrap them both in a li>ul.family container
					 */


					/**
					 * TODO: also add "parents" class to the two who just
					 * made the child. that way they can be together on the page
					 * with the child(ren) listed underneath them.
					 */


					e.preventDefault();
					var $mother = $(this),
						mother_id = $mother.data('id'),
						father_id = e.originalEvent.dataTransfer.getData('daddy');

					!!development && console.log('father_id: ', father_id);
					!!development && console.log('mother_id: ', mother_id);

					handleIntercourse(father_id, mother_id);

					if ($('.formContainer').is(':hidden')) {
						$('.formContainer').fadeIn().promise().done(function() {
							$('form').find('input').first().focus();
						});
					}
				});

				$('form').off('submit').on('submit', function(e) {
					!!development && console.log('in submit form');
					e.preventDefault();
					e.stopPropagation();

					var $form = $(e.target),
						$sex = $form.find('#new-person-sex');

					if (!newPerson) {
						alert('no person');
						return;
					}

					newPerson.name.first = $('#first_name').val();
					newPerson.name.middle = $('#middle_name').val();
					newPerson.name.last.given = $('#last_name').val();
					newPerson.birth.date = moment($('#birthdate').val(), "YYYY-MM-DD"); // need to reformat?
					newPerson.sex = $sex.val();

					People.push(newPerson);

					appendPerson(newPerson);

					clearForm();
				});
				formBindings();
			}

			function startIt() {
				bindings();
			}

			return {
				init: startIt
			};
		};

		return {
			init: function() {
				$('#people').hide();
				$.when(getAllPeople()).then(function getAllPeopleSuccess() {
					!!development && console.log('in getAllPeopleSuccess');
					bindings();

					if (People.length && development) {
						window.People = People;
					}

					!!People.length && initialPersonList();
				}, function getAllPeopleFailure(err) {
					!!development && console.error('in getAllPeopleFailure', err);
				});
			},
			es6init: function() {
				self = (!self) ? this: self;
				w.App = self;
				w.Person = Person;
				let Eve = new Person('f');
				let Adam = new Person('m');
				Adam.name.first = "Adam";
				Eve.name.first = "Eve";
				Adam.spouse = Eve;
				w.Eve = Eve;
				w.Adam = Adam;
			},
			clearStore: function() {
				store.setItem('People', '');
			}
		};
	}());

	App.es6init();
}());