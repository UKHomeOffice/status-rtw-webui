When(/^I enter valid data on the 'Applicant' details page$/) do
  fill_in "applicant-brp", :with => "123412341"
  fill_in "access-code", :with => "1234"
end
