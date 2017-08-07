Feature: Job seeker to enter BRP number

  *User Story*
  As a job seeker
  I need to need to enter my BRP number
  so I can use the continue

  *Acceptance Criteria*
  I know what information to enter
  I am able to enter my information
  I know what any errors are and what to do to correct them
  I can continue through the service

  Background:
    Given I am on the 'BRP number' page

  Scenario: I enter a valid BRP number
    When I enter a valid BRP number
    And I click the 'Continue' button
    Then I will be directed to the personal details page

  Scenario Outline: BRP not valid, validation on continue
    When I enter <value> into the field <name>
    And I click the 'Continue' button
    Then I am presented with the '<error>' error message

    Examples: BRP validation errors
      | name        | value       | error                                                         |
      | brp         |             | BRP number can't be empty                                     |
      | brp         | 2short      | Check your Biometric Residence Permit (BRP) number is correct |
      | brp         | 2longbyfar  | Check your Biometric Residence Permit (BRP) number is correct |

