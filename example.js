// var
// let myName: number = 2 / przykład dla TS
// let myName = 2
// myName = 'Krzysiek'
// myName = []
// myName = () => {}

// let noneVar;

// const myNewName = 'Krzysiek K.'

// const titleList = ['Czarny kot', 'Coś']
// titleList[0] = 'Jocker'
// myNewName = 5
// myNewName = []
// myNewName = 'Krzysiek'
// let myExtraName = myNewName.replace('Krzysiek', 'Marek')

// console.log(myExtraName)

// var a = 2

// function myfun() {
//     var a = 4

//     let abc = () => {
//         var a = 6
//         console.log(a)
//     }
//     abc()
//     console.log(a)
// }

// var a = 'Krzysiek'
// myfun()
// console.log(a)

// email, pass - 'krzysiek@o2.pl', 'ABC123$'

// ['krzysiek@o2.pl']

let osoby = [
	'Jan Kowalski',
	[
		'Adam Nowak',
		[['Maria Z', 'Janusz G'], 4, 5, 6, [['Krzysiek jest trenerem']]],
	],
	'Maria Z',
	'Janusz G',
	[[['Maria Z', 'Janusz G']]],
	'Marcin J',
];

let userData = [
	['Krzysztof', 'Marek'],
	['Kołodziejczy', 'N'],
	[65876987097, 6786896709],
];

// function main () {}
// let myFun = () => {}

let myName = 'Krzysiek';

class Main {
	// logText(extraName: string = '', extraNum: number = 0)
	logText(extraName = '', extraNum = 0) {
		let myNum = extraNum;
		myName = extraName;
		console.log(myName + '\n' + myNum);
	}

	/**
	 * -- Użycie JS DOC
	 * @description - replace text from osoby array
	 * @param {*} position - on osoby array
	 * @param {*} replaceText - text from osoby array
	 * @param {*} value - new value to osoby array
	 */
	replaceTextFromOsoby(position = osoby[0], replaceText = '', value = '') {
		let nowy = position.replace(replaceText, value);
		console.log(nowy);
	}

	getUserName(userName = '') {
		// if (userName === 'Krzysztof') {
		//    return 'Poprawne imię trenera'
		// } else if (userName === 'Marek') {
		//     return 'Imię kolegi z pracy'
		// } else {
		//     throw Error('Błąd programu')
		// }

		// switch (userName) {
		//     case 'Krzysztof': console.log('Poprawne imię trenera')
		//     break
		//     case 'Marek': 'Imię kolegi z pracy'
		//     break
		//     default: throw Error('Błąd programu')
		// }

		// warunek ? wartość : wartość

		userName === 'Krzysztof'
			? console.log('Poprawne imię trenera')
			: userName === 'Marek'
			? console.log('Imię kolegi z pracy')
			: 'Błąd programu';
	}
}

// new Main().replaceTextFromOsoby(osoby[1][1][4][0][0], 'Krzysiek jest trenerem', 'Krzysiek jest T.')

console.log(new Main().getUserName());

let obj = {
	user1: {
		name: 'Krzysiek',
		tel: 555666555,
	},
	'user-2': {
		name: 'Marek',
		tel: [888999777],
	},
};

obj['user-2'].tel[0];

obj['user--3'] = {};
obj.user4 = {};
delete obj['user--3'];
delete obj.user4;

// console.log(Object.keys(obj)[0])
// console.log(Object.values(obj)[0])

let library = {
	book1: {
		bookTitle: ['Jumanji'],
		bookPages: [99],
		bookYear: [1999],
	},

	book2: {
		bookTitle: ['W pustyni i w puszczy'],
		bookPages: [230],
		bookYear: [2001],
	},

	book3: {
		bookTitle: ['Star Wars: New Hope'],
		bookPages: [123],
		bookYear: [1983],
	},
};

// library.book1.bookTitle[0]

// Dodaj nowy obiekt o nazwie library który będzie zawierał 3 klucze książki
// każda książka powinna mieć wartość nowego obiektu
// każdy nowy obiekt książki powinien zawierać trzy klucze: tytuł, ilość stron, datę wydania
// każdy klucz: tytuł, ilość stron, data wydania, powinny zawierać wartość docelową znajdującą się w tablicy. tytuł:['Czarny kot']
// wyloguj w konsoli informacje o 1 wybranej książce

// new Main().logText()

// new Main().logText('Krzysiek', 10)
// new Main().logText('', 89)
// new Main().logText('Maro', 99)

// 'Krzysiek ma "1 dziecko: syna"'

// console.log('Krzysztof'.slice(1, 4))

// console.log('Krzysztof'.substr(1, 3))

// console.log('Krzysztof'.substring(1, 4))
