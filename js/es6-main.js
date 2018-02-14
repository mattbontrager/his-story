/**
 * HisStory (c) by Matt Bontrager
 *
 * HisStory is licensed under a
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
 *
 * You should have received a copy of the license along with this
 * work. If not, see <http://creativecommons.org/licenses/by-nc-nd/4.0/>.
 */

'use strict';

const development = true;

const w = window;

const store = w.localStorage;

const log = (msg, arg = false) => {
	if (arg) {
		!!development && w.console && console.log && console.log(msg + ': ', arg);
	} else {
		!!development && w.console && console.log && console.log(msg);
	}
};

const logER = (msg, arg = false) => {
	if (arg) {
		!!development && w.console && console.error && console.error(msg + ': ', arg);
	} else {
		!!development && w.console && console.error && console.error(msg);
	}
	return;
};

const checkObjectLength = (obj = false) => {
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

const isEven = (num) => {
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
const encode = (str) => {
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
const decode = (str) => {
	!str && logER('no string to decode');
	return w.atob(str);
};

const People = [];

const App = (() => {
	const $sex = $('form').find('#new-person-sex');
	const $people = $('#people');
	const $families = $('.families');
	const drags = $people.find('.male');
	const drops = $people.find('.female');
	const $nav = $('nav');
	const $navButton = $nav.find('button');

	let self;

	const $fc = $('.form-container');
	const $pc = $('.people-container');

	const postTheForm = (fd) => {
		if (!fd) {
			logER('no form data was passed to postTheForm');
			return false;
		}
		return $.post('http://127.0.0.1:3000/people/new', fd).done(response => {
			log('back from post', response);
			return response;
		}).fail(err => {
			logER('failed back from post', err);
			return err;
		});
	}

	async function submitForm(formData) {
		const formSubmission = await postTheForm(formData);
		return new Promise((resolve, reject) => {
			if (formSubmission === false) {
				reject('something went wrong');
			} else {
				resolve(formSubmission);
			}
		})
	}

	const formBindings = () => {
		$('form').off('submit').on('submit', function(e) {
			log('in submit form');
			e.preventDefault();
			e.stopPropagation();


			var $form = $(e.target),
				$sexElem = $form.find('#new-person-sex'),
				$sexVal = $sexElem.val(),
				theSex = $sexVal === 'm' ? 'male': 'female',
				clearForm = function clearForm() {
					$fc.fadeOut().css('background-color', 'inherit').empty();
				},
				fn = ($('#first_name').val()) ? $('#first_name').val().trim(): '',
				mn = ($('#middle_name').val()) ? $('#middle_name').val().trim(): '',
				ln = ($('#last_name').val()) ? $('#last_name').val().trim(): '',
				bd = $('#birthdate').val();

			var fd = {
				name: {
					first: fn,
					middle: mn,
					last: {
						given: ln
					}
				},
				sex: theSex,
				dates: {
					birth: {
						date: bd
					}
				}
			};


			submitForm(fd).then(people => {
				log('people', people);
			}, err => {
				logER('error after posting form', err);
			});

			// clearForm();
		});
	};

	const createItem = (item) => {
		log('in createItem', item);
		// fcBGC = (item === "male") ? "blue": "pink";
		let fcBGC = (item === "male") ? "white": "white";

		if (item === ("male" || "female")) {
			let newPerson = new Person;
			newPerson.sex = (item === "male") ? 'm': 'f';
			if ($fc.is(':hidden')) {
				$fc.show();
			}
			$fc.css('background-color', fcBGC);
			$fc.loadTemplate('tpl/add-person-form.html', {
				newPersonSex: newPerson.sex
			}, {success: formBindings});

		} else {
			logER('failed to create newPerson');
		}
	};

	const clearForm = () => {
		$fc.fadeOut().css('background-color', 'inherit').empty();
	};

	const revealElement = (elem) => {
		log('elem', elem);
		let $element = $('#' + elem);
		let $sib = $element.siblings();

		$sib.hide();
		$element.fadeIn();
	};

	const bindings = () => {
		log('in bindings()');
		$navButton.off('click').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			let $me = $(e.target);
			let method = $me.data('method');
			let element;
			let item;

			if (method === 'create') {
				item = $me.data('item');
				log('item', item);
				createItem(item);
			} else if (method === 'reveal') {
				element = $me.data('element');
				revealElement(element);
			}
		});

		$people.off('dragstart', '.male').on('dragstart', '.male', function(e) {
			log('dragstart fired');
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
			let $mother = $(this);
			let mother_id = $mother.data('id');
			let father_id = e.originalEvent.dataTransfer.getData('daddy');

			log('father_id', father_id);
			log('mother_id', mother_id);

			handleIntercourse(father_id, mother_id);

			if ($fc.is(':hidden')) {
				$fc.fadeIn().promise().done(function() {
					$('form').find('input').first().focus();
				});
			}
		});

		$people.off('click', '.personCard').on('click', '.personCard', function(e) {
			e.preventDefault();
			e.stopPropagation();
			let $me = $(e.target).is('.personCard') ? $(e.target): $(e.target).closest('.personCard');
			let pid = $me.attr('id');
			console.log('in personCard click. personid: ', $me.attr('id'));
			viewPerson(pid);
		});

		formBindings();
	};

	const goGetDetailedInfo = (pid) => {
		return $.getJSON(`http://127.0.0.1:3000/people/view/${pid}`).done(function(json) {
			return json;
		}).fail(function(err) {
			logER('error getting detailed information: ', err);
			return false;
		});
	};

	async function getDetailedInfo(pid) {
		const detailedPersonalInformation = await goGetDetailedInfo(pid);
		return new Promise((resolve, reject) => {
			if (detailedPersonalInformation === false) {
				reject();
			} else {
				resolve(detailedPersonalInformation);
			}
		});
	}

	const changeViews = (person) => {
		!!development && console.log('in changeViews');
	};

	const viewPerson = (pid) => {
		getDetailedInfo(pid).then(personInfo => {
			!!development && console.log('personInfo: ', personInfo);
			changeViews(personInfo);
		}).catch(err => {
			logER('failed in viewPerson');
		})
	};

	const marryThem = (father, mother) => {
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

		log('$lastName', $lastName);

		$lastName.text(mother.name.last.married);


		parents.father = father;
		parents.mother = mother;

		log('father', father);
		log('mother', mother);

		if (mother.relationships.family.parents.mother.length) {
			log('mothers mother', mother.relationships.family.parents.mother);
		}

		return parents;
	};

	const addChildForm = (parents) => {
		!parents && logER('no parents were passed to addChildForm');
		if ($formContainer.is(':hidden')) {
			$formContainer.show();
		}

		$formContainer.loadTemplate('tpl/add-child-form.html', {
			fatherID: parents.father.id,
			motherID: parents.mother.id,
			newLastName: parents.father.name.last.given
		}, {success: formBindings});
	};

	const handleIntercourse = (fatherID, motherID) => {
		log('in handleIntercourse');
		if (!fatherID && !motherID) {
			logER('fatherID || motherID missing in handleIntercourse');
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
	};

	const goGetAllPeople = () => {
		return $.getJSON('http://127.0.0.1:3000/people').done(function(people) {
			log('back from server with people', people);
			return people;
		}).fail(function(err) {
			logER('getJSON failed', err);
			return false;
		});
	};

	const addPersonToDom = person => {
		/**
		 * TODO: create family associations
		 * 		 this will be for the visual grouping of families
		 * 		 e.g. familyUpId = uuid.v4(), // parents
		 * 		 	  familyAcrossId = uuid.v4() // spouse || theirOwnFamily
		 * 		 	  familyDownId = uuid.v4() // children
		 */

		if (!person) {
			logER('no person passed to addPersonToDom');
		}

		log('in addPersonToDom', person);

		let isMale = person.sex === 'male';
		let theImage = (isMale) ? 'male': 'female';
		let draggable = (isMale) ? "true": "false";
		let classToAssign = 'personCard ' + theImage;
		let thebday = (person.birth && person.birth.date) ? moment(person.birth.date): null;
		let bday = (thebday) ? thebday.format("MMM Do, YYYY"): null;
		!!development && console.warn('bday: ', bday);
		let age = (bday) ? thebday.fromNow(true): null;
		// let thelastName = (function() {
		// 	if (isMale) {
		// 		return person.name.last.given;
		// 	} else {
		// 		log('married name', person.name.last.married);
		// 		return (person.sex === 'female' && person.name.last.married && person.name.last.married.length) ? person.name.last.married: person.name.last.given;
		// 	}
		// }());
		let thelastName = person.name.lastname;
		let data = {
			id: person._id,
			"data-id": person._id,
			elemID: person._id,
			theClass: classToAssign,
			isDraggable: draggable,
			firstName: person.name.first,
			middleName: person.name.middle,
			lastName: thelastName,
			personPicture: 'images/' + theImage + '.png'
		};

		if (age) {
			data.bday = age;
		}

		if (person.sex === 'female' && person.name.last.maiden && person.name.last.maiden.length) {
			data.maidenName = ' (' + person.name.last.maiden + ') ';
		}

		if (person.name.preferred) {
			data.preferredName = person.name.preferred;
		}

		$people.loadTemplate("tpl/person.html", data, {append: true});

		if ($people.is(':hidden')) {
			$people.show();
		}

		if ($('.people-section').hasClass('hidden')) {
			$('.people-section').removeClass('hidden');
		}

		if ($pc.hasClass('hidden')) {
			$pc.removeClass('hidden');
		}
	};

	async function getAllPeople() {
		const peeps = await goGetAllPeople();
		return new Promise((resolve, reject) => {
			if (peeps === false) {
				reject(peeps);
			} else {
				resolve(peeps);
			}
		});
	}

	return {
		init: function() {
			self = (!self) ? this: self;

			getAllPeople().then((peeps) => {
				log('in getAllPeopleSuccess');
				if (peeps.length) {
					peeps.forEach(person => {
						People.push(person);
						addPersonToDom(person);
					});
				}

				bindings();

				if (People.length && development) {
					window.People = People;
				}

				// self.es6init();

			}, (err) => {
				logER('in getAllPeopleFailure', err);
			});
		},
		es6init: function() {
			w.App = self;
			w.Person = Person;
			let Eve = new Person('f');
			let Adam = new Person('m');
			Adam.name.first = "Adam";
			Eve.name.first = "Eve";
			Adam.spouse = Eve.id;
			Eve.spouse = Adam.id;
			w.Eve = Eve;
			w.Adam = Adam;
		},
		clearStore: function() {
			store.setItem('People', '');
		}
	};
})();

$(function() {
	App.init();
});