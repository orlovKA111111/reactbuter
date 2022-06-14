describe('Проверка оформления заказа', function () {

  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Добавление ингредиента в конструктор', function () {
    cy.get('[class^=BurgerIngredientsStyle_wrap__]').contains('Флюоресцентная булка').should('not.exist');
    cy.contains('Флюоресцентная булка').trigger('dragstart');
    cy.get('[class^=BurgerConstructor_wrap__]').trigger('drop');
    cy.get('[class^=BurgerConstructor_wrap__]').contains('Флюоресцентная булка').should('exist');
  });

  it('Оформление заказа без авторизации', function () {
    cy.get('button').contains('Оформить заказ').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('Оформление заказа с авторизацией', function () {
    cy.get('[class^=input__container]').first().get('[class^=input__icon]').first().click();
    cy.get('input[name="email"]').type('dimon89_06@mail.ru');
    cy.get('input[name="password"]').type('123456');
    cy.get('button').contains('Войти').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[class^=Modal]').as('Modal').should('exist');
    cy.contains('Ваш заказа начали готовить');
    cy.contains('Дождитесь готовности на орбитальной станцыи');
  });

  it('Закрытие модального окна', function () {
    cy.get('[class^=Modal_close__]').click();
    cy.get('[class^=Modal]').should('not.exist');
  });

})