describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.visit('http://localhost:3000')
	})
	const user = {
		id: 'ffffffffffffffffffffffff',
		username: 'root',
		name: 'Superuser',
		password: 'supersecret'
	}
	const credentials = {
		username: user.username,
		password: user.password
	}

	describe('5.17', function() {
		it('Display Login form by default', function() {
			cy.contains('Login')
			cy.contains('username')
			cy.contains('password')
		})
	})
	describe('5.18 - User Login', function() {
		beforeEach(function() {
			cy.addUser(user)
		})
		it('succeeds with correct credentials', function() {
			cy.contains('Login')
			cy.get('#username').type(user.username)
			cy.get('#password').type(user.password)
			cy.get('#login-button').click()

			cy.contains('Hello Superuser')
		})
		it('fails with wrong credentials', function() {
			cy.contains('Login')
			cy.get('#username').type(user.username)
			cy.get('#password').type('wrongsecret')
			cy.get('#login-button').click()

			cy.contains('wrong username or password')

		})
	})
	describe('5.19 - When logged in', function() {
		beforeEach(function() {
			cy.addUser(user)
			cy.login(credentials)
		})
		it('A blog can be created', function() {
			cy.contains('Blogs')
			cy.contains('Add a blog').click()
			cy.get('#form #title').type('A Brand New Blog')
			cy.get('#form #author').type('New Kid')
			cy.get('#form #url').type('http://blog.newkid.com/a-brand-new-blog')
			cy.contains('Add blog').click()
			cy.contains('Blog Added')
			cy.contains('A Brand New Blog - New Kid')
		})
	})
	describe('5.20', function() {
		beforeEach(function() {
			cy.addUser(user)
			cy.login(credentials)
		})
		it('Can like a blog', function() {

		})
	})
})
