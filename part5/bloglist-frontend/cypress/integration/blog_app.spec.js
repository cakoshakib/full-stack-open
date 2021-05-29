describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'shakib',
      username: 'cakoshakib',
      password: 'impact'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cakoshakib')
      cy.get('#password').type('impact')
      cy.get('#login-button').click()

      cy.contains('shakib logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cakoshakib')
      cy.get('#password').type('zzzzz')
      cy.get('#login-button').click()

      cy.get('.noti')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'shakib logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cakoshakib', password: 'impact' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('arbitrary title')
      cy.get('#url').type('cypress.org')
      cy.get('#author').type('cypress')
      cy.get('#create-blog').click()
      cy.contains('A new blog arbitrary title by cypress added')
      cy.contains('arbitrary title - cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'zzz', author: 'yyy', url: 'xxx' })
        cy.createBlog({ title: 'abc', author: 'def', url: 'hij' })
        cy.createBlog({ title: 'epic', author: 'victory', url: 'royale' })
      })

      it('User can like blog', function() {
        cy.contains('abc').contains('view').click()
        cy.contains('likes 0')
        cy.contains('abc').parent().find('button')
          .contains('like').click()
        cy.contains('likes 1')
      })

      it('User can delete blog', function() {
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.should('not.contain', 'zzz')
      })

      it('Unauthorized user cannot delete', function() {
        localStorage.setItem('loggedBlogUser', '1111111')
        cy.contains('view').click()
        cy.should('not.contain', 'delete')
      })

      it('Likes should be ordered', function() {
        cy.contains('zzz').contains('view').click()
        cy.contains('zzz').parent().find('button').as('first')
        cy.contains('abc').contains('view').click()
        cy.contains('abc').parent().find('button').as('second')
        cy.contains('epic').contains('view').click()
        cy.contains('epic').parent().find('button').as('third')

        cy.get('@second').contains('like').click()
        cy.get('@second').contains('like').click()

        cy.get('@third').contains('like').click()

        cy.get('.moreInfo').then(elements => {
          var order = elements.map((i,el) => el.innerHTML
          )
          cy.wrap(order[0]).should('include', 'abc')
          cy.wrap(order[1]).should('include', 'epic')
          cy.wrap(order[2]).should('include', 'zzz')
        })

        cy.get('@first').contains('like').click()
        cy.get('@first').contains('like').click()
        cy.get('@first').contains('like').click()

        cy.get('@third').contains('like').click()
        cy.get('@third').contains('like').click()
        cy.get('@third').contains('like').click()

        cy.get('.moreInfo').then(elements => {
          var order = elements.map((i,el) => el.innerHTML
          )
          cy.wrap(order[0]).should('include', 'epic')
          cy.wrap(order[1]).should('include', 'zzz')
          cy.wrap(order[2]).should('include', 'abc')
        })
      })
    })
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(response => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
