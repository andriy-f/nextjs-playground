import * as wrapper from '@prisma/engines-version'

const main = async () => {
    console.log('prisma engine version', wrapper.enginesVersion)
}

main()
    .then(() => {
        console.log('done')
    })
    .catch((e) => {
        console.error('error', e)
    })
