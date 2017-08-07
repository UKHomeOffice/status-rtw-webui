Feature: Confirmation of share with employer

  *Description*
  As an employer
  I want to see a "The details you entered don't match our records" error page when I have entered invalid authentication details
  so that I know why I have not been allowed access to the system

  *Acceptance criteria*
  The page should be shown to users authenticating through the employer UI only
  The page should be shown when:
    User enters a BRP number that is not found
    User enters a BRP that is found and current, but the 4-digit access code entered does not match the access code stored for the share of that BRP
    User enters a BRP and 4-digit access code that is correct, but the share validity has expired
  Screen should match the prototype at https://ho-rtw-beta.herokuapp.com/update-1/check/employer-error - screenshot attached


  Background:
    Given I am on the employer 'BRP number' page

  Scenario: API returns a 400 with errorType 'SECURITY_CODE_NOT_MATCH'
    Given I enter 123456789 into the field applicant-brp
    And I enter 1234 into the field access-code
    And I click the 'Continue' button
    Then I will be directed to the employer error page
    And I will see the content The details entered don't match our records displayed
    And I will see the content 123456789 displayed
    And I will see the content 1234 displayed
    And I will see the content enter the Biometric Residence Permit (BRP) number exactly as it is written on the job applicant's card displayed
    And I will see the content use the 4-digit code from your email displayed

  Scenario: API returns a 400 with errorType 'SECURITY_CODE_EXPIRED'
    Given I enter 123456788 into the field applicant-brp
    And I enter 1234 into the field access-code
    And I click the 'Continue' button
    Then I will be directed to the employer error page
    And I will see the content Your security code has expired displayed


  Scenario: API returns a 400
    Given I enter 222222221 into the field applicant-brp
    And I enter 1234 into the field access-code
    And I click the 'Continue' button
    Then I will be directed to the employer error page

  Scenario: API returns a 404
    Given I enter 222222222 into the field applicant-brp
    And I enter 1234 into the field access-code
    And I click the 'Continue' button
    Then I will be directed to the employer error page


  Scenario: API returns a 400 with no errorType in body
    Given I enter 222222223 into the field applicant-brp
    And I enter 1234 into the field access-code
    And I click the 'Continue' button
    Then screen shot
    Then I will be directed to the generic employer error page


  Scenario: I enter valid details
    Given I enter valid data on the 'Applicant' details page
    And I click the 'Continue' button
    Then I will be directed to the employer company details page

  Scenario: API returns a 400 with errorType 'ACCOUNT_LOCKED_OUT'
    Given I enter 121212121 into the field applicant-brp
    And I enter 1234 into the field access-code
    And I click the 'Continue' button
    Then I will be directed to the employer error page
    Then I will see the content Too many incorrect attempts displayed
    Then I will see the content You entered incorrect details 5 times in a row. displayed
    Then I will see the content Wait 15 minutes before you try again. displayed
