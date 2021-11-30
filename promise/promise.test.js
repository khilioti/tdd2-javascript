const NikitaPromise = require('./promise')

const t = setTimeout

describe('Nikita Promise: ', () => {
    let promise
    let executorSpy

    const successResult = 20
    const errorResult = 'I am error'

    beforeEach(() => {
        executorSpy = jest.fn(r => t(() => r(successResult), 150))
        promise = new NikitaPromise(executorSpy)
    })
    test('should exist and be typeof function', () => {
        expect(NikitaPromise).toBeDefined()
        expect(typeof NikitaPromise).toBe('function')
    })
    test('instanse should have methods: then, catch, finally', () => {
        expect(promise.then).toBeDefined()
        expect(promise.catch).toBeDefined()
        expect(promise.finally).not.toBeUndefined()
    })

    test('should call executor function', () => {
        expect(executorSpy).toHaveBeenCalled()
    })

    test('should get data in then and chain them', async () => {
        const result = await promise.then(num => num).then(num => num * 2)
        expect(result).toBe(successResult * 2)
    })

    test('should catch error', () => {
        const errorExecutor = (_, r) => t(() => r(errorResult), 150)
        const errorPromise = new NikitaPromise(errorExecutor)

        return new Promise(resolve => {
           errorPromise.catch(error => {
               expect(error).toBe(errorResult)
               resolve()
           })
        })
    })
    test('should call finally method', async () => {
        const finalySpy = jest.fn(() => {})
        await promise.finally(finalySpy)

        expect(finalySpy).toHaveBeenCalled()
    })
})