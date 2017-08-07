Feature: Change text in BRP error page

    Scenario: Check help to return link
      Given I am on the 'Invalid BRP' page
      And I click the 'get help to return home' link
      Then I should have the external url 'https://www.gov.uk/return-home-voluntarily'

    Scenario: Check employer checking service link
      Given I am on the 'Invalid BRP' page
      And I click the 'Employer Checking Service' link
      Then I should have the external url 'https://www.gov.uk/employee-immigration-employment-status'
