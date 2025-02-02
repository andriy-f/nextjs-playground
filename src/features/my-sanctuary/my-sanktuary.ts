import { create, env } from 'sanctuary'
import { env as flutureEnv } from 'fluture-sanctuary-types'

const S = create({
	checkTypes: process.env.NODE_ENV !== 'production',
	env: env.concat(flutureEnv)
})

export default S