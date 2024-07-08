type Circle = {
	type: 'circle'
	radius: number
}

type Rectangle = {
	type: 'rectangle'
	side1: number
	side2: number
}

type Square = {
	type: 'square'
	side: number
}

type Shape2D = Circle | Rectangle | Square

const getArea = (shape: Shape2D) => {
	switch(shape.type) {
		case 'circle':
		  return Math.PI * shape.radius ** 2
		case 'rectangle':
			return shape.side1 * shape.side2
		case 'square':
			return shape.side ** 2
		default:
			// exhaustiveness check
			const x: never = shape	
			throw new Error('this will not compile anyway')
	}
}