Feature: Employer start page

  *Description*
  As an employer
  I need to know how to check someone's right to work
  so that I know if I can use the service

  *Acceptance criteria*
  It's done when:
  I know what the service does
  I know what I need to successfully complete the service
  I can proceed to the next step (job applicant's details)


  Background:
    Given I am on the 'Employer start' page

  Scenario: Start page information is displayed
    Then I should know what the service does
    And I should know what I need to successfully complete the service
    And I can proceed to the next step (job applicant's details)


  Scenario: I can access the employer privacy policy
    When I click the 'Privacy' link
    Then I will be directed to the employer privacy policy page

  Scenario: link to jobseeker route from employer privacy policy works
    When I click the 'Privacy' link
    And I click the 'prove your right to work to an employer' link
    Then I will be directed to the jobseeker start page

