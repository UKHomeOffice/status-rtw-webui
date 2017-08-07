Given(/^I click the '(.*)' link$/) do |link|
  click_link_or_button link
end

Then(/^the '(.*)' link is removed$/) do |link|
  page.should_not have_content(link)
end

Then(/^the '(.*)' link is present$/) do |link|
  page.should have_content(link)
end

Then(/^I am presented with the '(.*)' error message$/) do |error_msg|
  expect(page).to have_content error_msg
end


And(/^I click the '(.*)' button$/) do |thebutton|
  click_button thebutton
end

When(/^I enter (.*) into the field (.*)$/) do |value, field|
  fill_in field, :with => value
end

When(/^I select (.*) from the field (.*)$/) do |value, field|
  select value, :from => field
end

Then(/^screen shot$/) do
  page.save_screenshot("screenshots/screenshot.png", full: true)
end

Then(/^screen shot2$/) do
  page.save_screenshot("screenshots/screenshot2.png", full: true)
end


Given(/^I select the option '(.*)'$/) do |value|
  check(value)
end

Given(/^I select the radio option '(.*)'$/) do |value|
  choose(value)
end

And(/^I enter (\d+) characters into field '(.*)'$/) do |length, field|
  fill_in field, :with => "A" * length.to_i
end

And(/^I enter (\d+) characters into the hidden field '(.*)'$/) do |length, field|
  Capybara.ignore_hidden_elements = false
  fill_in field, :with => "A" * length.to_i
  Capybara.ignore_hidden_elements = true
end


Then(/^I am asked for my '(.*)'$/) do |label|
  find_field(label)
end

When(/^I input an invalid (.*) address details (.*)$/) do |input, id|
  if (id == 'address-country')
    select input, :from => id
  else
    fill_in id, :with => input
  end
end

Then(/^I will be displayed an (.*) for each mandatory address field$/) do |error_msg|
  expect(page).to have_content error_msg
end

Then(/^I am shown the title (.*)$/) do |title|
  expect(page).to have_content title
end

Then(/^I will see the content (.*) displayed$/) do |content|
  expect(page).to have_content content
end

Then /^I will not see the content (.*?) displayed$/ do |arg1|
  page.should have_no_content(arg1)
end


And(/^I enter '(.*)' into field '(.*)'$/) do |content, field|
  fill_in field, :with => content
end

When(/^I click the '(.*)' summary link$/) do |content|
  find("summary", :text => content).click
end

When(/^I go back$/) do
  page.evaluate_script('window.history.back()')
end