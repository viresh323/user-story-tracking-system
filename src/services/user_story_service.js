
import AXIOS_SERVICE from "./axios_service";
import userStoryModel from "../view_models/UserStoryModel.json"
import _ from "lodash"

const USER_STORY_SERVICE = {

    Create_User_Story: async function(userStoryModel) {
                return await AXIOS_SERVICE.postRequest("stories",userStoryModel)
          .then(result => {
            return result;
          })
          .catch(error => {
            throw error;
          });
      },
    Get_User_Stories :  async function (){
        return await AXIOS_SERVICE.getRequest("stories")
        .then(result => {
            let userStoryList = [];
                _.each(result, userStoryData => {

                    let userStory = { ...userStoryModel, ...userStoryData };
                    userStoryList.push(userStory);
                });

                return userStoryList;
        })
        .catch(error => {
          throw error;
        });
    }
  };
  export default USER_STORY_SERVICE;
  