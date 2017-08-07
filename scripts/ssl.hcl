vault {
    renew_token = true
    ssl {
        enabled = true
        verify = true
    }
}

template {
    source = "/tmp/consul/templates/cert.crt.ctmpl"
    destination = "/etc/ssl/certs/status-wildcard.crt"
    perms = 0444
    backup = true
}

template {
    source = "/tmp/consul/templates/cert.key.ctmpl"
    destination = "/etc/ssl/certs/status-wildcard.key"
    perms = 0444
    backup = true
}

template {
    source = "/tmp/consul/templates/ebasa_root_ca.crt.ctmpl"
    destination = "/etc/ssl/certs/ebsa_root_ca.crt"
    perms = 0444
    backup = true
}

template {
    source = "/tmp/consul/templates/logstash_ca.crt.ctmpl"
    destination = "/etc/ssl/certs/logstash_ca.crt"
    perms = 0444
    backup = true
}
