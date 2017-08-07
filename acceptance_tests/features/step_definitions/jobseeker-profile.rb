Then(/^I will see the content (.*) displayed in the header$/) do |content|
  expect(find(:css, '.phase-banner')).to have_text(content)
end

When(/^I click the '(.*)' link in the header$/) do |content|
  # find(:css, '.phase-banner', :text => content).click
  within(".phase-banner") do
    click_on(content)
  end
end
