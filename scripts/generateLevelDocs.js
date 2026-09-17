/**
 * Generates generatedDocs/levels.html from the level definitions.
 * (Formerly a gulp task; standalone now that the build is on Vite.)
 */
const { readFileSync, writeFileSync } = require('fs');
const allLevels = require('../src/levels/index');
const { marked } = require('marked');

const convertMarkdownStringsToHTML = (markdowns) => {
  return marked(markdowns.join('\n'));
};

const cssContent = readFileSync('./generatedDocs/github-markdown.css');

let htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Learn Git Branching - Level Documentation</title>
    <style>${cssContent}</style>
    <style>
      body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 40px; }
      .level { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
      .level-name { color: #333; }
      .level-goal { background: #f5f5f5; padding: 10px; border-radius: 4px; }
      .level-solution { font-family: monospace; background: #f0f0f0; padding: 10px; }
      .level-hint { color: #666; font-style: italic; }
    </style>
  </head>
  <body>
    <div class="markdown-body">
      <h1>Learn Git Branching - All Levels Documentation</h1>
`;

Object.keys(allLevels.sequenceInfo).forEach((sequenceKey) => {
  const sequenceInfo = allLevels.sequenceInfo[sequenceKey];
  htmlContent += `
    <h2>Level Sequence: ${sequenceInfo.displayName.en_US}</h2>
    <h6>${sequenceInfo.about.en_US}</h6>
  `;

  const levels = allLevels.levelSequences[sequenceKey];
  for (const level of levels) {
    htmlContent += `<h3>Level: ${level.name.en_US}</h3>`;

    const startDialog = level.startDialog.en_US;
    for (const dialog of startDialog.childViews) {
      const childViewType = dialog.type;
      if (childViewType === 'ModalAlert') {
        htmlContent += convertMarkdownStringsToHTML(dialog.options.markdowns);
      } else if (childViewType === 'GitDemonstrationView') {
        htmlContent += convertMarkdownStringsToHTML(dialog.options.beforeMarkdowns);
        htmlContent += `<pre class="level-solution">${dialog.options.command}</pre>`;
        htmlContent += convertMarkdownStringsToHTML(dialog.options.afterMarkdowns);
      } else {
        throw new Error(`Unknown child view type: ${childViewType}`);
      }
    }
  }
});

htmlContent += `
  </div>
  </body>
  </html>
`;

writeFileSync('generatedDocs/levels.html', htmlContent);
console.log('Level documentation generated at generatedDocs/levels.html');
