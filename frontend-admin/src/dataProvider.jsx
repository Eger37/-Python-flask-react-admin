import {fetchUtils} from 'react-admin'
import axios from 'axios'
import {stringify} from 'query-string'


const apiUrl = 'http://localhost:5000/api/admin'
const httpClient = fetchUtils.fetchJson

// const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         // options.headers = new Headers({Accept: 'application/json'})
//         options.headers = new Headers({'content-range': 5})
//     }
//     // add your own headers here
//     options.headers.set('Content-Type', 'application/json')
//     options.headers.set('content-range', '5')
//     return fetchUtils.fetchJson(url, options)
// }

export default {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination
        const {field, order} = params.sort
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        }
        // const url = `${apiUrl}/${resource}?${stringify(query)}`
        const url = `${apiUrl}/${resource}`
        // console.log(url)
        // let ret = httpClient(url)

        // let ret = fetch(url, {
        //     method: "GET",
        //     // headers: {'Content-Type': 'application/json', 'Content-Range': 'posts 0-24/319'}
        //     headers: {'Content-Type': 'application/json', 'Content-Range': '<unit> <range-start>-<range-end>/*'}
        // })


        let ret = axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Range': 'posts 0-24/319'
            }
        })

        // let ret = axios.get(url, {
        //     headers: {
        //         // 'Content-Type': 'application/json',
        //         'Content-Range': 'posts 0-24/319'
        //     }})


        console.log(ret)
        ret = ret.then(({headers, json}) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }))
        console.log(ret)
        return ret
    },


    // getOne: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json}) => ({
    //         data: json,
    //     })),
    //
    // getMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({id: params.ids}),
    //     }
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`
    //     return httpClient(url).then(({json}) => ({data: json}))
    // },
    //
    // getManyReference: (resource, params) => {
    //     const {page, perPage} = params.pagination
    //     const {field, order} = params.sort
    //     const query = {
    //         sort: JSON.stringify([field, order]),
    //         range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //         filter: JSON.stringify({
    //             ...params.filter,
    //             [params.target]: params.id,
    //         }),
    //     }
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`
    //
    //     return httpClient(url).then(({headers, json}) => ({
    //         data: json,
    //         total: parseInt(headers.get('content-range').split('/').pop(), 10),
    //     }))
    // },
    //
    // update: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({json}) => ({data: json})),
    //
    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({id: params.ids}),
    //     }
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({json}) => ({data: json}))
    // },
    //
    // create: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //     }).then(({json}) => ({
    //         data: {...params.data, id: json.id},
    //     })),
    //
    // delete: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'DELETE',
    //     }).then(({json}) => ({data: json})),
    //
    // deleteMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({id: params.ids}),
    //     }
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'DELETE',
    //     }).then(({json}) => ({data: json}))
    // }
}