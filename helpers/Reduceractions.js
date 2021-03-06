const Reduceractions = (prevState,action)=>
{
  switch(action.type)
  {

    case 'RETRIEVE_STORED_DATA':      //when phone number is retrieved from storage this is called
      return {
        ...prevState,     //all previous states will remain as it is
        isLoading:false,         
        userNumber:action.userNumber,    //setting phone number
        userName:action.userName,
        userProfile:action.userProfile,
        userStatus:action.userStatus
      };

    case 'LOGIN':          //when userdetails are filled this is called
      return {
        ...prevState,    //all previous states will remain as it is             
        isLoading:false,
        userNumber:action.userNumber,    //setting phone number
        userName:action.userName,
        userProfile:action.userProfile,
        userStatus:action.userStatus
      };
      
    case 'LOGOUT':                //when logging out this is called
      return {
        ...prevState,    //all previous states will remain as it is
        isLoading:false,
        userNumber:null,
        userName:null,
        userProfile:null,
        userStatus:null
      };
  }
};

exports.Reduceractions = Reduceractions;