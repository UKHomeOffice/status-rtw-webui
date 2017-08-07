When(/^I enter valid data on the employer 'details' page$/) do
  fill_in "employee-name", :with => "qwer"
  fill_in "company-name", :with => "asdf"
end
