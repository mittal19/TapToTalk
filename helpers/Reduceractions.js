const Reduceractions = (prevState,action)=>
  {
    switch(action.type)
    {
      case 'RETRIEVE_TOKEN':      //when token and phone number is retrieved from storage this is called
        return {
          ...prevState,     //all previous states will remain as it is
          userToken:action.token,   //setting token
          isLoading:false,         //hiding activity indicator
          Phonenumber:action.id    //setting phone number
        };
      case 'LOGIN':          //when otp is verified ..this is called
        return {
          ...prevState,    //all previous states will remain as it is
          userToken:action.token,                
          isLoading:false,
          Phonenumber:action.id
        };
      case 'LOGOUT':                //when logging out this is called
        return {
          ...prevState,    //all previous states will remain as it is
          userToken:null,
          isLoading:false,
          Phonenumber:null
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
          Phonenumber:action.id
        };
    }
  };

  exports.Reduceractions = Reduceractions;