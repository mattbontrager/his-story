var development = true,
	w = window,
	store = w.localStorage,
	isEven = function isEven(num) {
		!!development && console.log('in isEven', num);
		if (!num) {
			throw new Erorr('no num passed to determine even or odd');
		}

		return (parseInt(num, 10)%2 === 0) ? true: false;
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
		if (!str) {
			throw new Error('no string to encode');
		}
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
		if (!str) {
			throw new Error('no string to decode');
		}
		return w.atob(str);
	},
	insertControlNumber = function insertControlNumber(cn, x) {
		if (arguments.length !== 2) {
			throw new Error('control number of chromotide not passed to insertControlNumber');
		}
		var split = x.split('-');
		split[0] = cn;
		return split.join('-');
	},
	setFatherControlNumber = function setFatherControlNumber(Fy) {
		if (arguments.length !== 1) {
			throw new Error('Fy not sent to setFatherControlNumber');
		}
		var fcn = getRandomNumber(),
			split = Fy.split('-');
		
		split[0] = getRandomNumber();
		return split.join('-');
	},
	setMotherControlNumber = function setMotherControlNumber(Mx) {
		if (arguments.length !== 1) {
			throw new Error('Mx not sent to setMotherControlNumber');
		}
		var mcn = getRandomNumber(),
			split = Mx.split('-');
		
		split[0] = getRandomNumber();
		return split.join('-');
	},
	getFatherControlNumber = function getFatherControlNumber(Fy) {
		if (arguments.length !== 1) {
			throw new Error('fathers y chromosome not sent to fatherControlNumber');
		}
		var split = Fy.split['-'];

		return parseInt(split[0], 10);
	},
	getMotherControlNumber = function getMotherControlNumber(Mx) {
		if (arguments.length !== 1) {
			throw new Error('mothers x chromosome not sent to motherControlNumber');
		}
		var split = Mx.split['-'];

		return parseInt(split[0], 10);
	},
	makeMaleGonosome = function makeMaleGonosome(Fy, Mx) {
		if (arguments.length !==2) {
			throw new Error('not enough chromosomes passed to makeMaleGonosome');
		}
		var chromotids = [],
			fcn = getFatherControlNumber(Fy),
			mcn = getMotherControlNumber(Mx),
			y = insertControlNumber(fcn, getRandomNumber()),
			x = insertControlNumber(mcn, getRandomNumber());

		chromotids.push({x: x});
		chromotids.push({y: y});

		return {gonosome: chromotids};
	},
	makeFemaleGonosome = function makeFemaleGonosome(Fy, Mx) {
		if (arguments.length !== 2) {
			throw new Error('not enough chromosomes passed to makeFemaleGonosome');
		}
		var chromotids = [],
			fcn = getFatherControlNumber(Fy),
			mcn = getMotherControlNumber(Mx),
			xa = insertControlNumber(fcn, getRandomNumber()),
			xb = insertControlNumber(mcn, getRandomNumber());

		chromotids.push({x: xa});
		chromotids.push({x: xb});
		
		return {gonosome: chromotids};
	},
	gonosome = function gonosome(sex) {
		var chromotids = [];
		if (!sex) {
			throw new Error('no sex passed to generate gonosome');
			return;
		} else if (sex === 'male') {
			chromotids.push({x: uuid.v4()});
			chromotids.push({y: uuid.v4()});
		} else {
			chromotids.push({x: uuid.v4()});
			chromotids.push({x: uuid.v4()});
		}
		return {gonosome: chromotids};
	},
	checkObjectLength = function checkObjectLength(obj) {
		var key = 0;
		if (typeof obj !== "object") {
			return key;
		} else {
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					key++;
				}
			}
			return key;
		}
	},
	People = [],
	Person = function Person() {
		this.id = uuid.v4();
		this.type = ''; // Actor || Object (direct || indirect)
		this.relationships = {
			family: {
				id: '',
				parents: [],
				siblings: [],
				spouses: [],
				children: []
			},
			friends: []
		};
		this.birth = {
			date: '',
			location: ''
		};
		this.death = {
			date: '',
			location: '',
			cause: ''
		};
		/**
		 * The number of years a person lived.
		 * Either explicitly given (e.g. He lived for 102 years) or death year - birth year.
		 * @type {Number}
		 */
		this.lifespan = 0; // number of years the person lived
		this.name = {
			first: '',
			middle: '',
			last: {
				given: '',
				married: '',
				maiden: ''
			},
			nickname: '',
			suffix: ''
		};
		this.gonosome = '';
		this.sex = '';
		this.nationality = '';
		this.characteristics = [];
		this.img = '';
	};

