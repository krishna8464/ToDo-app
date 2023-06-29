import React, { useState } from 'react';




const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    // Perform login logic using email and password , use login api here
    const res = await fetch("https://todo-backend-tzf7.onrender.com/login",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({email,password})
    });
    if(res.ok){
        let out = await res.json();
        sessionStorage.setItem("token",out.token);
        sessionStorage.setItem("user",JSON.stringify(out.user))
        window.location.reload(false);
        alert("Login Successfull");
        console.log(out);
    }else{
        alert("Wrong creditentals")
    }

    console.log('Login:', email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm