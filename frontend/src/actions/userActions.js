export const saveuserdetails=(email,password)=>({
    type: 'SAVE_USER_DETAILS',
    payload:{email,password}

})

export const clearuserdetails=()=>({
    type:'CLEAR_USER_DETAILS',  
})