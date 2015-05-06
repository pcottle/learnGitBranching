var mapping = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

module.exports = function(string) {
  return ('' + string).replace(/[&<>"'\/]/g, function(match) {
    return mapping[match];
  });
};
