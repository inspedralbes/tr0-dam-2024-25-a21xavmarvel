export async function getPreguntes () {

    const response = await fetch ('http://dam.inspedralbes.cat:25000/preguntes')
    const data = await response.json()
    return data
    
    }