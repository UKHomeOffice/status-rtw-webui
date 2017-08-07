Feature: Authentication honeypot

  Scenario: Jobseeker honeypot is not populated on submission
    Given I am on the 'BRP number' page
    And I enter a valid BRP number
    And I click the 'Continue' button
    Then I will be directed to the personal details page

  Scenario: Jobseeker honeypot is populated on submission
    Given I am on the 'BRP number' page
    And I enter a valid BRP number
    And I enter 1 characters into the hidden field 'authenticate'
    And I click the 'Continue' button
    Then I will be directed to the jobseeker error page
    And I will see the content There is a problem displaying this page - try again in a few minutes. displayed

  Scenario: Employer honeypot is not populated on submission
    Given I am on the employer 'BRP number' page
    And I enter '123412341' into field 'applicant-brp'
    And I enter '1234' into field 'access-code'
    And I click the 'Continue' button
    Then I will be directed to the employer company details page

  Scenario: Employer honeypot is populated on submission
    Given I am on the employer 'BRP number' page
    And I enter '123412341' into field 'applicant-brp'
    And I enter '1234' into field 'access-code'
    And I enter 1 characters into the hidden field 'authenticate'
    And I click the 'Continue' button
    Then I will be directed to the employer error page
    And I will see the content There is a problem displaying this page - try again in a few minutes. displayed

