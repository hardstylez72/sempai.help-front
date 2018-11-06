window.api = {
	AUTH: 				       { url: '/api/login/',         	 method: 'POST' },
	GET_FOLDER_STRUCT:         { url: '/api/music/', 		 	 method: 'POST' },
	GET_FAVORITE_STRUCT: 	   { url: '/api/music/favorite/', 	 method: 'GET' },
	GET_UPLOADED_STRUCT: 	   { url: '/api/music/upload/get/',  method: 'POST' },
	GET_IMAGE: 	 			   { url: '/api/radio/cover/', 		 method: 'POST' },
	CHECK_FAVORITE: 	 	   { url: '/api/track/favorite/', 	 method: 'POST' },
	DELETE_FAVORITE: 	 	   { url: '/api/track/favorite/', 	 method: 'DELETE' },
	CHANGE_FAVORITE:  	 	   { url: '/api/track/favorite/', 	 method: 'PUT' },
	UPDATE_RECORD:  	 	   { url: '/api/addlink/', 		     method: 'PATCH' },
};