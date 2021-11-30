function noop() {}

class NikitaPromise {
    constructor(executor) {
        this.queue = []
        this.errorHandler = noop
        this.finallyHandler = noop

       try {
           executor.call(null, this.oneResolve.bind(this), this.onReject.bind(this))
       }catch (e) {
         this.errorHandler(e)
       }finally {
           this.finallyHandler()
       }
    }

    oneResolve(data) {
      this.queue.forEach(callback => {
          data = callback(data)
      })
        this.finallyHandler()
    }

    onReject(error) {
        this.errorHandler(error)
        this.finallyHandler()
    }

    then(fn) {
        this.queue.push(fn)
        return this
    }

    catch(fn) {
        this.errorHandler = fn
        return this
    }

    finally(fn) {
        this.finallyHandler = fn
        return this
    }
}

const promise = new NikitaPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('NgRx')
    }, 150)
})
promise
    .then(title => title.toUpperCase())
    .then(course => console.log('Nikita Promise course', course))
    .catch(err => console.log('Custom error ', err))
    .finally(() => console.log('Finally'))
module.exports = NikitaPromise

