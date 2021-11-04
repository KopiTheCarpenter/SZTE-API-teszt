const http = require('http')

function client(hostname, port) {
    return {
        get: async function(path) {
            return new Promise((resolve, reject) => {
               
                const options = {
                    hostname: hostname,
                    port: port,
                    path: path,
                    method: 'GET'
                };
                
                const req = http.request(options, (res) => {
                    
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', (chunk) => {
                        body += chunk
                    });
                    res.on('end', () => {
                        resolve({'code': res.statusCode, 'body': body})
                    });
                });
                
                req.on('error', (e) => {
                    reject(e)
                });
                
                req.end();
            })
        },

        post: async function(path, body) {
            return new Promise((resolve, reject) => {
                
                const postData = JSON.stringify(body);
                    
                const options = {
                    hostname: hostname,
                    port: port,
                    path: path,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };
                
                const req = http.request(options, (res) => {
                    
                    res.setEncoding('utf8');
                    let body = ''
                    res.on('data', (chunk) => {
                        body+= chunk
                    });

                    res.on('end', () => {
                        resolve({'code': res.statusCode, 'body': body})
                    });
                });
                
                req.on('error', (e) => {
                    reject(e)
                });
                
                req.write(postData);
                req.end();
            })
        },

        put: async function(path, body) {
            return new Promise((resolve, reject) => {
                
                const postData = JSON.stringify(body);
                    
                const options = {
                    hostname: hostname,
                    port: port,
                    path: path,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };
                
                const req = http.request(options, (res) => {
                    
                    res.setEncoding('utf8');
                    let body = ''
                    res.on('data', (chunk) => {
                        body+= chunk
                    });

                    res.on('end', () => {
                        resolve({'code': res.statusCode, 'body': body})
                    });
                });
                
                req.on('error', (e) => {
                    reject(e)
                });
                
                req.write(postData);
                req.end();
            })
        },

        delete: async function(path) {
            return new Promise((resolve, reject) => {
               
                const options = {
                    hostname: hostname,
                    port: port,
                    path: path,
                    method: 'DELETE'
                };
                
                const req = http.request(options, (res) => {
                    
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', (chunk) => {
                        body += chunk
                    });
                    res.on('end', () => {
                        resolve({'code': res.statusCode, 'body': body})
                    });
                });
                
                req.on('error', (e) => {
                    reject(e)
                });
                
                req.end();
            })
        },
    }
} 

module.exports = client;