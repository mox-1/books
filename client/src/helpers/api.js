import request from 'superagent';

export default {
    get: function(requestUrl) {
        return new Promise((resolve, reject) => {
            request.get(requestUrl)
               .end((err, res) => {
                   if (res && res.status && res.status < 400) {
                       resolve(res.body);
                   } else {
                       reject(res || 'Something went wrong');
                   }
                });
        })
    }
}