const validateEmail = (email) => {
    const filterEmail =
      // eslint-disable-next-line no-useless-escape
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filterEmail.test(email);
  }
  
  const hindEmail = (value) => {
      if(value.length===0) return [];
      const msgs = [];
      if (value.length < 3) 
        msgs.push("Email must be less than 3 characters long")
  
      if (!validateEmail(value)) 
        msgs.push("Email is invalid")
      return msgs;
    };
    const hindPass = (value) => {
      if(value.length===0) return []
      const msgs = [];
      if (value.length < 8) 
        msgs.push("Password must be less than 8 characters long");
      return msgs;
    };
    const hindConfPass = (value, password) => {
      if(value.length===0) return []
      const msgs = [];
      if (password !== value) 
        msgs.push("password and confirm password are not compatible");
      return msgs;
    };
  
  export { validateEmail, hindEmail, hindPass, hindConfPass };