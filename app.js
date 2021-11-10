// Copyright 2021 Yijun Liu <francislyj@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const proxy = require("node-tcp-proxy");
const util = require("util");
const config = require('./config');

const newProxy = proxy.createProxy(config.port, config.serviceHosts, config.servicePorts, {
  upstream: function(context, data) {
    console.log(util.format("Client %s:%s sent:",
      context.proxySocket.remoteAddress,
      context.proxySocket.remotePort));
    // do something with the data and return modified data
    return data;
  },
  downstream: function(context, data) {
    console.log(util.format("Service %s:%s sent:",
      context.serviceSocket.remoteAddress,
      context.serviceSocket.remotePort));
    // do something with the data and return modified data
    return data;
  },
  serviceHostSelected: function(proxySocket, i) {
    console.log(util.format("Service host %s:%s selected for client %s:%s.",
      config.serviceHosts[i],
      config.servicePorts[i],
      proxySocket.remoteAddress,
      proxySocket.remotePort));
    // use your own strategy to calculate i
    return i;
  }
});

console.log('server start success!!! port ===>', config.port);