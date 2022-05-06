module.exports = {
  apps: [
    {
      name: "rc4community",
      script: "npm",
      args: "start -- -p 8090",
      pid_file: "/tmp/rc4community.pid",
      max_restarts: 10,
      autorestarts: true,
      error_file: "rc4community.error.log",
      out_file: "rc4community.log",
      exec_mode: "fork",
      instances: 1,
    },
  ],
};
