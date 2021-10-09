test1()

function test1() {
    try {
        new Promise(() => {
            throw new Error('err')
        })
    } catch(e) {
        console.log(e)
    }
}
