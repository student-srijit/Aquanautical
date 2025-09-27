@echo off
echo 🌊 Starting Aquanautical with Web3 Crowdfunding Integration...
echo.

echo 📦 Installing dependencies...
call npm install

echo.
echo 🚀 Starting all servers...
echo Aquanautical will run on http://localhost:3001
echo Web3 Crowdfunding will run on http://localhost:3000
echo.

call npm run dev:all

pause


