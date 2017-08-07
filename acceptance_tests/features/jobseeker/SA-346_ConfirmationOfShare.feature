Feature: Confirmation of share with employer

  *Description*
  As a job seeker
  I want to know that an email has sent
  So I know I have shared my right to work


  Background:
    Given I am on the 'Share Confirmation' page

  Scenario: Completed the sharing
    Then I should know that I have sent access to my right to work

  Scenario: Shared my right to work
    Then the email address should be the same as the one I entered

  Scenario: Know what happens next
    Then I will know what else I need to do


