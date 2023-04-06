describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const firstUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    const secondUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'secret'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', firstUser)
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.infoType')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      })
      cy.createBlog({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      })
      cy.createBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      })
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      })
    })

    it('A user can like a blog', function () {
      cy.contains('Go To Statement Considered Harmful')
        .contains('view')
        .click()

      cy.contains('like')
        .click()
    })

    it('A user can delete a blog he created', function () {
      cy.contains('Go To Statement Considered Harmful')
        .contains('view')
        .click()

      cy.contains('remove')
        .click()
    })

    it('Only the creator can see the delete button of a blog', function () {
      cy.contains('logout')
        .click()

      cy.login({ username: 'hellas', password: 'secret' })
        .contains('React patterns')
        .contains('view')
        .click()

      cy.get('.remove').should('not.exist')
    })

    it('The blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.contains('Go To Statement Considered Harmful')
        .contains('view')
        .click()

      cy.contains('Go To Statement Considered Harmful')
        .parent().find('.likeButton')
        .click().wait(1000).click().wait(1000)
        .click().wait(1000).click().wait(1000)

      cy.contains('React patterns')
        .contains('view')
        .click()

      cy.contains('React patterns')
        .parent().find('.likeButton')
        .click().wait(1000).click().wait(1000)

      cy.contains('Canonical string reduction')
        .contains('view')
        .click()

      cy.contains('Canonical string reduction')
        .parent().find('.likeButton')
        .click().wait(1000).click().wait(1000).click()
        .wait(1000).click().wait(1000).click()
        .wait(1000).click().wait(1000).click()

      cy.get('.blog').eq(0).should('contain', 'Canonical string reduction')
      cy.get('.blog').eq(1).should('contain', 'Go To Statement Considered Harmful')
      cy.get('.blog').eq(2).should('contain', 'React patterns')
    })
  })
})