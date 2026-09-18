function sendList(res, data, meta) {
  return res.status(200).json({ data, meta });
}

function sendCreated(res, post) {
  return res.status(201).json({ data: post });
}

function sendOk(res, post) {
  return res.status(200).json({ data: post });
}

function sendError(res, status, message) {
  return res.status(status).json({ error:{
    message
  } 
});
}


module.exports = {
  sendList,
  sendCreated,
  sendOk,
  sendError
};
