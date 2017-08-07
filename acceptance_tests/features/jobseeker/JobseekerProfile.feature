Feature: Job seeker profile page

  *Acceptance Criteria*
  I know what information to enter
  I am able to enter my information
  I know what any errors are and what to do to correct them
  I can continue through the service

  Background:
    Given I am on the 'Profile' page

  Scenario: I see the wrong details information
    Then I will see the content If your details are wrong displayed
    When I click the 'If your details are wrong' summary link
    Then I will see the content Your details are taken from your Biometric Residence Permit (BRP). displayed

  Scenario: Pages are not cached after logout
    Then I will see the content Finish and leave service displayed in the header
    When I click the 'Finish and leave service' link in the header
    Then I will see the content Prove your right to work to an employer displayed
    When I go back
    Then I will see the content Prove your right to work to an employer displayed

  Scenario: Finish link displayed
    Then I will see the content Finish and leave service displayed in the header
    When I go back
    Then I will not see the content Finish and leave service displayed

  Scenario: See 'no photo' guidance when appropriate
    When I go back
    When I go back
    And I enter '987654333' into field 'brp'
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content Why is my photograph not showing? displayed

  Scenario: Don't see 'no photo' guidance when appropriate
    Then I will not see the content Why is my photograph not showing? displayed

  Scenario: Don't see curtailment date guidance when appropriate
    Then I will not see the content This date may be different to the one printed on your card displayed

  Scenario: See curtailment date guidance when appropriate
    When I go back
    When I go back
    And I enter '111222333' into field 'brp'
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content This date may be different to the one printed on your card displayed

  Scenario: See 'not allowed to work' message when curtailed leave has expired
    When I go back
    When I go back
    And I enter '111222332' into field 'brp'
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content You are not allowed to work in the UK displayed

  Scenario: See 'special cases' error page
    When I go back
    When I go back
    And I enter '111222111' into field 'brp'
    And I click the 'Continue' button
    And I enter a valid date of birth
    And I click the 'Continue' button
    Then I will see the content We can't show your record displayed
    Then I will see the content Contact the Home Office to find out what to do next: displayed

