import { useState } from "react"
import { loginUser, registerUser } from "../utils/auth"

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      const res = registerUser(form)
      if (res.error) return alert(res.error)
      onLogin(res)
    } else {
      const res = loginUser(form.email, form.password)
      if (res.error) return alert(res.error)
      onLogin(res)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="card" onSubmit={handleSubmit} style={{ width: 320 }}>
        <div className="card-content">
          <h2>{isSignup ? "Sign Up" : "Login"} 🐾</h2>

          {isSignup && (
            <input
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Sign In"}
          </button>

          <p
            style={{ marginTop: 10, cursor: "pointer", color: "gray" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account?" : "Create account"}
          </p>
        </div>
      </form>
    </div>
  )
}