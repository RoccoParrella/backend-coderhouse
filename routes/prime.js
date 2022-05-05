const router = require('express').Router()

function isPrime(num) {
    if ([2, 3].includes(num)) {
        return true
    }

    if ([2, 3].some(n => num % n == 0)) {
        return false
    }

    let i = 5, w = 2
    while ((i ** 2) <= num) {
        if (num % i == 0) {
            return false
        }
        i += w
        w = 6 - w
    }

    return true
}

// http://localhost/prime/?max=5
// [1, 2, 3, 5]
router.get('/', (req, res) => {
    const max = Number(req.query.max || 1000)
    const primes = []

    for (let i = 0; i <= max; i++) {
        if (isPrime(i)) {
            primes.push(i)
        }
    }

    res.send(primes)
})

module.exports = router