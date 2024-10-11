function ajaxBuildSettings(_url, _data, method = 'PUT') {
  if(_data===undefined)
    var _req ;
  else
    var _req = _data;

  return  {
      "async": true,
      "crossDomain": true,
      "url": config.siteUrl + _url,
      "type": method,
      "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
      },
      "processData": false,
      "data":_req
  }
}