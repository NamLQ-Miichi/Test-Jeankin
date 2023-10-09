const rootAPI = 'https://wwbxylvsx2.execute-api.ap-southeast-1.amazonaws.com'
const idToken = JSON.parse(localStorage.getItem('idToken'));
const appId = 1202
const startDate = '2023-01-01'
const endDate = '2023-01-01'
const queryParamsListRecord = `page=0&startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`
const pathGetRecord = `/dev/chobitone/app/${appId}/records/?${queryParamsListRecord}`
const indexOfApp = 1

const handleGetFirstStatusApp = {
    async getRecord() {
        const data = await fetch(`${rootAPI}${pathGetRecord}`, {
            headers: {
                Authorization: idToken.jwtToken
            }
        })
        return data.json()
    },
    async appendStatus() {
        const dataFetch = await this.getRecord()
        const firstRecord = dataFetch.records[0]
        const status = Object.values(firstRecord).find(field => field.type === 'STATUS')
        const appSelector = document.querySelectorAll('#appsList .app')[indexOfApp]
        const cardText = appSelector.querySelector('.card-text a span')
        cardText.innerText = `${status.value} ${cardText.innerText}`
    }
}
handleGetFirstStatusApp.appendStatus()