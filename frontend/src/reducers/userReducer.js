const initialstate={
    email:'',
    password:''
};
export const userReducer=(state=initialstate,action)=>{
    switch(action.type){
        case 'SAVE_USER_DETAILS':
            return{
                ...state,
                email: action.payload.email,
                password: action.payload.password,
            };
        case 'CLEAR_USER_DETAILS':
            return initialstate;
        default:
            return state;       
}

};