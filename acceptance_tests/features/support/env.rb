require 'rubygems'
require 'capybara'
require 'capybara/dsl'
require 'rspec'
require 'show_me_the_cookies'
require 'capybara/poltergeist'
require 'phantomjs'
# require 'selenium-webdriver'
require 'axe/cucumber/step_definitions'
require 'rest-client'

require 'yaml'

if ENV['IN_BROWSER']
  # On demand: non-headless tests via Selenium/WebDriver
  # To run the scenarios in browser (default: Firefox), use the following command line:
  # IN_BROWSER=true bundle exec cucumber
  # or (to have a pause of 1 second between each step):
  # IN_BROWSER=true PAUSE=1 bundle exec cucumber
  Capybara.default_driver = :selenium

  Capybara.register_driver :selenium do |app|
    require 'selenium/webdriver'
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.helperApps.alwaysAsk.force'] = false
    profile['browser.cache.disk.enable'] = false
    profile['browser.cache.memory.enable'] = false
    Capybara::Selenium::Driver.new(app, :browser => :firefox, :profile => profile)
  end
else
  Capybara.run_server = false
  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(app, :phantomjs => Phantomjs.path)
  end
  Capybara.default_driver = :poltergeist
end

Capybara.default_selector = :css
Capybara.automatic_label_click = true
Capybara.default_max_wait_time = 0.1


module Helpers
  def without_resynchronize
    page.driver.options[:resynchronize] = false
    yield
    page.driver.options[:resynchronize] = true
  end
end

World(Capybara::DSL, Helpers)

World(ShowMeTheCookies)

def config
  config_file = "#{File.dirname(__FILE__)}/config_test.yml"
  if  ENV['CONFIG_FILE']
    config_file = "#{File.dirname(__FILE__)}/" + ENV['CONFIG_FILE']
  end
  YAML.load_file(config_file)
end

def rest
  sleep config['sleep_time']
end

def translationFor(context, key)
  json = JSON.parse(
      RestClient.get(
          config['host'] + "/#{context}/translation-for",
          :params => {:id => key },
          :cookies => {:'hof-cookie-check' => '1'}))
  json["text"]
end


RSpec.configure do |config|
  # config.include ShowMeTheCookies, :type => :feature
  config.run_all_when_everything_filtered = true
  config.filter_run :focus

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = 'random'
end
