Then(/^I should know what the service does$/) do
  expect(page).to have_content "Using this service will not provide a statutory excuse from civil penalty - employers will still need to conduct right to work checks."
end

And(/^I should know what I need to successfully complete the service$/) do
  expect(page).to have_content "Before you start"
  expect(page).to have_content "their Biometric Residence Permit (BRP) number"
  expect(page).to have_content "your security code"
  expect(page).to have_content "your company name"
end

And(/^I can proceed to the next step \(job applicant's details\)$/) do
  click_button "Start now"
  current_path.should == '/check/applicant-details'
end
