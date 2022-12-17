function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
}

export const validateIfNumber = (num)=>{
  return /^\d+$/.test(num);
}


export const startasTzNo = (num) => {
  return (num.startsWith('06') || num.startsWith('07'))
}

export default ValidateEmail;
