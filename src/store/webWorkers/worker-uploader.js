const makeWorker = require('./webWorker').makeWorker;

const body = `{
	self.addEventListener('message', async e => {
	const { file, userPath, api } = e.data;

		try {
			let offset = 0;
			let chunkSize = (file.size < 1024*1024) ? (file.size) : (1024*1024);
			const reader = new FileReaderSync();
			while (file.size > offset) {
			
				const fileBlob = file.slice(offset, offset + chunkSize);
				const ABdata = reader.readAsArrayBuffer(fileBlob);
				const blob = new Blob([ABdata]);
				let formData = new FormData();
				
				const data1 = {
					files: blob,
					size: Number(file.size),
					curSize: Number(offset + chunkSize),
					name: file.name,
					path: userPath
				};

				for (const name in data1) {
					formData.append(name, data1[String(name)])
				}

				const res = await fetch(api, {
					method: 'POST',
					body: formData,
					credentials: 'include'
				})
					.then(res => {
						console.log('Воркер фетч ответ: ',res);
						return res.json();
					})
					.catch(err => {
						console.log('Воркер фетч ошибка: ', err);
						throw err;
					});
				postMessage({
					success: 1,
					...res
				});
				
				offset += chunkSize;

				if ((file.size - offset) < chunkSize) {
					chunkSize = file.size - offset;
				}
			}
		} catch(e){
		console.error('Воркер ошибка: ', e);
			postMessage({
				success: 0,
				data: e,
				size: Number(file.size),
				name: file.name
			})
		}
	}, false);
}`;

const worker = makeWorker(body);

module.exports = worker;