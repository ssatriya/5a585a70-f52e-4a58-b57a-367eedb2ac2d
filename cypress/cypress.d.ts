declare namespace Cypress {
  interface Chainable<Subject = any> {
    getDataTest(dataTestSelector: string): Chainable<any>;
    getDataCurrent(dataCurrentSelector: string): Chainable<any>;
  }
}
