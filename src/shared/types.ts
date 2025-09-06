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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getArea = (shape: Shape2D) => {
	switch (shape.type) {
		case 'circle':
			return Math.PI * shape.radius ** 2
		case 'rectangle':
			return shape.side1 * shape.side2
		case 'square':
			return shape.side ** 2
		default: {
			// exhaustiveness check
			const _: never = shape
			throw new Error('this will not compile anyway')
		}
	}
}

export const shapeChoicesMap = {
	circle: {
		name: 'Circle',
		creator: () => ({ type: 'circle', radius: 1 } as Circle),
	},
	rectangle: {
		name: 'Rectangle',
		creator: () => ({ type: 'rectangle', side1: 1, side2: 2 } as Rectangle),
	},
	square: {
		name: 'Square',
		creator: () => ({ type: 'square', side: 1 } as Square),
	},
}

export type ShapeChoices = keyof typeof shapeChoicesMap

export const shapeChoices = Object.keys(shapeChoicesMap) as ShapeChoices[]

const isCircle = (shape: Shape2D) => {
	return shape.type === 'circle'
}

const isSquare = (shape: Shape2D) => {
	return 'side' in shape
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCircumference = (shape: Shape2D) => {
	if (isCircle(shape)) {
		return 2 * Math.PI * shape.radius
	} else if (isSquare(shape)) {
		return 4 * shape.side
	} else {
		return 2 * (shape.side1 + shape.side2)
	}
}

export interface AddTodoFormValues {
	title: string;
}

export interface Todo extends AddTodoFormValues {
	id: string
	done: boolean
}


export function propertyOf<TObj>(name: keyof TObj) {
	return name;
}

export function propertiesOf<TObj>(_: (TObj | undefined) = undefined) {
	return function result<T extends keyof TObj>(name: T) {
		return name;
	}
}

export function proxiedPropertiesOf<TObj>(_?: TObj) {
	return new Proxy({}, {
		get: (_, prop) => prop,
		set: () => {
			throw Error('Set not supported');
		},
	}) as {
			[P in keyof TObj]: P;
		};
}