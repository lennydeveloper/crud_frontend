import axios from 'axios'

const apiAxios = axios.create({
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
  });

apiAxios.defaults.baseURL = 'https://crud-estudiantes.herokuapp.com/'
const api = {
    get(url) {
        return apiAxios.get(url)
        .then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            console.error('Error de conexiÃ³n' + error);
            return Promise.reject(error.response)
        })
    },
    post(url, request) {
        return apiAxios
            .post(url, request)
            .then(response => {
                return Promise.resolve(response.data)
            }).catch(error => {
                console.error('Error de conexiÃ³n' + error);
                return Promise.reject(error.response)
            })
    },
    put(url, request) {
        return apiAxios
            .put(url, request)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.error('Error de conexiÃ³n');
                return Promise.reject(error.response)
            })
    },
    download(url, request) {
        return apiAxios
            .post(url, request, {
                responseType: 'arraybuffer'
            })
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.error('Error de conexiÃ³n');
                return Promise.reject(error.response)
            })
    },
    patch(url, request) {
        return apiAxios
            .patch(url, request)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.error('Error de conexiÃ³n');
                return Promise.reject(error.response.data)
            })
    },
    delete(url, request) {
        // request=this.post_data(request);
        return apiAxios
            .delete(url, {
                params: request
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                console.error('Error de conexiÃ³n');
                return Promise.reject(error.response)
            })
    }
}

export default api;