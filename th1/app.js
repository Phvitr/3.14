const cookie = require('cookie');
const escapeHtml = require('escape-html');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let query = url.parse(req.url,true,true).query;
    if (query && query.remember && query.name) {
        res.setHeader('set-Cookie',cookie.serialize('name', String(query.name),{
            httpOnly: true,
            maxAge: 60*60*24*7
        }));
        res.Statuscode = 302;
        res.setHeader('Location',req.headers.referer || '/');
        res.end();
        return;
    }
    let cookies = cookie.parse(req.headers.cookie || '');
    let name = cookies.name;

    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    if (name) {
        res.write('<form method="GET">');
        res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
        res.write('<input placeholder="enter your name" name="name" value="' + escapeHtml(name) + '"></br>');
        res.write('<input type="checkbox" id="remember" name="remember" value="true">\n' +
            '<label for="vehicle2"> Remember me</label><br>');
        res.write('<input type="submit" value="Set Name">');
    } else {
        res.write('<form method="GET">');
        res.write('<p>Hello, new visitor!</p>');
        res.write('<input placeholder="enter your name" name="name" value=""></br>');
        res.write('<input type="checkbox" id="remember" name="remember" value="true">\n' +
            '<label for="vehicle2"> Remember me</label><br>');
        res.write('<input type="submit" value="Set Name">');
        res.end('</form>');
    }

})

server.listen(8001, () => {
    console.log('server is listening on port 8001');
})