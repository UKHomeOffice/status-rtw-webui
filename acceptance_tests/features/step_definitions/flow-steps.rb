
Given(/^I am on the 'Start' page$/) do
  visit config['host'] + '/view'
end

Given(/^I am on the 'BRP number' page$/) do
  step "I am on the 'Start' page"
  step "I click the 'Start now' link"
end

Then(/^I will be directed to the personal details page$/) do
  current_path.should == '/view/personal-details'
end

Then(/^I will be directed to the jobseeker error page$/) do
  current_path.should == '/view/error'
end

Then(/^I will be directed to the employer privacy policy page$/) do
  current_path.should == '/check/privacy'
end

Then(/^I will be directed to the jobseeker start page$/) do
  current_path.should == '/view/start'
end


Then(/^I will be directed to the profile page$/) do
  current_path.should == '/view/profile'
end

Then(/^I should go to the check email address page$/) do
  current_path.should == '/view/confirm-employer-email'
end

Then(/^I should go to the enter employer email address page$/) do
  current_path.should == '/view/share-email'
end

Then(/^I should go to the sent email confirmation page$/) do
  current_path.should == '/view/email-sent'
end

Given(/^I am on the 'Invalid BRP' page$/) do
  step "I am on the 'BRP number' page"
  fill_in "brp", :with => "123456111"
  step "I click the 'Continue' button"
  step "I enter a valid date of birth"
  step "I click the 'Continue' button"
end

Given(/^I am on the 'Share No Email' page$/) do
  step "I am on the 'Share Email' page"
  step "I click the 'I don't know their email address' link"
end

Given(/^I am on the 'View Security Code' page$/) do
  step "I am on the 'Share Email' page"
  step "I click the 'I don't know their email address' link"
  step "I click the 'Create security code' button"
end

Given(/^I am on the 'Personal Details' page$/) do
  step "I am on the 'BRP number' page"
  step "I enter valid data on the 'BRP number' page"
  step "I click the 'Continue' button"
end

Given(/^I am on the 'Profile' page$/) do
  step "I am on the 'Personal Details' page"
  step "I enter a valid date of birth"
  step "I click the 'Continue' button"
end

Given(/^I am on the 'Share Email' page$/) do
  step "I am on the 'Profile' page"
  step "I click the 'Share this with an employer' button"
end

Given(/^I am on the 'Check Email' page$/) do
  step "I am on the 'Share Email' page"
  step "I enter a valid email address"
  step "I click the 'Continue' button"
end

Given(/^I am on the 'Share Confirmation' page$/) do
  step "I am on the 'Check Email' page"
  step "I click the 'Send' button"
end

# EMPLOYER steps VVVV

Given(/^I am on the 'Employer start' page$/) do
  visit config['host'] + '/check'
end

Given(/^I am on the employer 'BRP number' page$/) do
  step "I am on the 'Employer start' page"
  step "I click the 'Start now' link"
end

Then(/^I will be directed to the employer company details page$/) do
  current_path.should == '/check/company-details'
end

Then(/^I will be directed to the employer error page$/) do
  current_path.should == '/check/error'
end

Then(/^I will be directed to the generic employer error page$/) do
  expect(page).to have_content "There's a problem with this service at the moment"
end

Given(/^I am on the 'Employer profile' page$/) do
  step "I am on the employer 'details' page"
  step "I enter valid data on the employer 'details' page"
  step "I click the 'Continue' button"
end

Given(/^I am on the employer 'details' page$/) do
  step "I am on the employer 'BRP number' page"
  step "I enter valid data on the 'Applicant' details page"
  step "I click the 'Continue' button"
end