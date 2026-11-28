/* Isolate the reference capture from the existing A–F application. */
(function () {
  var query = new URLSearchParams(location.search);
  if ((query.get('approach') || '').toLowerCase() !== 'g') return;
  var destination = new URL('g/', location.href);
  destination.hash = location.hash;
  location.replace(destination.href);
})();
