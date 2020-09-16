const helper = require('./test_helper')

describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.visit('http://localhost:3000')
	})
	const user = helper.users[0]
	const credentials = function(user) {
		return {
			username: user.username,
			password: user.password
		}
	}
	describe('On initial load', function() {
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
	})
	describe('When logged in', function() {
		describe('5.19', function() {
			beforeEach(function() {
				helper.users.map(user => cy.addUser(user))
				cy.login(credentials(user))
			})
			it('A blog can be created', function() {
				cy.contains('Blogs')
				cy.get('#blogForm-toggle.toggleButton').click()
				cy.get('#blogForm #form #title').type('A Brand New Blog')
				cy.get('#blogForm #form #author').type('New Kid')
				cy.get('#blogForm #form #url').type('http://blog.newkid.com/a-brand-new-blog')
				cy.contains('Add blog').click()
				cy.contains('Blog Added')
				cy.contains('A Brand New Blog - New Kid')
			})
		})
		describe('5.20', function() {
			const blog = helper.blogs[0]
			beforeEach(function() {
				cy.addUser(user)
				cy.login(credentials(user))
				cy.addBlog(blog)
			})
			it('Can like a blog', function() {
				cy.contains(`${blog.title} - ${blog.author}`).as('likedBlog').get('.blogDetails-toggle').click().get('.likeButton').click()
				cy.get('@likedBlog').contains(`likes: ${blog.likes + 1}`)
			})
		})
		describe('5.21', function() {
			const secondUser = helper.users[1]
			beforeEach(function() {
				cy.addUser(user)
				cy.addUser(secondUser)
				cy.login(credentials(secondUser))
				cy.addBlog(helper.blogs[1])
				localStorage.removeItem('loggedInUser')
				cy.login(credentials(user))
				cy.addBlog(helper.blogs[0])
			})
			it('User who created blog can delete it', function() {
				cy
					.get('.blogItem')
					.should(blogs => {
						expect(blogs).to.have.length(2)
					})
				cy
					.get('.blogItem')
					.contains(`${helper.blogs[0].title} - ${helper.blogs[0].author}`)
					.as('removeBlog')
					.find('.blogDetails-toggle')
					.click()
				cy
					.get('@removeBlog')
					.find('.removeButton')
					.click()

				cy.contains('Successfully removed')
				cy
					.get('.blogItem')
					.should(blogs => {
						expect(blogs).to.have.length(1)
					})
			})
			it('User cannot delete another users blog', function() {
				cy
					.get('.blogItem')
					.contains(`${helper.blogs[1].title} - ${helper.blogs[1].author}`)
					.as('otherBlog')
					.find('.blogDetails-toggle')
					.click()
				cy
					.get('@otherBlog')
					.find('.removeButton')
					.should('not.be.visible')
					.click({ force:true })
				cy.contains('Request failed with status code 401')
			})
		})
		describe('5.22', function() {
			it('Blogs are ordered by likes', function() {
				const blogList = []
				helper.users.map(user => cy.addUser(user))
				cy.login(credentials(user))
				helper.blogs.map(blog => cy.addBlog(blog))
				cy
					.get('.blogItem')
					.each(blog => {
						blogList.push({
							id: blog.attr('id'),
							likes: parseFloat(blog.find('.likeCount').text())
						})
					})
					.then(() => {
						const sorted = blogList.map(blog => blog).sort((a, b) => b.likes - a.likes)
						blogList.map((blog, key) => {
							expect(blog.id).to.equal(sorted[key].id)
						})
					})
			})
		})
	})
})