describe('Проверка модального окна ингредиента', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Открытие модального окна', function () {
    cy.contains('Флюоресцентная булка').click();
    cy.get('[class^=Modal_modal]').as('modal');
    cy.get('@modal').contains('Детали иградиента');
    cy.get('@modal').contains('Флюоресцентная булка R2-D3');
    cy.get('@modal').contains('Калории,ккал');
    cy.get('@modal').contains('643');
    cy.get('@modal').contains('44');
    cy.get('@modal').contains('85');
  });

  it('Закрытие модального окна', function () {
    cy.get('[class^=Modal_close__]').click();
    cy.get('[class^=Modal]').should('not.exist');
  });
});