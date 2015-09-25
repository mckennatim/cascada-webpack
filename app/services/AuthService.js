

class AuthService {
  signup(username, email) {
	$.ajax({
		url: 'http://sitebuilt.net:3002/api/ismatch/?name='+username+'&email='+email,
		success: function(data){
			console.log(data)
		}.bind(this)
	})
    return {
      url: 'SIGNUP_URL',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      udata: {
        username: username, 
        email: email
      }
    };
  }	

  getToken(username,email,apikey){
  	return{
  		token:'dogfoodisnotgood'
  	}
  }

}
export default new AuthService()