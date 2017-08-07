Feature: Job seeker to enter date of birth and nationality


  *Acceptance Criteria*
  I know what information to enter
  I am able to enter my information
  I know what any errors are and what to do to correct them
  I can continue through the service

  Background:
    Given I am on the 'Personal Details' page

  Scenario: I enter a valid date of birth
    When I enter a valid date of birth
    And I click the 'Continue' button
    Then I will be directed to the profile page

  Scenario: I enter a BRP and date that can't be found
    Given I am on the 'BRP number' page
    And I enter 123456789 into the field brp
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will be directed to the jobseeker error page
    And I will see the content We can't find your record displayed

  Scenario Outline: DOB not valid, validation on continue
    When I enter a valid date of birth
    And I enter <value> into the field <name>
    And I click the 'Continue' button
    Then I am presented with the '<error>' error message

    Examples: BRP validation errors
      | name        | value       | error                                                         |
      | dob-day     |             | Enter your date of birth as written on your BRP card          |
      | dob-day     | ab          | Enter your date of birth as written on your BRP card          |
      | dob-day     | 32          | Enter your date of birth as written on your BRP card          |
      | dob-month   |             | Enter your date of birth as written on your BRP card          |
      | dob-month   | ab          | Enter your date of birth as written on your BRP card          |
      | dob-month   | 13          | Enter your date of birth as written on your BRP card          |
      | dob-year    |             | Enter your date of birth as written on your BRP card          |
      | dob-year    | abcd        | Enter your date of birth as written on your BRP card          |
      | dob-year    | 2030        | Enter your date of birth as written on your BRP card          |

  Scenario: I generate a generic error
    Given I am on the 'BRP number' page
    And I enter 555555555 into the field brp
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content There's a problem with this service at the moment displayed

  Scenario: I get a work status of 'EXCEPTION_'
    Given I am on the 'BRP number' page
    And I enter 666666666 into the field brp
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content We can't find your record displayed

  Scenario: I get a status with no photo data
    Given I am on the 'BRP number' page
    And I enter 987654321 into the field brp
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will be directed to the profile page

  Scenario: I get a status with no full name
    Given I am on the 'BRP number' page
    And I enter 777777777 into the field brp
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content We can't find your record displayed

  Scenario: I get a status with no work status
    Given I am on the 'BRP number' page
    And I enter 888888888 into the field brp
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content We can't find your record displayed

  Scenario: API returns a 400 with a INCORRECT_BIOGRAPHIC status
    Given I am on the 'BRP number' page
    And I enter '123456666' into field 'brp'
    And I click the 'Continue' button
    And I enter '1' into field 'dob-day'
    And I enter '1' into field 'dob-month'
    And I enter '1987' into field 'dob-year'
    And I click the 'Continue' button
    Then I will see the content We can't find your record displayed

  Scenario: API returns a 400 with a BRP_CARD_INACTIVE status
    Given I am on the 'BRP number' page
    And I enter '123456111' into field 'brp'
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content Your BRP is not valid displayed
    And I will see the content You must use your current BRP to access this service. displayed

  Scenario: API returns a 400 with a ACCOUNT_LOCKED_OUT status
    Given I am on the 'BRP number' page
    And I enter '121212121' into field 'brp'
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content Too many incorrect attempts displayed
    Then I will see the content You entered incorrect details 5 times in a row. displayed
    Then I will see the content Wait 15 minutes before you try again. displayed
