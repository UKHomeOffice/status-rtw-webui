Then(/^I should have the external url '(.*)'$/) do | url |
  current_url.should == url
end