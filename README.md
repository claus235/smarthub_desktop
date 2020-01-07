# webwallet
This is the smartcash webwallet

README

Prerequisites:

You will need ASP.NET CORE & GIT.

IF you don�t have .NET CORE INSTALLED, then go to:

https://www.microsoft.com/net/download/core

GIT

Clone this repository into a directory, after go to this directory and type:

dotnet restore

npm install

npm install webpack -g

This will restore ASP.NET CORE dependencies and NPM dependencies as well. After just type:

dotnet run

The output should be:
Hosting environment: Production
Content root path: \webwallet
Now listening on: http://localhost:5000
Application started. Press Ctrl+C to shut down.

Ok. The environment is UP and Running. Now we need to tell the app we are in a DEVELOPMENT ENVIRONMENT.

Ctrl + C to stop the server

On Windows Type:
setx ASPNETCORE_ENVIRONMENT "Development"

On linux
export ASPNETCORE_ENVIRONMENT="Development"

Type:
webpack

It is a compiler for HTML, JS CSS, LESS etc�
If it is not installed then type:
npm install --save-dev webpack

*I will assume you are inside the folder of the APP.


To execute you need to type webpack && dotnet run

Notes 2020:
Unistall all webpack global
Install nvm to manage versions the version we use is the 6 last stable
WebPack dev is 3.12.0
WEbPack global is 3.12.0

nvm use 6
webpack && dotnet run


Config Json
{
  "Logging": {
    "IncludeScopes": false,
    "Debug": {
      "LogLevel": {
        "Default": "Warning"
      }
    },
    "Console": {
      "LogLevel": {
        "Default": "Warning"
      }
    }
  },
  "AppSettings": {},
  "AppApiDomain": "http://localhost:60090",
  "AppApiDomainTest": "http://localhost:60090",
  "SAPIDomain": "http://localhost:60091",
  "ExpApiDomain": "http://localhost:60092",
  "ApplicationInsights": {
    "InstrumentationKey": ""
  }
}