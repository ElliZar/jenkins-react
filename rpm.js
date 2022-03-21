const fs = require("fs");
const path = require("path");
const buildRpm = require("rpm-builder");
const { promisify } = require("util");

const readDir = promisify(fs.readdir);
const buildRpmPromisifide = promisify(buildRpm);

const pathToBuild = path.join(__dirname + "/build");

const BUILD_NUMBER = process.env.BUILD_NUMBER || "BUILD_NUMBER";
const JOB_NAME = process.env.JOB_NAME || "JOB_NAME";
const BUILD_ID = process.env.BUILD_ID || "BUILD_ID";
const WORKSPACE = process.env.WORKSPACE || "WORKSPACE";
const BUILD_URL = process.env.BUILD_URL || "BUILD_URL";
const JOB_URL = process.env.JOB_URL || "JOB_URL";

const description = `
  Jenkins job '${JOB_NAME}' (${JOB_URL}).
  Build number '${BUILD_NUMBER}' with id '${BUILD_ID}'.
  Workspace: ${WORKSPACE}.
  If you want to check build, please go to ${BUILD_URL}.
`;

readDir(pathToBuild)
  .then((files) => {
    return files.map((item) => ({
      cwd: pathToBuild,
      src: `/${item}`,
      dest: "/dist/",
    }));
  })
  .then((paths) => {
    const options = {
      name: "fix-mgnt",
      version: "1.0.0",
      summary: "RPM file for fix-management-ui application",
      description,
      release: "1",
      buildArch: "x86_64",
      epoch: Math.floor(new Date().getTime() / 1000),
      group: "LSEG-Refinitiv",
      license: "Refinitiv",
      keepTemp: true,
      files: paths,
    };
    return options;
  })
  .then((options) => buildRpmPromisifide(options))
  .then((path) => console.log(path))
  .catch(console.error);
