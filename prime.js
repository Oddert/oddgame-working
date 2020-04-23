function prime (n) {
  const sieve = []
  // console.log('exit 1')
  if (n <= 1) return false

  let i = 2

  // console.log({ i })
  while (i * i <= n) {
    // console.log(i)
    // if i is prime, check if it divides n
    // use a sieve to check if thing already checked (when using list)
    // if (sieve[i]) {
      // if it does, then n is not prime
      if (n % i === 0) {
        // console.log('exit 2')
        return false
      }
      // if i is not prime or it doesn't divide n
      // check next value
    // }
    i++
  }
  // console.log('exit 3 (def)')
  return true
}

function simple (n) {
  if (n <= 1) return false
  let i = 2
  while (i * i <= n) {
    if (n % i === 0) return false
    i++
  }
  return true
}

function evenSimpler (n) {
  for (let i = 2, s = Math.sqrt(n); i <= s; i++)
    if (n % i === 0) return false
  return n > 1
}

module.exports = evenSimpler
