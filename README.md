1.Login-Register-Nodejs

A simple Login/Register application developed in Nodejs using Express.
Getting started

Installing dependencies:
Enter this command it will install all the dependencies at once:

-npm install

Or you can install them individually:

-npm install express express-session mysql ejs bcrypt util.promisify

Sometimes you get errors and access denied add sudo to the command

-sudo npm install express express-session mysql ejs bcrypt util.promisify

Start the application

-npm start

or

-node app

2. DATABASE
 we use mySQL for storing the data
 
 for installing:
 -sudo apt-get update
 -sudo apt-get install mysql-server

The installer installs MySQL and all dependencies.

If the secure installation utility does not launch automatically after the installation completes, enter the following command:

-sudo mysql_secure_installation utility

This utility prompts you to define the mysql root password and other security-related options, including removing remote access to the root user and setting the root password.
