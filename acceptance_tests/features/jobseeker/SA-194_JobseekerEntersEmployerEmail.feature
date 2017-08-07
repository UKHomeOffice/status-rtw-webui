Feature: Job seeker to enter employer email address

  *Description*
  As a job seeker,
  I want to share my right to work,
  So my (potential) employer can check my right to work.


  Background:
    Given I am on the 'Share Email' page

  Scenario: I have entered a valid email address
    Given I enter a valid email address
    When I click the 'Continue' button
    Then I should go to the check email address page

  Scenario Outline: I entered an invalid or missing email address
    When I enter <value> into the field <name>
    And I click the 'Continue' button
    Then I am presented with the '<error>' error message

    Examples: BRP validation errors
      | name               | value       | error                                |
      | employer-email     |             | Enter an employer's email address    |
      | employer-email     | asdf        | Enter a valid email address          |
      | employer-email     | asdf@qws    | Enter a valid email address          |
      | employer-email     | asdf@qws.   | Enter a valid email address          |
      | employer-email     | @qws.com    | Enter a valid email address          |



