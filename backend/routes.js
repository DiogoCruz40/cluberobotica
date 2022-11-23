const express = require('express');
const authController = require("./controllers/auth");
const { authJwt } = require("./middlewares");
const gestaoAdminsController = require("./controllers/gestao-admins");
const impressao3dController = require("./controllers/impressao3d")
const fileController = require('./controllers/file')
const multer = require('multer');
const upload = multer({
  dest: './public/uploads/',
  limits: { fileSize: 8388608 }
});

exports = module.exports = function (app) {

  app.post("/api/auth/iniciar-sessao", authController.signin);

  app.post("/api/auth/registar", authController.signup);

  //app.get('/hello', (req, res) => res.send('Hello World!'))

  app.put(
    "/api/auth/nome",
    [authJwt.verifyToken],
    authController.alterarNome
  );

  app.put(
    "/api/auth/password",
    [authJwt.verifyToken],
    authController.alteraPassword
  );
  app.get(
    "/api/gestao-admins",
    [authJwt.verifyToken, authJwt.isAdminOmni],
    gestaoAdminsController.getAdmins
  );

  app.post(
    "/api/gestao-admins",
    [authJwt.verifyToken, authJwt.isAdminOmni],
    gestaoAdminsController.addAdmin
  );

  app.delete(
    "/api/gestao-admins",
    [authJwt.verifyToken, authJwt.isAdminOmni],
    gestaoAdminsController.removeAdmin
  );

  app.put(
    "/api/gestao-admins",
    [authJwt.verifyToken, authJwt.isAdminOmni],
    gestaoAdminsController.alterapassAdmin
  );


  // ------------------------------- Impressão 3D ------------------------------- //

  app.get(
    "/api/impressao3d", 
    [authJwt.verifyToken],
    impressao3dController.getImpressao3d
  );

  app.post(
  "/api/impressao3d/submissao", upload.single('ficheiro3d'),
  [],
  impressao3dController.submissaoImpressao3d
);


  // ------------------------------- File ------------------------------- //
  app.get(
    "/api/file",
    [],
    fileController.getFile
  );

}