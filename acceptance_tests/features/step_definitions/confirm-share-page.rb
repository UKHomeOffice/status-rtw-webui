Then(/^I should know that I have sent access to my right to work$/) do
  expect(page).to have_content "Email sent"
end

Then(/^the email address should be the same as the one I entered$/) do
  expect(page).to have_content "hiringmanager@employer.com"
end

Then(/^I will know what else I need to do$/) do
  expect(page).to have_content "What happens next"
end

