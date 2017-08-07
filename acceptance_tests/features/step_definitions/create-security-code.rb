Then(/^I should have the share code (.*)$/) do |sharecode|
  expect(page).to have_content sharecode
end

Then(/^I should be returned to the jobseeker start page$/) do
  current_path.should == '/view/start'
end

Then(/^I should be returned to the share with an employer page$/) do
  current_path.should == '/view/share-email'
end