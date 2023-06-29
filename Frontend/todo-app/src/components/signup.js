import React, { useState } from 'react';

const SignupForm = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async(e) => {
      e.preventDefault();
      // Perform signup logic using name, email, and password use signup api here
      const res = await fetch("https://todo-backend-tzf7.onrender.com/signup",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({username,email,password})
    });
    let out = await res.json();
    if(res.ok){
        
        console.log(out);
    }else{
        console.log(out);
        alert("something went wrong")
    }

      console.log('Signup:', username, email, password);
    };
  
    return (
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (>6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    );
  };

  export default SignupForm