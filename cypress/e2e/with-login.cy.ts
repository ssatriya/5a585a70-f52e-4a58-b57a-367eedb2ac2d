describe("Use website with login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should able to login and post a comment", () => {
    cy.getDataTest("login-button").click();
    cy.getDataTest("login-form").within(() => {
      cy.getDataTest("username-input").type("kminchelle");
      cy.getDataTest("password-input").type("0lelplR");
      cy.getDataTest("login-button").click();
    });

    cy.wait(2000);

    cy.getDataTest("user-button").click();

    cy.getDataTest("logout-button").should("have.text", "Logout");
    cy.get("html").click(0, 0);

    // Post comment
    cy.getDataTest("post-list-item")
      .eq(0)
      .within(() => {
        cy.get("a").click();
      });

    // Check before comment posted

    cy.getDataTest("comments-list").within(() => {
      cy.get("li").should("not.contain", "Testing comment");
    });

    // Add comment
    cy.getDataTest("comment-button").click();
    cy.getDataTest("comment-form").within(() => {
      cy.get("textarea").type("Testing comment");
      cy.get("button").click();
    });

    cy.getDataTest("comments-list").within(() => {
      cy.get("li").should("contain", "Testing comment");
    });

    // Check if there is no comment pass
    cy.getDataTest("form-comment-message").should("not.exist");

    cy.getDataTest("comment-button").click();
    cy.getDataTest("comment-form").within(() => {
      cy.get("button").click();
    });

    cy.getDataTest("form-comment-message").should("exist");

    // Logout
    cy.getDataTest("user-button").click();
    cy.getDataTest("logout-button").click();
  });
});
