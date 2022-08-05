const config = {
  db: {
    // pc server configuration locally
    host: "localhost",
    user: "dotsuser",
    password: "Passw0rd123!@#",
    database: "dots",
  },
  db1: {
    // openshift configuration
    host: "172.16.112.118",
    user: "root",
    password: "rootpassword",
    database: "dots",
  },
  db2: {
    // pc server configuration remotely
    host: "10.32.51.153",
    user: "dotsuser",
    password: "Passw0rd123!@#",
    database: "dots",
  },
  numPerPage: 10,
  secretKey: "12345-67890-abcde-tmone",
  refreshSecretKey: "tmone-12345-67890-abcde",
};

module.exports = config;
