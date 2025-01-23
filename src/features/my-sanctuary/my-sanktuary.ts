import { create, env } from 'sanctuary'
import { env as flutureEnv } from 'fluture-sanctuary-types'
// import $ from 'sanctuary-def'

const S = create({ checkTypes: true, env: env.concat(flutureEnv) })

export default S