#!/bin/sh

# execute the boiler plate stuff
chmod a+x /etc/properties/init.sh && source /etc/properties/init.sh

set -o allexport
source /tmp/sslinit/consul-template.properties
set +ox allexport

# deploy ssl certs
consul-template -config /tmp/scripts/ssl.hcl -once

# start npm as nodejs
su nodejs -s /bin/sh -c 'npm start'
