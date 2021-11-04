const client = require('./client')('localhost', 8000)

/**
 * Food is represented by a json with a following format
 * {'name':'name of the food', 'calories': 10 }
 * When a food is created it will get a randomly generated id 
 * and a food becomes
 * {'name':'name of the food', 'calories': 10, 'id': 'abcd1234' }
*/

describe('Food tests', () => {
    it('test runner works', () => {
        expect(1).toBe(1)
    })

    it('Should give error when food is posted without the name attribute.', async () => {
        ///api/food végpontra POSTolt adatból hiányzik a name => 400 válasz
        const postResponse = await client.post('/api/food', {'calories': 10})
        expect(postResponse.code).toBe(400)
    })
    
    it('Should give error when food is posted with negative calories.', async () => {
        ///api/food végpontra POSTolt adatban negatív a calories => 400 válasz
        const postResponse = await client.post('/api/food', {'name': 'burger','calories': -10})
        expect(postResponse.code).toBe(400)
    })

    it('Should give error when food is posted with negative calories without name.', async () => {
        ///api/food végpontra POSTolt adatban negatív a calories => 400 válasz
        const postResponse = await client.post('/api/food', {'calories': -10})
        expect(postResponse.code).toBe(400)
    })

    it('Should return created foods', async () => {
        ///api/food végponton POST segítségével létrehozott elemeket a /api/food végpontra küldött GET hívás válaszában kapott tömb tartalmazza (GET válasza 200 kódot ad)
        let burger = {'name': 'burger', 'calories': 10}
        let salad = {'name': 'salad', 'calories': 1}

        const burgerResponse = await client.post('/api/food', burger)
        const burgerId = JSON.parse(burgerResponse.body).id
        const saladResponse = await client.post('/api/food', salad)
        const saladId = JSON.parse(saladResponse.body).id

        const getResponse = await client.get('/api/food')
        expect(getResponse.code).toBe(200)

        const getResponseBody = JSON.parse(getResponse.body)
        burger.id = burgerId
        salad.id = saladId

        expect(getResponseBody).toContainEqual(burger)
        expect(getResponseBody).toContainEqual(salad)
    })

    it('Should return food by id.', async () => {
        ////api/food végponton létrehozott elem a /api/food/\<id\> végpontra küldött GET hívással letölthető (GET 200 választ ad)
        let burger = {'name': 'burger', 'calories': 10}
        const burgerResponse = await client.post('/api/food', burger)
        const burgerId = JSON.parse(burgerResponse.body).id
        const getResponse = await client.get('/api/food/'+burgerId)
        expect(getResponse.code).toBe(200)
    })

    it('Should give error when wrong id is used.', async () => {
        ////api/food/\<id\> végpontra küldött GET hívás 404 választ ad érvénytelen id esetén
        const getResponse = await client.get('/api/food/invalid')
        expect(getResponse.code).toBe(404)
    })

    it ('should update food', async () => {
        ///api/food/\<id\> végpontra küldött PUT hívással a korábban létrehozott elem módosítható, és a módosítást követően egy GET hívás már a módosított állapotot adja vissza (PUT és GET is 200 választ ad)
        let burger = {'name': 'burger', 'calories': 10}
        const postResponse = await client.post('/api/food', burger)
        const burgerId = JSON.parse(postResponse.body).id
        burger.id = burgerId

        burger.name = 'Burger'
        burger.calories = 500
        const putResponse = await client.put('/api/food/' + burgerId, burger)
        expect(putResponse.code).toBe(200)

        const putResponseBody = JSON.parse(putResponse.body)
        expect(putResponseBody).toEqual(burger)
    })

    it ('should give error when updating invalid id.', async () => {
        ///api/food/\<id\> végpontra küldött PUT hívás 404-et ad érvénytelen id esetén
        let burger = {'name': 'burger', 'calories': 10}
        const putResponse = await client.put('/api/food/invalid', burger)
        expect(putResponse.code).toBe(404)
    })

    it('should delete food', async () => {
        ///api/food/\<id\> végpontra küldött DELETE hívás kitörli a korábban létrehozott elemet és azt követően a /api/food végpontra küldött GET hívás eredményében már nem található (DELETE 204 választ ad sikeres törlés esetén)
        let burger = {'name': 'burger', 'calories': 10}
        const postResponse = await client.post('/api/food', burger)
        burger.id = JSON.parse(postResponse.body).id
        
        const deleteResponse = await client.delete('/api/food/' + burger.id)
        expect(deleteResponse.code).toBe(204)

        const getResponse = await client.get('/api/food')
        expect(JSON.parse(getResponse.body)).toEqual(expect.not.arrayContaining([burger]))
    })

    it ('should give error when deleting invalid id.', async () => {
        ///api/food/\<id\> végponta küldött DELETE hívás 404-et ad érvénytelen id esetében
        const deleteResponse = await client.delete('/api/food/invalid')
        expect(deleteResponse.code).toBe(404)
    })

    it ('should give error.', async () => {
        ///api/food/\<id\> végpontra küldött PUT esetében amennyiben az url-ben és a bodyban küldött id különbözik akkot 400 hibakódot ad
        let burger = {'name': 'burger', 'calories': 10}
        const postResponse = await client.post('/api/food', burger)
        const burgerId = JSON.parse(postResponse.body).id
        burger.id = burgerId

        burger.name = 'Burger'
        burger.calories = 500
        const putResponse = await client.put('/api/food/' + burgerId+1, burger)
        expect(putResponse.code).toBe(400)
    })
})