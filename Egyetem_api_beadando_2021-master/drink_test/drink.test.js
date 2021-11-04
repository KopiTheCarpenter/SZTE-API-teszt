const client = require("./client")('localhost', 8000);

describe('drink tests', () =>{

    it('returns error for missing drink name', async () => {

        const postResponse = await client.post('/api/drink', {'alcoholic': true})

        expect(postResponse.code).toBe(400)
    })

    it('returns error for missing alcoholic attribute', async () => {
        
        const postResponse = await client.post('/api/drink', {'name': 'viz'})

        expect(postResponse.code).toBe(400)
    })

    it('can create new drink', async () => {
        let viz = {'name': 'viz', 'alcoholic': false};
        
        const postResponse = await client.post('/api/drink', viz)
        
        expect(postResponse.code).toBe(201)
        const created = JSON.parse(postResponse.body)
        expect(created.id).toBeDefined()
        viz.id = created.id
        expect(created).toEqual(viz)
    })

    it('can return created drinks', async () => {
        let viz = {'name': 'viz', 'alcoholic': false}
        let szorp = {'name': 'szörp', 'alcoholic': false}

        const vizResponse = await client.post('/api/drink', viz)
        const vizId = JSON.parse(vizResponse.body).id
        const szorpResponse = await client.post('/api/drink', szorp)
        const szorpId = JSON.parse(szorpResponse.body).id

        const getResponse = await client.get('/api/drink')
        expect(getResponse.code).toBe(200)

        const getResponseBody = JSON.parse(getResponse.body)
        viz.id = vizId
        szorp.id = szorpId

        expect(getResponseBody).toContainEqual(viz)
        expect(getResponseBody).toContainEqual(szorp)
    })

    it('can read drink', async () => {
        const viz = {'name': 'viz', 'alcoholic': false}

        const postResponse = await client.post('/api/drink', viz)
        const vizId = JSON.parse(postResponse.body).id

        const getResponse = await client.get('/api/drink/' + vizId)
        expect(getResponse.code).toBe(200)
        viz.id = vizId

        const getResponseBody = JSON.parse(getResponse.body)
        expect(getResponseBody).toEqual(viz)
    })

    it('returns error for non-existent drink', async () => {
        const getResponse = await client.get('/api/drink/invalid')
        expect(getResponse.code).toBe(404)
    })

    it ('can update drink', async () => {
        let viz = {'name': 'viz', 'alcoholic': false}

        const postResponse = await client.post('/api/drink', viz)
        const vizId = JSON.parse(postResponse.body).id
        viz.id = vizId

        viz.name = 'Víz'
        viz.alcoholic = true
        const putResponse = await client.put('/api/drink/' + vizId, viz)
        expect(putResponse.code).toBe(200)

        const putResponseBody = JSON.parse(putResponse.body)
        expect(putResponseBody).toEqual(viz)
    })

    it('can delete drink', async () => {
        let viz = {'name': 'viz', 'alcoholic': false}
        const postResponse = await client.post('/api/drink', viz)
        viz.id = JSON.parse(postResponse.body).id
        
        const deleteResponse = await client.delete('/api/drink/' + viz.id)
        expect(deleteResponse.code).toBe(204)

        const getResponse = await client.get('/api/drink')
        expect(JSON.parse(getResponse.body)).toEqual(expect.not.arrayContaining([viz]))
    })
})