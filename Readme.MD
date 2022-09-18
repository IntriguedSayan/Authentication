Authentication & Authorization with express.

Authentication=> it is the process of verifying user's identity(who a user is).

Authorization=> it is the process to check what the user has access to / verifying what the user has access to.

Every Authorized user is Authenticated but, not every Authenticated user is not Authorized.

JWT==>json web token
    1>generatE,
    2>verify

JWT==>generate;
      decode;
      veryfying;   

token can be stored in ==> local storage ,
                           Session storage,
                           Cookie storage

express-session.
plaintext==>Password is stored as it is.
1. The developer can see the password of the users.
2. Database was hacked. --password should not be seen.

for password ==>bcrypt.
salt rounds;
5 or,8 or,10