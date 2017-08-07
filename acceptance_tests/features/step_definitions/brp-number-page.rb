When(/^I enter a valid BRP number$/) do
  fill_in "brp", :with => "123123123"
end

When(/^I enter valid data on the 'BRP number' page$/) do
  fill_in "brp", :with => "123123123"
end
