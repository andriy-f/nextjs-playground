import * as wrapper from '@prisma/engines-version'
import { download } from '@prisma/fetch-engine'

const main = async () => {
	console.log('prisma engine version', wrapper.enginesVersion)
	console.log('downloading...')
	const binaryPats = await download({
		binaries: {
			'libquery-engine': './tmp',
			'schema-engine': './tmp'
		},
		binaryTargets: [
			// 'windows',
			'debian-openssl-3.0.x'
		],
		showProgress: true,
		version: wrapper.enginesVersion
	})
	console.log('downloaded', binaryPats)
}

main()
	.then(() => {
		console.log('done')
	})
	.catch((e) => {
		console.error('error', e)
	})
