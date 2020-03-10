const getWeather = async () => {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=68ef22ca3a3e8d2460e8aab5c5cd6b9e&query=Warsaw`)
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error('Unable to get the current location')
    }
}

export { getWeather }