const autocannon = require('autocannon');
const { PassThrough } = require('stream');

const run = (url) => {

    const buf = [];
    const outputStream = new PassThrough()

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst, { outputStream })

    outputStream.on('data', data => buf.push(data))

    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf))
    })
}

console.log('RUNNING')


run('http://localhost:8484/a/append?txt=testNobloq')
run('http://localhost:8484/a/append-bloq?txt=testbloq')