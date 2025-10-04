if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.error('This project uses yarn, not npm!!! Please use yarn to install dependencies.');
  process.exit(1);
}
