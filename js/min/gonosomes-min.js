makeMaleGonosome=function o(e,r){if(2!==arguments.length)throw new Error("not enough chromosomes passed to makeMaleGonosome");var n=[],t=getFatherControlNumber(e),m=getMotherControlNumber(r),u=insertControlNumber(t,getRandomNumber()),s=insertControlNumber(m,getRandomNumber());return n.push({x:s}),n.push({y:u}),{gonosome:n}},makeFemaleGonosome=function o(e,r){if(2!==arguments.length)throw new Error("not enough chromosomes passed to makeFemaleGonosome");var n=[],t=getFatherControlNumber(e),m=getMotherControlNumber(r),u=insertControlNumber(t,getRandomNumber()),s=insertControlNumber(m,getRandomNumber());return n.push({x:u}),n.push({x:s}),{gonosome:n}},gonosome=function o(e){var r=[];{if(e)return"male"===e?(r.push({x:uuid.v4()}),r.push({y:uuid.v4()})):(r.push({x:uuid.v4()}),r.push({x:uuid.v4()})),{gonosome:r};throw new Error("no sex passed to generate gonosome")}};