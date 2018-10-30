const workercode = () => {

	const onmessage = (e) => {
		console.log('Message received from main script %s ', e.data);
		console.log('Posting message back to main script');



		let reader = new FileReaderSync();
		reader.readAsText('324');

		postMessage('Received from main: ' + (e.data));
	};

};