const putNewArticle = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        })
        .then(res => res.json())
        .then(dataFromServer => {
            if (dataFromServer.success === '1') {
                resolve();
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
    })
};


const getArticles = (url, amount, offset, filter) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: {amount, offset, filter}}),
        })
        .then(res => res.json())
        .then(dataFromServer => {
            if (dataFromServer.success === '1') {
                resolve(dataFromServer.data.filter(el => el.deleted === false));
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
    })
};

const deleteArticle = (url, id) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: {id}}),
        })
        .then(res => res.json())
        .then(dataFromServer => {
            if (dataFromServer.success === '1') {
                resolve();
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
    })
};

const updateArticle = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'patch',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: data}),
        })
        .then(res => res.json())
        .then(dataFromServer => {
            if (dataFromServer.success === '1') {
                resolve();
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
    })
};





module.exports.putNewArticle = putNewArticle;
module.exports.getArticles = getArticles;
module.exports.deleteArticle = deleteArticle;
module.exports.updateArticle = updateArticle;
// module.exports.getFolderStruct = getFolderStruct;

