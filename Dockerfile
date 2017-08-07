FROM quay.io/ukhomeofficedigital/nodejs-base:v6.9.1

#set proxy
ENV http_proxy 'http://proxy.local:8080'
ENV https_proxy 'http://proxy.local:8080'
ENV no_proxy 'localhost, 127.0.0.1, 169.254.169.254, .iptho.co.uk, .ipttools.io, .ipttools.info, .svc.cluster.local, 10.200.0.1, 10.200.0.10'

COPY . /app

ADD https://releases.hashicorp.com/consul-template/0.18.1/consul-template_0.18.1_linux_amd64.zip /consul-template_0.18.1_linux_amd64.zip

RUN cd $(npm root -g)/npm && \
  npm install fs-extra && \
  sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js && \
  yum clean all && \
  yum update -y && \
  yum install -y epel-release && \
  yum install -y wget unzip && \
  yum clean all && \
  rm -rf /var/cache/yum && \
  rpm --rebuilddb && \
  mkdir -p /opt/consul-template/bin /opt/consul-template/templates && \
  unzip /consul-template_0.18.1_linux_amd64.zip -d /opt/consul-template/bin/ && \
  ln -s /opt/consul-template/bin/consul-template /usr/local/bin/consul-template && \
  rm -rf /consul-template_0.18.1_linux_amd64.zip && \
  npm install -g npm@latest --loglevel warn && \
  mkdir -p /tmp/consul/templates && \
  mkdir -p /tmp/scripts/ && \
  mv /app/templates/* /tmp/consul/templates && \
  mv /app/scripts/* /tmp/scripts/ && \
  mkdir /public && \
  mkdir /var/log/nodejs && \
  chown -R root:root /var/log/nodejs && \
  chown -R nodejs:nodejs /app && \
  chmod +x /app/docker-entrypoint.sh

CMD cd /app

RUN npm rebuild node-sass --force &&  \
    npm run build

#unset proxy
ENV http_proxy=
ENV https_proxy=
ENV no_proxy=

CMD ./docker-entrypoint.sh
