const putNewArticle = (url, data) => new Promise((resolve, reject) => {
    fetch(url, {
        method : 'put',
        headers: {
            Accept        : 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, }),
    })
        .then(res => res.json())
        .then(dataFromServer => {
            if ('1' === dataFromServer.success) {
                resolve();
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
});


const getArticles = (url, amount, offset, filter) => new Promise((resolve, reject) => {
    fetch(url, {
        method : 'post',
        headers: {
            Accept        : 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                amount,
                offset,
                filter,
            },
        }),
    })
        .then(res => res.json())
        .then(dataFromServer => {
            if ('1' === dataFromServer.success) {
                resolve(dataFromServer.data.filter(el => false === el.deleted));
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
});

const deleteArticle = (url, id) => new Promise((resolve, reject) => {
    fetch(url, {
        method : 'delete',
        headers: {
            Accept        : 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { id, }, }),
    })
        .then(res => res.json())
        .then(dataFromServer => {
            if ('1' === dataFromServer.success) {
                resolve();
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
});

const updateArticle = (url, data) => new Promise((resolve, reject) => {
    fetch(url, {
        method : 'patch',
        headers: {
            Accept        : 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, }),
    })
        .then(res => res.json())
        .then(dataFromServer => {
            if ('1' === dataFromServer.success) {
                resolve();
            } else {
                reject('Ошибка при обмене с сервером');
            }
        })
        .catch(err => {
            reject(err);
        });
});


module.exports.putNewArticle = putNewArticle;
module.exports.getArticles = getArticles;
module.exports.deleteArticle = deleteArticle;
module.exports.updateArticle = updateArticle;

// Module.exports.getFolderStruct = getFolderStruct;

