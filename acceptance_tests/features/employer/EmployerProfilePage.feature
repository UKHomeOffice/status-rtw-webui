Feature: Employer profile page

  Background:
    Given I am on the 'Employer profile' page

  Scenario: See 'no photo' guidance when appropriate
    When I go back
    When I go back
    And I enter '987654333' into field 'applicant-brp'
    And I enter '1234' into field 'access-code'
    And I click the 'Continue' button
    And I enter 'qwer' into field 'employee-name'
    And I enter 'qwer' into field 'company-name'
    And I click the 'Continue' button
    Then I will see the content Why is the photograph not showing? displayed
    And I will not see the content Is this different to the date printed on the BRP? displayed

  Scenario: Don't see 'no photo' guidance when appropriate
    Then I will not see the content Why is the photograph not showing? displayed

  Scenario: I see the Print button
    And I will see the content You can print a copy of this check and keep it for your records. displayed
    And I will see the content Print this page displayed

  Scenario: I see the curtailment guidance message
    When I go back
    When I go back
    And I enter '111222333' into field 'applicant-brp'
    And I enter '1234' into field 'access-code'
    And I click the 'Continue' button
    And I enter 'qwer' into field 'employee-name'
    And I enter 'qwer' into field 'company-name'
    And I click the 'Continue' button
    Then I will see the content Is this different to the date printed on the BRP? displayed
    When I click the curtailment message link
    Then I will see the content The date given here may be different to the one printed on the BRP because Alexis Korner's leave has been shortened. displayed

  Scenario: I see the status change message displayed
    When I go back
    When I go back
    And I enter '202202202' into field 'applicant-brp'
    And I enter '1234' into field 'access-code'
    And I click the 'Continue' button
    And I enter 'qwer' into field 'employee-name'
    And I enter 'qwer' into field 'company-name'
    And I click the 'Continue' button
    Then I will see the content There's a problem displayed
    Then I will see the content You will need to ask the job applicant to share their right to work information with you again. displayed