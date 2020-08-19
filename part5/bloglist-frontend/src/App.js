import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])
  
  const handleLogin = async event => {
    event.preventDefault()
    try {
        const user = await loginService.login({
            username, password
        })
        window.localStorage.setItem('logginInUser', JSON.stringify(user))
        setUser(user)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
        alert('wrong credentials')
    }
  }

  const loginForm = () => (
    <div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
  )

  const bloglist = () => {
    const list = () =>  blogs.map(blog => (<Blog key={blog.id} blog={blog} />))
    return (
      <div>
        Hello {user.name}
        <h2>Blogs</h2>
        {list()}
      </div>
    )
  }

	return (
		<div>
			{user === null ? loginForm() : bloglist()}
			
		</div>
	)
}

export default App
