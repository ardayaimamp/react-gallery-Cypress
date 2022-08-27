describe("Dashboard Page Test Casses", () => {

  it ("Do Login with Correct Value", () =>{
    cy.visit("http://localhost:3000");

    const email = cy.get("input[name='email']");
    email.type("user@react.test")
    
    const password = cy.get("input[name='password']");
    password.type("password")
    
    const button = cy.get("button");
    button.click()

    cy.url().should("eq", "http://localhost:3000/dashboard");

  }); 


  it ("Found No Post for the first time", () => {

    cy.contains("Found 0 photos");

  });
  

  it ("Contains Image url and description input and Publish Button", () => {

    //Check Image
    const image = cy.get("input[name='image']");
    image.should("be.visible");
    image.should("have.attr", "type", "url");
    image.should("have.attr", "required", "required");
    image.should("have.attr", "placeholder", "Image URL");
    

    //Check Description
    const description = cy.get("input[name='desc']");
    description.should("be.visible");
    description.should("have.attr", "type", "text");
    description.should("have.attr", "required", "required");
    description.should("have.attr", "placeholder", "What's on your mind?");

 
    //check publish button
    const button = cy.get("button");
    button.should("be.visible");
    button.contains("Publish");
    button.should("have.attr", "type", "submit");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");

    });

    it ("Upload some Photos", () => {

      const photos = [
        {
          imageValue:
            "https://images.unsplash.com/photo-1661580777730-a706e7d6d729?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
          descriptionValue: "Image 1 : Lorem Ipsum",
        },
        {
          imageValue:
            "https://images.unsplash.com/photo-1657299156537-f4bcdced5392?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
          descriptionValue: "Image 2 : Lorem Ipsum",
        },
      ];

      photos.forEach (({imageValue, descriptionValue}) => {
        
        const image = cy.get("input[name='image']");
        image.type(imageValue);

        const description = cy.get("input[name='desc']");
        description.type(descriptionValue);

        const button = cy.get("button");
        button.click();

        //check uploaded image is exist
        cy.get("img").should("have.attr", "src", imageValue);
        cy.contains(descriptionValue);
      });

      //check update found daya photos
      cy.contains(`Found ${photos.length} photos`);
    })

  });

