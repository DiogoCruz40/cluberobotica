print('Start MONGO DB #################################################################');

db = db.getSiblingDB('clube_de_robotica_db');
db.createUser(
  {
    user: 'ClubeRobotica',
    pwd: "-CWUK58zZsCJ%nGU",
    roles: [{ role: 'readWrite', db: 'clube_de_robotica_db' }],
  },
);
db.createCollection('administradors');

print('END #################################################################');