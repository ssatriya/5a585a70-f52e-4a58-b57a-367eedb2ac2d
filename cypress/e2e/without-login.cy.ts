describe("Use website without login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.visit("/");
  });

  it("Contains blog posts", () => {
    cy.getDataTest("posts-list").within(() => {
      cy.getDataTest("post-list-item").should("have.length", 10);
    });

    cy.getDataTest("pagination-1").click();
    cy.getDataTest("pagination-list").within(() => {
      cy.getDataCurrent("pagination-current-2").should("have.text", 2);
    });

    cy.getDataTest("posts-list").within(() => {
      cy.getDataTest("post-list-item").should("have.length", 10);
    });
  });

  it("Contain single post", () => {
    cy.getDataTest("post-list-item")
      .eq(0)
      .within(() => {
        cy.get("a").click();
      });

    cy.getDataTest("single-post").within(() => {
      cy.getDataTest("post-title").should(
        "have.text",
        "His mother had always taught him"
      );
      cy.getDataTest("post-author").should("have.text", "nloiterton8");
    });
  });

  it("Search bar should show and hide", () => {
    cy.getDataTest("search-form").should("not.exist");
    cy.getDataTest("search-button").click();
    cy.getDataTest("search-form").should("exist");

    cy.get("body").click(0, 0);
    cy.getDataTest("search-form").should("not.exist");
  });

  it("Search form should return result based on the query", () => {
    cy.getDataTest("search-button").click();
    cy.getDataTest("search-form").within(() => {
      cy.get("input").type("love");
      cy.get("button").click();
    });

    cy.getDataTest("posts-list").then((el) => {
      if (el.length > 0) {
        cy.getDataTest("post-list-item")
          .eq(0)
          .within(() => {
            cy.get("a").click();
          });

        cy.getDataTest("single-post").within(() => {
          cy.getDataTest("post-title").should(
            "have.text",
            "This is important to remember."
          );
          cy.getDataTest("post-author").should("have.text", "rhallawellb");
        });
      }
    });
  });

  it.only("Searching without query should show notification", () => {
    cy.getDataTest("search-button").click();
    cy.getDataTest("search-form").within(() => {
      cy.get("button").click();
    });
    cy.getDataTest("form-notice").should("exist");
  });
});
