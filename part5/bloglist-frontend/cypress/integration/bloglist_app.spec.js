describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.visit('http://localhost:3000')
	})
	describe('5.17', function() {
		it('Display Login form by default', function() {
			cy.contains('Login')
			cy.contains('username')
			cy.contains('password')
		})
	})
	describe.only('5.18 - User Login', function() {
		beforeEach(function() {
			const user = {
				username: 'root',
				name: 'Superuser',
				password: 'supersecret'
			}
			cy.request('POST', 'http://localhost:3003/api/users', user)
		})
		it('succeeds with correct credentials', function() {
			cy.contains('Login')
			cy.get('#username').type('root')
			cy.get('#password').type('supersecret')
			cy.get('#login-button').click()

			cy.contains('Hello Superuser')
		})
		it('fails with wrong credentials', function() {
			cy.contains('Login')
			cy.get('#username').type('root')
			cy.get('#password').type('semisecret')
			cy.get('#login-button').click()

			cy.contains('wrong username or password')

		})
	})
})
