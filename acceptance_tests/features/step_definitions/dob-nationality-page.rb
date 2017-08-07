When(/^I enter a valid date of birth$/) do
  fill_in "dob-day", :with => "16"
  fill_in "dob-month", :with => "03"
  fill_in "dob-year", :with => "1980"
end

When(/^I enter a valid Country of Nationality$/) do
  select "Hungary", :from => "nationality"
end
