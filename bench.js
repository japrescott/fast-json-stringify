'use strict'

const benchmark = require('benchmark')
const suite = new benchmark.Suite()

const schema = {
	'title': 'Example Schema',
	'type': 'object',
	'properties': {
		'firstName': {
			'type': 'string'
		},
		'lastName': {
			'type': 'string'
		},
		'age': {
			'description': 'Age in years',
			'type': 'integer',
			'minimum': 0
		}
	}
}


const schemaHardwired = {
	'title': 'Example Hardwired Schema',
	'type': 'object',
	'properties': {
		'firstName': {
			'type': 'hardString'
		},
		'lastName': {
			'type': 'hardString'
		},
		'age': {
			'description': 'Age in years',
			'type': 'hardInt',
			'minimum': 0
		}
	}
}



const arraySchema = {
	title: 'array schema',
	type: 'array',
	items: schema
}


const obj = {
	firstName: 'Matteo',
	lastName: 'Collina',
	age: 32
}


const objBig = {
	firstName: 'MatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteoMatteo',
	lastName: 'CollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollinaCollina',
	age: 32
}



const multiArray = []
const multiArrayBig = []


const FJS = require('.')
const stringify = FJS(schema)
const stringifyUgly = FJS(schema, { uglify: true })

const stringifyArray = FJS(arraySchema)
const stringifyArrayUgly = FJS(arraySchema, { uglify: true })

const stringifyArrayHardwired = FJS(schemaHardwired)
const stringifyArrayUglyHardwired = FJS(schemaHardwired, { uglify: true })

const stringifyString = FJS({ type: 'string' })
const stringifyStringUgly = FJS({ type: 'string', uglify: true })
var str = ''

for (var i = 0; i < 10000; i++) {
	str += i
	if (i % 100 === 0) {
		str += '"'
	}
}


for (i = 0; i < 1000; i++) {
	multiArray.push(obj)
	multiArrayBig.push(objBig)
}

suite.add('FJS creation', function () {
	FJS(schema)
})

/*suite.add('JSON.stringify array', function () {
	JSON.stringify(multiArray)
})

suite.add('json-hardwire array', function () {
	stringifyArray(multiArray)
})

suite.add('json-hardwire-uglified array', function () {
	stringifyArrayUgly(multiArray)
})*/



suite.add('JSON.stringify BIG array', function () {
	JSON.stringify(multiArrayBig)
})

suite.add('json-hardwire BIG array', function () {
	stringifyArray(multiArrayBig)
})

suite.add('json-hardwire-uglified BIG array', function () {
	stringifyArrayUgly(multiArrayBig)
})

suite.add('json-hardwire-hardwired BIG array', function () {
	stringifyArrayHardwired(multiArrayBig)
})

suite.add('json-hardwire-uglified-hardwired BIG array', function () {
	stringifyArrayUglyHardwired(multiArrayBig)
})



/*

suite.add('JSON.stringify long string', function () {
	JSON.stringify(str)
})

suite.add('json-hardwire long string', function () {
	stringifyString(str)
})

suite.add('json-hardwire-uglified long string', function () {
	stringifyStringUgly(str)
})

suite.add('JSON.stringify short string', function () {
	JSON.stringify('hello world')
})

suite.add('json-hardwire short string', function () {
	stringifyString('hello world')
})

suite.add('json-hardwire-uglified short string', function () {
	stringifyStringUgly('hello world')
})

suite.add('JSON.stringify obj', function () {
	JSON.stringify(obj)
})

suite.add('json-hardwire obj', function () {
	stringify(obj)
})

suite.add('json-hardwire-uglified obj', function () {
	stringifyUgly(obj)
})
*/




suite.on('cycle', cycle)

suite.run()

function cycle (e) {
	console.log(e.target.toString())
}
