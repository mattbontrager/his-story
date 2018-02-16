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

$('.site-nav-button').hide();

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
	};

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
			let target = $me.data('target');
			let method = $me.data('method');
			let item = $me.data('item');

			App[target][method](item);
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

	const addBook = (book) => {
		!!development && console.log('book: ', book);
		$('#books-container').loadTemplate('tpl/book.html', {
			bookTitle: book.title,
			bookChapter: book.chapters[0]
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
		hasWorker: false,
		init: function() {
			self = (!self) ? this: self;

			self.hasWorker = (!!window.Worker) ? true: false;

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

			}, (err) => {
				logER('in getAllPeopleFailure', err);
			});
		},
		BookView: {
			allBooksDownloaded: false,
			isBookListPopulated: false,
			item: null,
			currentChapters: [],
			getBook: (bookname) => {
				const storedBook = self.BookView.checkIfBookIsThere(`${bookname}`);
				if (!storedBook) {
					$.getJSON('http://127.0.0.1:3000/books/view/genesis').done(book => {
						self.BookView.storeBookLocally(book);
						$('#books-container').loadTemplate('tpl/book.html', {
							bookTitle: book.name
						}, {success: self.BookView.prepareBook(book)});
					}).fail(err => {
						logER('failed to get json book', err);
					});
				} else {
					const book = JSON.parse(storedBook);
					!!development && console.log('book: ', book);
					$('#books-container').loadTemplate('tpl/book.html', {
						bookTitle: book.name
					}, {success: self.BookView.prepareBook(book)});
				}
				!!self.hasWorker && !self.BookView.allBooksDownloaded && self.BookView.startRemoteDownloads();
			},
			init: (_item) => {
				self.BookView.item = $('#' + _item);
				self.BookView.checkIfAllBooksAreDownloaded().then(self.BookView.getBook('genesis'));
				// self.BookView.reProcessBookObject();
			},
			checkIfAllBooksAreDownloaded: () => {
				return new Promise((resolve, reject) => {
					const allBooksLocal = JSON.parse(localStorage.getItem('his-story-titles-of-stored-books'));
					if (allBooksLocal.length === 0) {
						resolve();
					} else if (allBooksLocal.length < 65) {
						resolve();
						// reject(allBooksLocal.length);
					} else if (allBooksLocal.length === 65) {
						self.BookView.allBooksDownloaded = true;
						resolve();
					} else 	if (allBooksLocal.length === null) {
						localStorage.setItem('his-story-titles-of-stored-books', JSON.stringify([]));
						// reject();
						resolve();
					}
				});
			},
			populateBookList: (names) => {
				const $jumpBook = $('#jump-to-book');
				const bookNameArr = [];
				for (let name of names) {
					bookNameArr.push(self.BookView.bookNameFactory(name.name));
				}
				$jumpBook.empty().append(bookNameArr.join(''));
				self.BookView.isBookListPopulated = true;
			},
			startRemoteDownloads: () => {
				!!development && console.log('in startRemoteDownloads');
				var remoteD = new Worker('js/getBible.js');

				remoteD.addEventListener('message', function(e) {
					if (e.data.yourbookhasarrived) {
						!!development && console.log("e.data.yourbookhasarrived: ", e.data.yourbookhasarrived);
						self.BookView.storeBookLocally(e.data.yourbookhasarrived);
					}

					if (e.data.thetime) {
						self.setTime(e.data.thetime);
					}
					if (e.data.msg) {
						!!development && console.log('remoteD said: ', e.data.msg);
					}
				}, false);

				remoteD.postMessage({"cmd": "start"});
			},
			optionFactory: (num) => {
				return `<option class="jump-to-chapter-number" value="${num}">${num}</option>`;
			},
			verseFactory: (verse) => {
				return `<p class="verse">${verse}</p>`;
			},
			bookNameFactory: (name) => {
				return `<option class="jump-to-book-option" value="${name}">${name}</option>`;
			},
			bookBindings: () => {
				log('in bookBindings');

				$('.book-chapter').off('scroll').on('scroll', function(e) {
					if ($('.book-template').find('p').first().offset().top < 60 && $('.book-title').css('font-size') === "70px") {
						$('.book-title').css({
							'font-size': '2rem',
							'color': '#e0e0e0'
						});
						$(this).css('margin-top', '0');
						$(this).css({
							'margin-top': '0',
							'height': '95vh',
							'max-height': '95vh'
						});
					}
					if ($('.book-template').find('p').first().offset().top === 0 && $('.book-title').css('font-size') === "20px") {
						$('.book-title').css({
							'font-size': '7rem',
							'color': 'initial'
						});
						$(this).css({
							'margin-top': '10rem',
							'height': '85vh',
							'max-height': '85vh'
						});
					}
				});

				$('button').off('click').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					let $me = $(e.target);
					let target = $me.data('target');
					let method = $me.data('method');
					let item = $me.data('item');

					App[target][method](item);
				});
			},
			switchBooks: (book) => {
				let optionI = 0;
				const options = [];
				const verses = book.chapters[0];``
				const verseArr = [];

				self.BookView.currentChapters = book.chapters;

				for (let verse of verses) {
					verseArr.push(self.BookView.verseFactory(verse));
				}
				for (let chapter of book.chapters) {
					optionI++;
					options.push(self.BookView.optionFactory(optionI));
				}

				$('.book-title').empty().text(`${book.name}`);
				$('.book-chapter').empty().append(verseArr.join(''));
				$('#jump-to-chapter').empty().append(options.join(''));
			},
			switchChapters: (chapterNumber) => {
				const verses = self.BookView.currentChapters[chapterNumber];
				const verseArr = [];

				for (let verse of verses) {
					verseArr.push(self.BookView.verseFactory(verse));
				}

				$('.book-chapter').empty().append(verseArr.join(''));
			},
			handleChapterChange: () => {
				$('#jump-to-chapter').off('change').on('change', function(e) {
					e.stopPropagation();
					let $me = $(e.target);
					let val = $me.val();
					!!development && console.log('val: ', val);
					let selectedChapter = val - 1;
					self.BookView.switchChapters(selectedChapter);
				});
			},
			prepareBook: (book) => {
				let optionI = 0;
				const options = [];
				const verses = book.chapters[0];
				const verseArr = [];

				self.BookView.currentChapters = book.chapters;

				$('.app-nav').hide();
				$('.site-nav').show();

				self.BookView.item.show();
				$('.site-nav-button').fadeIn();

				setTimeout(function() {
					for (let verse of verses) {
						verseArr.push(self.BookView.verseFactory(verse));
					}
					for (let chapter of book.chapters) {
						optionI++;
						options.push(self.BookView.optionFactory(optionI));
					}
					$('.book-chapter').empty().append(verseArr.join(''));
					$('#jump-to-chapter').empty().append(options.join(''));
					self.BookView.bookBindings();
					if (!self.BookView.isBookListPopulated) {
						const listOfNames = JSON.parse(localStorage.getItem('his-story-titles-of-stored-books'));
						const orderedNames = listOfNames.sort((a, b) => {
							if (parseInt(a.id, 10) < parseInt(b.id, 10)) return -1;
							if (parseInt(a.id, 10) > parseInt(b.id, 10)) return 1;
							return 0;
						});
						self.BookView.populateBookList(orderedNames);
						self.BookView.handleBookChange();
						self.BookView.handleChapterChange();
					}
				}, 100);
			},
			handleBookChange: () => {
				$('#jump-to-book').off('change').on('change', function(e) {
					e.stopPropagation();
					const $me = $(e.target);
					const bookname = $me.val();
					const theBook = JSON.parse(localStorage.getItem(`${bookname}`));

					!!development && console.log('selected book name: ', bookname);
					!!development && console.log('theBook: ', theBook);
					self.BookView.switchBooks(theBook);
				});
			},
			checkIfBookIsThere: (bookname) => {
				return localStorage.getItem(bookname);
			},
			reProcessBookObject: () => {
				const booknames = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', '1 samuel', '2 samuel', '1 kings', '2 kings', '1 chronicles', '2 chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalms', 'proverbs', 'ecclesiastes', 'song of solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1 corinthians', '2 corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', '1 thessalonians', '2 thessalonians', '1 timothy', '2 timothy', 'titus', 'philemon', 'hebrews', 'james', '1 peter', '2 peter', '1 john', '2 john', '3 john', 'jude', 'revelation'];

				const bookArr = [];
				for (let name of booknames) {
					!!development && console.log('name: ', name);
						let bookObj = JSON.parse(localStorage.getItem(`${name}`));
						if (bookObj) {
							bookArr.push({
								id: `${bookObj.id}`,
								name: `${bookObj.name}`
							});
						}
				}
				!!development && console.log('bookArr: ', bookArr);
				localStorage.setItem('his-story-titles-of-stored-books', JSON.stringify(bookArr));
			},
			storeBookLocally: (book) => {
				!!development && console.log('in storeBookLocally' + ' with: ', book);
				localStorage.setItem(`${book.name}`, JSON.stringify(book));
				const allBooksLocal = JSON.parse(localStorage.getItem('his-story-titles-of-stored-books'));
				if (Array.isArray(allBooksLocal)) {
					!!development && console.log('allBooksLocal before: ', allBooksLocal);
					allBooksLocal.push({
						id: `${book.id}`,
						name: `${book.name}`
					});
					!!development && console.log('allBooksLocal after: ', allBooksLocal);
				}
				localStorage.setItem('his-story-titles-of-stored-books', JSON.stringify(allBooksLocal));
			}
		},
		View: {
			show: (item) => {
				const $item = $('#' + item);
				const $sibs = $item.siblings();

				$sibs.hide();

				if (item === 'books-container') {
					self.BookView.init(item);
				} else {
					$item.show();
					$('.site-nav-button').hide();
					$('.app-nav').show();
				}
			}
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