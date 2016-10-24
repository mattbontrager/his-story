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
}