Feature: Check employer email address and send email

  *Description*
  As a job seeker sharing my right to work
  I want to check the email I've entered is correct
  So I send my right to work to the correct email


  Background:
    Given I am on the 'Check Email' page

  Scenario: The email address is displayed
    Given I am on the 'Check Email' page
    Then I will see the content hiringmanager@employer.com displayed

  Scenario: The email is correct
    When I click the 'Send' button
    Then I should go to the sent email confirmation page

  Scenario: The email is incorrect
    When I click the 'Change' link
    Then I should go to the enter employer email address page

