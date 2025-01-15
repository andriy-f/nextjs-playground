import { read } from 'read'
import bcrypt from 'bcrypt'

const main = async () => {
	try {
		const answer = await read({
			prompt: 'Enter password to see it\'s hash ',
			silent: true,
			replace: '*'
		})

		const hash = await bcrypt.hash(answer, 10)
		console.log('hash', hash)
	} catch (er) {
		console.error(er)
	}
}

main()
	.then(() => {
		console.log('done')
	})
	.catch((e) => {
		console.error('error', e)
	})
