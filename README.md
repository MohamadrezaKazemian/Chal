Used technologies: 
  Frontend: Nextjs/Ant design
  Backend: Prisma/nodeJs

How to use: 

1- install packages with "yarn" command
2- run server with "yarn dev" or "npm run dev" 

in case you face any error relevant to "prisma generate" , just run "<a href="https://www.prisma.io/docs/concepts/components/prisma-studio" target="_blank" >npx prisma generate</a>"
________________________________________________________________________________________________________________________________________

<h3>Database guide:
</h3>
in the project folder you can find a folder named "prisma" which is the core prisma files.

check the actual database => "npx prisma studio"

prisma/schema.prisma => you can make your database model or table in this file

**** <a href="https://www.prisma.io/docs/concepts/overview/what-is-prisma" target="_blank">full documentation of prisma </a>****

<h3>How to config database:</h3>
Open the .env file and replace the dummy connection URL with the connection URL of your PostgreSQL database. For example, if your database is hosted on <a href="https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-heroku" target="_blank">Heroku</a>, the URL might look as follows:

<i>// .env
DATABASE_URL="postgresql://giwuzwpdnrgtzv:d003c6a604bb400ea955c3abd8c16cc98f2d909283c322ebd8e9164b33ccdb75@ec2-54-170-123-247.eu-west-.compute.amazonaws.com:5432/d6ajekcigbuca9"
</i>

Note: If your database is hosted on <a href="https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-heroku" target="_blank">Heroku</a>, you can directly copy the connection URL when viewing the credentials of your database as described here.
_____________________________________________________________________
