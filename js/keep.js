var consoleMsg = (pI) ? 'in Person with: ' + pI: 'in Person',
	theRetObj = {};
!!development && console.log(consoleMsg);

if (pI && (typeof (pI === "object")) && (checkObjectLength(pI) > 0)) {
	for (var prop in pI) {
		theRetObj[prop] = pI[prop];
	}
} else {
	theRet = this;
}




$.each(People, function(i, person) {
	if (person.id === daddy_id) {
		console.log('found the daddy: ', person);
		daddy = person;
	}
	if (person.id === $mommy.attr('id')) {
		console.log('found the mommy: ', person);
		mommy = person;
	}
});




/* * /
$.each(People, function(i, person) {
	var theImage = (person.sex === 'm') ? 'male': 'female',
		draggable = (person.sex === 'm') ? "true": "false",
		bdate = moment(person.birth.date),
		bday = bdate.format("MMM Do, YYYY"),
		$theLI = $('<li />', {
			id: person.id,
			'class': 'personCard ' + theImage,
			draggable: draggable
		}),
		$theHeader = $('<header />', {
			'class': 'nameContainer'
		}),
		$firstName = $('<p />', {
			'class': 'firstName name',
			html: person.name.first
		}),
		$middleName = $('<p />', {
			'class': 'middleName name',
			html: person.name.middle
		}),
		$lastName = $('<p />', {
			'class': 'lastName name',
			html: person.name.last.given
		}),
		$personImage = $('<div />', {
			'class': 'personImage',
			'style': 'background-image: url(images/' + theImage + '.png'
		}),
		$dates = $('<div />', {
			'class': 'dates'
		}),
		$birthDate = $('<p />', {
			'class': 'birthDate',
			html: bday
		}),
		$deathDate = $('<p />', {
			'class': 'deathDate'
		});

		$firstName.prependTo($theHeader);
		$middleName.appendTo($theHeader);
		$lastName.appendTo($theHeader);

		$birthDate.appendTo($dates);

		$theLI.prepend($theHeader).append($personImage).append($dates);

		// theLI = '<li id="' + person.id + '" class="personCard ' + theImage + '" draggable="' + draggable + '"><div class="personImage" style="background-image: url(images/' + theImage + '.png);"></div><div class="nameContainer"><div class="firstName name">' + person.name.first + '</div><div class="middleName name">' + person.name.middle + '</div><div class="lastName name">' + person.name.last.given + '</div></div><div class="birthDate"><span style="font-weight: bold;">Born: </span>' + bday + '</div></li>';

	$people.append($theLI);
});
/* */


/* * /
!!development && console.log('in appendPerson', the_person);
var personToStore = {person: the_person},
	storedPeople = JSON.parse(localStorage.getItem('People')) || [],
	theImage = (the_person.sex === 'm') ? 'male': 'female',
	draggable = (the_person.sex === 'm') ? "true": "false",
	bdate = the_person.birth.date,
	bday = bdate.format("MMM Do, YYYY"),
	age = bdate.toNow(true),					
	theLI = '<li id="' + the_person.id + '" class="personCard ' + theImage + '" draggable="' + draggable + '"><div class="personImage" style="background-image: url(images/' + theImage + '.png);"></div><div class="nameContainer"><div class="firstName name">' + the_person.name.first + '</div><div class="middleName name">' + the_person.name.middle + '</div><div class="lastName name">' + the_person.name.last.given + '</div></div><div class="birthDate"><span style="font-weight: bold;">Age: </span>' + age + '</div></li>';

$('#people').append(theLI);

!!development && console.log('adding this person to the retrieved stored people');
storedPeople.push(personToStore);
!!development && console.warn('storedPeople: ', storedPeople);
!!development && console.log('storing the new set of people');
localStorage.setItem('People', JSON.stringify(storedPeople));

!!development && console.log('undefining new person');
newPerson = undefined;
/* */


/* * /
!!development && console.log('in prepFormElements');
var $selectLI = $('<li />'),
	$theSelect = $('<select />', {
		id: 'sex',
		name: 'sex'
	}),
	$chooseOne = $('<option />', {
		value: '',
		text: 'Select One'
	}),
	$maleOption = $('<option />', {
		value: 'm',
		text: 'Male'
	}),
	$femaleOption = $('<option />', {
		value: 'f',
		text: 'female'
	});

$theSelect.prepend($chooseOne).append($maleOption).append($femaleOption);
$selectLI.append($theSelect);
$selectLI.insertBefore('.formButtonContainer');

$('#last_name').val(daddy.name.last.given).attr('disabled', true);
/* */