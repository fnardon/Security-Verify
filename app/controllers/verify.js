
module.exports.verify = function (application, req, res) {
        res.render("verify/consents",{id : "id vazio", token: "token vazio"});
};

module.exports.token = function (application, req, res) {


        //chamar client
        const fetch = require('node-fetch');
        var axios = require('axios');
        var qs = require('qs');
        var tenant_url = "gft.verify.ibm.com/v1.0";
        var client_id = "da6003dc-6610-4c29-b25a-3e970d41e0b9";
        var client_secret = "joBTJbo8OL";

        var data = {
                'grant_type': 'client_credentials',
                'client_id': client_id,
                'client_secret': client_secret,
                'scope': 'openid'
        };

        var request = {
                method: 'post',
                url: 'https://' + tenant_url + '/endpoint/default/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data)
        };

        axios(request).then((response) => {
                var tokenData = response.data;
                var access_token = tokenData.access_token;

                console.log(access_token);
                var axios = require('axios');
                var data = JSON.stringify({
                  "isGlobal": true,
                  "subjectId": "Fabio Nardoni 01",
                  "purposeId": "prop-gft",
                  "state": 1,
                  "attributeId": "ESCOPOS",
                  "customAttributes": [
                    {
                      "name": "string",
                      "value": "string"
                    }
                  ],
                  "isExternalSubject": true
                });
                
                var config = {
                  method: 'post',
                  url: 'https://'+ tenant_url + '/privacy/consents',
                  headers: { 
                    'Authorization': 'Bearer '+ access_token, 
                    'Content-Type': 'application/json'                  },
                  data : data
                };
                
                axios(config)
                .then(function (response) {
                        var location = JSON.stringify(response.headers['location']);
                        var partes = location.split('/');
                        var posicaoConsentId = partes.length - 1;
                        var consentIdComAspas = partes[posicaoConsentId];
                        var consentId = consentIdComAspas.replace('"', '')

                        console.log(consentId);

                        res.render("verify/consents", {id : consentId, token: access_token});

                })
                .catch(function (error) {
                  console.log(error);
                });
                

        }).catch((error) => {
                console.log(error);
        });
        


};




