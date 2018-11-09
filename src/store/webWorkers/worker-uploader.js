const makeWorker = require('./webWorker').makeWorker;

const body = `{
	self.addEventListener('message', e => {
	const file = e.data;

		try {

			let offset = 0;
			let chunkSize = (file.size < 1024*1024) ? (file.size) : (1024*1024);
			const reader = new FileReaderSync();
			
			while (file.size > offset) {
			
				const fileBlob = file.slice(offset, offset + chunkSize);
				
				const data = reader.readAsArrayBuffer(fileBlob)
				console.log('data readed = ', data);
				fetch('http://localhost:4000/api/login/',
				{
				method: 'POST',
				body: data,
				headers: {
					'Accept':' text/plain, */*',
					'Content-Type': 'text/plain',
					// 'Access-Control-Allow-Origin': '*',
					// 'Access-Control-Allow-Methods': '*',
					// 'Access-Control-Allow-Headers': 'origin, content-type, accept'
				},
				})
					.then(res => {
						console.log('Воркер фетч ответ: ',res)
					})
					.catch(err => {
						console.log('Воркер фетч ошибка: ',err)
					});
				postMessage({
					success: 1,
					data: reader.readAsArrayBuffer(fileBlob),
					size: file.size,
					curSize: offset + chunkSize,
					name: file.name
				});
				
				offset += chunkSize;

				if ((file.size - offset) < chunkSize) {
					console.log('УГРА chunkSize = ', chunkSize, 'offset = ',offset);
					chunkSize = file.size - offset;
				}
			}
		} catch(e){
			postMessage({
				success: 0,
				data: e,
				size: file.size,
				name: file.name
			})
		}
	}, false)
}`;

const worker = makeWorker(body);

module.exports = worker;