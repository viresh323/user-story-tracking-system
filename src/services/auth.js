
import AXIOS_SERVICE from "./axios_service";
import AuthModel from "../view_models/AuthModel.json";


const AUTH_SERVICE = {

    GetAuthModel : function(){
        return JSON.parse(localStorage.getItem("AuthModel")) || {};
    },
    AuthenticateUser: async function(CredentialsModel) {
      
        return await AXIOS_SERVICE.postRequest("signin",CredentialsModel)
          .then(result => {
            AuthModel.id = result.id;
            AuthModel.firstName = result.firstName;
            AuthModel.lastName = result.lastName;
            AuthModel.token = result.token;
            AuthModel.role = result.role;
            localStorage.setItem('AuthModel', JSON.stringify(AuthModel));
            return AuthModel;
          })
          .catch(error => {
            throw error;
          });
      }
  };
  export default AUTH_SERVICE;
  