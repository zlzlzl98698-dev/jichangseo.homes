import http from 'node:http';

http.get('http://localhost:4174/airport/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const m = data.match(/href="([^"]*style[^"]*\.css)"/);
    if (m) {
      console.log('CSS file in HTML:', m[1]);
      http.get('http://localhost:4174' + m[1], (cRes) => {
        let css = '';
        cRes.on('data', chunk => css += chunk);
        cRes.on('end', () => {
          console.log('CSS loaded, status:', cRes.statusCode, 'length:', css.length);
          console.log('Has nowrap?', css.includes('nowrap'));
          let pos = 0;
          while ((pos = css.indexOf('nowrap', pos)) !== -1) {
            console.log('nowrap match:', css.substring(Math.max(0, pos - 30), Math.min(css.length, pos + 50)));
            pos += 6;
          }
        });
      });
    }
  });
});