$(function() {
	var $sex = $('form').find('#sex'),
		$people = $('#people'),
		$families = $('.families'),
		drags = $people.find('.male'),
		drops = $people.find('.female');

	var App = (function App() {
		var newPerson,
			getAllPeople = function getAllPeople() {
				!!development && console.log('in getAllPeople');
				return $.Deferred(function deferredGetAllPeople(dgap) {
					try {
						var storedPeople = JSON.parse(store.getItem('People'));
						if (storedPeople) {
							People.length = 0;
							$.each(storedPeople, function(i, persons) {
								People.push(persons.person);
							});
						}
						dgap.resolve();
					} catch(e) {
						dgap.reject(e);
					}
				}).promise();
			},
			addPersonToDom = function addPersonToDom(person) {
				if (!arguments.length) {
					throw new Error('no person passed to addPersonToDom');
				}
				var theImage = (person.sex === 'm') ? 'male': 'female',
					draggable = (person.sex === 'm') ? "true": "false",
					bdate = moment(person.birth.date),
					bday = bdate.format("MMM Do, YYYY"),
					data = {
						elemID: person.id,
						theClass: 'personCard ' + theImage,
						firstName: person.name.first,
						middleName: person.name.middle,
						lastName: person.name.last.given,
						personPicture: 'images/' + theImage + '.png',
						bday: bday
					};

				$people.loadTemplate("tpl/person.html", data, {append: true});
			},
			addPersonToStorage = function addPersonToStorage(the_person) {
				var personToStore = {person: the_person},
					storedPeople = JSON.parse(localStorage.getItem('People')) || [];

				storedPeople.push(personToStore);
				localStorage.setItem('People', JSON.stringify(storedPeople));
			},
			initialPersonList = function initialPersonList() {
				!!development && console.log('in initialPersonList');
				$people.empty();

				/* trying with the template */

				$.each(People, function(i, person) {
					addPersonToDom(person);
				});
			},
			appendPerson = function appendPerson(the_person) {
				addPersonToDom(the_person);
				addPersonToStorage(the_person);
			},
			getPerson = function getPerson(pid) {
				if (arguments.length != 1) {
					throw new Error('no person id passed to getPerson');
				} else {
					return $.Deferred(function(gpdfd) {
						!!development && console.log('in getPerson');
						var thePerson;
						$.each(People, function(i, person) {
							if (person.id === pid) {
								thePerson = person;
							}
						});
						if (thePerson) {
							gpdfd.resolve(thePerson);
						} else {
							gpdfd.reject('no person found');
						}
					}).promise();
				}
			},
			prepFormElements = function prepFormElements(mommy, daddy) {
				$('.formContainer').loadTemplate('tpl/add-person-form.html', {
					newLastName: daddy.name.last.given,
					isDisabled: true
				}, {
					success: formBinding
				});
			},
			addChild = function addChild(child) {
				var $childrenList = $('#' + child.relationships.family.id).find('.children');

				// right here
			},
			addParents = function addParents(father, mother) {
				var $parentsList = $('#' + father.relationships.family.id).find('.parents');
			
				$('#' + father.id).appendTo($parentsList);
				$('#' + mother.id).appendTo($parentsList);
			},
			createChild = function createChild(mommy, daddy) {
				!!development && console.log('in createChild');
				var newPerson = new Person;
				newPerson.relationships.family.parents.push({father: daddy.id});
				newPerson.relationships.family.parents.push({mother: mommy.id});
				newPerson.relationships.family.id = daddy.relationships.family.id;
				return newPerson;
			},
			newFamilyTemplateLoaded = function newFamilyTemplateLoaded(father, mother, child) {
				addParents(father, mother);
				addChild(child);
			}
			startFamily = function newFamily(father, mother, child) {
				var familyData = {
					familyID: father.relationships.family.id,
					familyLastName: father.name.last.given
				};

				$families.loadTemplate('tpl/new-family.html', familyData, {
					append: true,
					success: newFamilyTemplateLoaded(father, mother, child),
					error: function(err) {
						throw new Error(err);
					}
				});
			},
			growFamily = function growFamily(familyID, child) {
				// body...
			},
			addFamilyList = function addFamilyList(father) {
				return $.Deferred(function(afdfd) {
					var familyData = {
							familyID: father.relationships.family.id,
							familyLastName: father.name.last.given
						};

					$families.loadTemplate('tpl/new-family.html', data, {
						append: true,
						success: function() {
							afdfd.resolve();
						},
						error: function(err) {
							afdfd.reject(err);
						}
					});
				}).promise();
			},
			getFamilyList = function getFamilyList(familyID) {
				// body...
			},
			addFamilyMembers = function addFamilyMembers(father, mother) {
				var $family = $('#' + father.relationships.family.id),
					$father = $('#' + father.id),
					$mother = $('#' + mother.id);

				$father.addClass('parentOfChild');
				$mother.addClass('parentOfChild');


			},
			makeThemAFamily = function makeThemAFamily(father, mother) {
				!!development && console.log('in makeThemAFamily');
				var familyLastName = father.name.last.given,
					$motherElement = $('#' + mother.id),
					$fatherElement = $('#' + father.id),
					$mothersNameContainer = $motherElement.find('.nameContainer'),
					$mothersLastNameElem = $mothersNameContainer.find('.lastName'),
					familyID = uuid.v4();


				$mothersLastNameElem.text(familyLastName);

				mother.name.last.married = familyLastName;
				father.relationships.family.id = familyID;
				mother.relationships.family.id = familyID;

				addFamily(father, mother);
			},
			formBinding = function formBinding() {
				$('form').off('submit').on('submit', function(e) {
					!!development && console.log('in submit form');
					e.preventDefault();
					e.stopPropagation();

					var $form = $(e.target),
						$sex = $form.find('#sex'),
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

					People.push(newPerson);

					appendPerson(newPerson);

					clearForm();
				});
			},
			bindings = function bindings() {
				!!development && console.log('in bindings');
				var $nav = $('nav'),
					$navButton = $nav.find('button'),
					createItem = function createItem(item) {
						!!development && console.log('in createItem', item);
						var $fc = $('.formContainer'),
							fcBGC = (item === "male") ? "blue": "pink";

						if (item === "male" || "female") {
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
					};

				$navButton.off('click').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					var $me = $(e.target),
						method = $me.data('method'),
						item = $me.data('item');

					!!development && console.log('item: ', item);

					if (method === 'create') {
						createItem(item);
					}
				});

				$people.off('dragstart', '.male').on('dragstart', '.male', function(e) {
					e.originalEvent.dataTransfer.setData('daddy', $(e.target).attr('id'));
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
					var $mommy = $(this),
						mommy_id = $mommy.attr('id'),
						daddy_id = e.originalEvent.dataTransfer.getData('daddy'),
						daddy,
						mommy,
						theyAreMarried;

					function getDad(dadid) {
						return $.Deferred(function(gddfd) {
							$.when(getPerson(dadid)).then(function(dad) {
								daddy = dad;
								gddfd.resolve();
							});
						}).promise();
						
					}

					function getMom(momid) {
						return $.Deferred(function(gmdfd) {
							$.when(getPerson(momid)).then(function(mom) {
								mommy = mom;
								gmdfd.resolve();
							});
						}).promise();
					}

					function areTheyMarried() {
						var momFamilyID = (mommy.relationships.family.id) ? mommy.relationships.family.id: '',
							dadFamilyID = (daddy.relationships.family.id) ? daddy.relationships.family.id: '',
							newChild = createChild(mommy, daddy);

						if ((momFamilyID) && (dadFamilyID) && (momFamilyID === dadFamilyID)) {
							!!development && console.log('they are married');
							growFamily(daddy, mommy, newChild);
						} else {
							!!development && console.log('the are not yet married');
							var newFamilyID = uuid.v4();
							daddy.relationships.family.id = newFamilyID;
							mommy.relationships.family.id = newFamilyID;
							newChild.relationships.family.id = newFamilyID;
							startFamily(daddy, mommy, newChild);
						}
					}



					$.when(getDad(daddy_id)).then(function() {
						$.when(getMom(mommy_id)).then(areTheyMarried());
					});

					
					

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
						$sex = $form.find('#sex');

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
			};

		return {
			init: function() {
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
			}
		};
	}());

	App.init();
});

/**
 * TODO: group people by family name, then by age DESC
 */

/**
 * TODO: group people by parents on top, kids underneath them... respectively
 */

/**
 * TODO: make the male/female images without race or color
 */

/**
 * TODO: add the ability to drag a (separately) created person (via the form) onto a woman
 * which would make that woman that persons mother.
 * hhhmmmmmmmm . that's interesting
 */

/**
 * TODO: provide the ability to upload a photo of that person
 */

/**
 * TODO: clicking on a person in the person list takes you to a more detailed life history profile page
 */
