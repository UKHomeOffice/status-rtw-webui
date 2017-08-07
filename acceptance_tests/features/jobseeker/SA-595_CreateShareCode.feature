Feature: create share code

    Scenario: I want to create a share code
      Given I am on the 'Share No Email' page
      And I click the 'Create security code' button
      Then I should have the share code 8097

    Scenario: I want to finish
      Given I am on the 'View Security Code' page
      And I click the 'Finish' link
      Then I should be returned to the jobseeker start page

    Scenario: I want to share with another employer
      Given I am on the 'View Security Code' page
      When I click the 'Share with another employer' link
      Then I should be returned to the share with an employer page