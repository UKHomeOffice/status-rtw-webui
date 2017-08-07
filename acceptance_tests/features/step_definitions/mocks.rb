require 'sinatra'
require 'json'

GlobalState = {}
GlobalState[:lastRequestResponse] = {}.to_json

class Mocks < Sinatra::Base
  set :port, 8001

  get '/ipt-ss-reference-data-services/values/:refDataValueId' do
    { :refDataValueId => '123456', :refDataValueLongDesc => 'China' }.to_json
  end

  get '/ipt-ss-reference-data-services/sets/COUNTRY' do
    {refDataValues:
         [
             { :refDataValueId => '123456', :refDataValueLongDesc => 'China' },
             { :refDataValueId => '654321', :refDataValueLongDesc => 'France' },
             { :refDataValueId => '58234', :refDataValueLongDesc => 'United Kingdom of Great Britain and Northern Ireland' }
         ]}.to_json
  end

  get '/category' do
    File.read(File.dirname(__FILE__) +"/categories.json")
  end

  post '/request' do
    GlobalState[:lastRequestResponse] = JSON.parse( request.body.read.to_s )
    {urn: '1234-1234-1234-1234'}.to_json
  end

  get '/last-request-body' do
    GlobalState[:lastRequestResponse].to_json
  end

  post '/status/123456666/jobseeker/calculate' do
    status 400
    body({ :errorType => "INCORRECT_BIOGRAPHIC" }.to_json)
  end

  post '/status/123456111/jobseeker/calculate' do
    status 400
    body({ :errorType => "BRP_CARD_INACTIVE" }.to_json)
  end

  post '/status/123456789/jobseeker/calculate' do
    status 400
    body({ :errorType => "NO_PERSON_FOUND" }.to_json)
  end

  post '/status/121212121/jobseeker/calculate' do
    status 400
    body({ :errorType => "ACCOUNT_LOCKED_OUT" }.to_json)
  end

  post '/status/555555555/jobseeker/calculate' do
    status 500
  end

  # workstatus exception
  post '/status/666666666/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "EXCEPTION_CONDITIONS",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "M",
        photo: "somevalidbase64photodata"
    }.to_json
  end

  # no full name
  post '/status/777777777/jobseeker/calculate' do
    {
        fullName: "",
        workStatus: "EXCEPTION_CONDITIONS",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "M",
        photo: "somevalidbase64photodata"
    }.to_json
  end

  # no work status
  post '/status/888888888/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "M",
        photo: "somevalidbase64photodata"
    }.to_json
  end

  # no gender
  post '/status/999999999/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_UNRES_ILR",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "",
        photo: "somevalidbase64photodata"
    }.to_json
  end

  post '/status/987654321/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_UNRES_ILR",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "male",
        photo: ""
    }.to_json
  end

  # curtailed leave
  post '/status/111222333/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_RES_SELF_NO_DR_SPORTS",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "male",
        photo: "",
        isCurtailed: true
    }.to_json
  end

  # curtailed leave
  post '/status/111222333/employer/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_RES_SELF_NO_DR_SPORTS",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "male",
        photo: "",
        isCurtailed: true
    }.to_json
  end

  # curtailed leave expired
  post '/status/111222332/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_RES_SELF_NO_DR_SPORTS",
        is3C: true,
        validUntil: "2018-01-15",
        gender: "male",
        photo: "",
        isCurtailed: true
    }.to_json
  end

  post '/status/987654333/jobseeker/calculate' do
    {
        fullName: "Lucas SilvaNoImage",
        workStatus: "WORK_RES_SELF_NO_DR_SPORTS",
        is3C: true,
        validUntil: "2022-02-05",
        gender: "M",
        photo: ""
    }.to_json
  end

  post '/status/111222111/jobseeker/calculate' do
    {
        fullName: "Lisa Harris",
        workStatus: "EXCEPTION_NOGRANT_FOUND",
        is3C: true,
        validUntil: "2025-01-15",
        gender: "F",
        photo: "somevalidbase64photodata",
        isCurtailed: false
    }.to_json
  end

  post '/status/:brp/jobseeker/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_UNRES_ILR",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "M",
        photo: "somevalidbase64photodata"
    }.to_json
  end

  post '/status/987654333/employer/calculate' do
    {
        fullName: "Lucas SilvaNoImage",
        workStatus: "WORK_RES_SELF_NO_DR_SPORTS",
        is3C: true,
        validUntil: "2022-02-05",
        gender: "M",
        photo: ""
    }.to_json
  end

  post '/status/202202202/employer/calculate' do
    status 202
    body({ :infoType => "RTW_STATUS_CHANGED" }.to_json)
  end

  post '/status/:brp/employer/calculate' do
    {
        fullName: "Alexis Korner",
        workStatus: "WORK_UNRES_ILR",
        is3C: true,
        validUntil: "2019-12-25",
        gender: "M",
        photo: "somevalidbase64photodata"
    }.to_json
  end



  post '/status/123456789/validateEmployer' do
    status 400
    body({ :errorType => "SECURITY_CODE_NOT_MATCH" }.to_json)
  end

  post '/status/123456788/validateEmployer' do
    status 400
    body({ :errorType => "SECURITY_CODE_EXPIRED" }.to_json)
  end

  post '/status/222222221/validateEmployer' do
    status 400
    body({ :errorType => "NO_PERSON_FOUND" }.to_json)
  end

  post '/status/222222222/validateEmployer' do
    status 404
    body({ :errorType => "NO_PERSON_FOUND" }.to_json)
  end

  post '/status/121212121/validateEmployer' do
    status 400
    body({ :errorType => "ACCOUNT_LOCKED_OUT" }.to_json)
  end

  post '/status/222222223/validateEmployer' do
    status 400
    body({ }.to_json)
  end

  post '/status/:brp/validateEmployer' do
    {
        status: 200,
        metadata: {},
        entity: {}
    }.to_json
  end

  post '/status/:brp/share' do
    {
      shareCode: "8097"
    }.to_json
  end

end

Before do
  if ENV['NO_MOCKS']
    puts 'Running no mocks'
  else
      if $pid.nil?
        $pid = fork do
           Mocks.run!
        end
        sleep 10
      end
  end
end

at_exit do
  unless $pid.nil?
    Process.kill "TERM", $pid
    Process.wait $pid
  end
end
