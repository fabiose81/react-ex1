import axios from 'axios';

export function Request(service)
{

    let url = 'https://reqres.in/api/'.concat(service);

    return new Promise((resolve, reject) =>{
        axios.get(url)
        .then(result => {
           resolve(result.data)
        })
        .catch((error) => {
            reject(error)
        });
    });
}