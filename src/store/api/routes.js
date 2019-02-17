window.api = {
	AUTH: 				       { url: '/api/login/',         	 		method: 'POST' },
	
	GET_FOLDER_STRUCT:         { url: '/api/v1/music/all/get/',  		method: 'POST' },
	REFRESH_FOLDER_STRUCT:     { url: '/api/v1/music/all/refresh/',     method: 'POST' },
	GET_FAVORITE_STRUCT: 	   { url: '/api/v1/music/favorite/get', 	method: 'POST' },
	GET_UPLOADED_STRUCT: 	   { url: '/api/v1/music/upload/get/',  	method: 'POST' },
	
	GET_IMAGE: 	 			   { url: '/api/v1/track/cover/get', 		method: 'POST' },
	
	CHECK_FAVORITE: 	 	   { url: '/api/v1/track/favorite/check',  	method: 'POST' },
	DELETE_FAVORITE: 	 	   { url: '/api/v1/track/favorite/delete', 	method: 'POST' },
	CHANGE_FAVORITE:  	 	   { url: '/api/v1/track/favorite/add', 	method: 'POST' },
	
	UPDATE_RECORD:  	 	   { url: '/api/addlink/', 		     		method: 'PATCH' },
	UPLOAD_MUSIC_CONTENT:	   { url: '/api/v1/music/stream/upload', 	method: 'POST' },


};