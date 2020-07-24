// This fie normally contains setup code that will run for EACH test case.
//
// However, running global beforeEach() in this file does not play well with
// beforeEach() in individual test files if both are using cy.task()
//
// For this reason, the setup has to be done in the actual test files.
