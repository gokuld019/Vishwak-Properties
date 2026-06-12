const bcrypt = require('bcryptjs');

const hash =
'$2b$10$HenrT7YKHF.tvzHP/W8FS.cj3EOKKSRloUx7mX/MKmooR7UyKJOLC';

bcrypt.compare('#vishw@k@222', hash)
  .then(console.log);