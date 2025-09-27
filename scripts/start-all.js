const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log('🌊 Starting Aquanautical with Web3 Crowdfunding Integration and Flask API...');

// Platform detection
const isWindows = os.platform() === 'win32';
const isLinux = os.platform() === 'linux';
const isMac = os.platform() === 'darwin';

console.log(`🖥️ Platform detected: ${os.platform()}`);

// Platform-specific paths
function getVenvPaths(dir) {
 if (isWindows) {
   return {
     python: path.join(dir, 'venv', 'Scripts', 'python.exe'),
     pip: path.join(dir, 'venv', 'Scripts', 'pip.exe')
   };
 } else {
   // Linux and macOS
   return {
     python: path.join(dir, 'venv', 'bin', 'python'),
     pip: path.join(dir, 'venv', 'bin', 'pip')
   };
 }
}

// Function to check if directory has node_modules
function hasNodeModules(dir) {
 return fs.existsSync(path.join(dir, 'node_modules'));
}

// Function to check if Python requirements are installed
function checkPythonRequirements(dir) {
 const requirementsPath = path.join(dir, 'requirements.txt');
 return fs.existsSync(requirementsPath);
}

// Function to install npm dependencies
function installNpmDependencies(dir) {
 return new Promise((resolve, reject) => {
   console.log(`📦 Installing dependencies in ${dir}...`);
   const installProcess = spawn('npm', ['install'], {
     cwd: dir,
     stdio: 'inherit',
     shell: true
   });
  
   installProcess.on('close', (code) => {
     if (code === 0) {
       console.log(`✅ Dependencies installed in ${dir}`);
       resolve();
     } else {
       reject(new Error(`Failed to install dependencies in ${dir}`));
     }
   });
 });
}

// Function to check if virtual environment exists
function hasVirtualEnv(dir) {
 return fs.existsSync(path.join(dir, 'venv'));
}

// Function to get Python command based on platform
function getPythonCommand() {
 if (isWindows) {
   return 'python'; // Windows typically uses 'python'
 } else {
   return 'python3'; // Linux/macOS typically uses 'python3'
 }
}

// Function to create virtual environment
function createVirtualEnv(dir) {
 return new Promise((resolve, reject) => {
   console.log(`🐍 Creating Python virtual environment in ${dir}...`);
   const pythonCmd = getPythonCommand();
  
   const venvProcess = spawn(pythonCmd, ['-m', 'venv', 'venv'], {
     cwd: dir,
     stdio: 'inherit',
     shell: true
   });
  
   venvProcess.on('error', (error) => {
     console.error(`❌ Error creating virtual environment: ${error.message}`);
     reject(new Error(`Failed to create virtual environment. Please ensure Python is installed and accessible. Error: ${error.message}`));
   });
  
   venvProcess.on('close', (code) => {
     if (code === 0) {
       console.log(`✅ Virtual environment created in ${dir}`);
       resolve();
     } else {
       reject(new Error(`Failed to create virtual environment in ${dir}. Exit code: ${code}. Make sure Python is installed and accessible.`));
     }
   });
 });
}

// Function to install Python requirements in virtual environment
function installPythonRequirements(dir) {
 return new Promise((resolve, reject) => {
   console.log(`📦 Installing Python requirements in virtual environment...`);
   const venvPaths = getVenvPaths(dir);
  
   // Always try python -m pip first as it's more reliable across platforms
   let pythonCmd = venvPaths.python;
   if (!fs.existsSync(pythonCmd)) {
     console.log(`⚠️ Virtual environment Python not found, using system Python...`);
     pythonCmd = getPythonCommand();
   }
  
   // Windows-specific pip installation with additional flags
   const pipArgs = isWindows
     ? ['-m', 'pip', 'install', '-r', 'requirements.txt', '--no-warn-script-location', '--disable-pip-version-check', '--user']
     : ['-m', 'pip', 'install', '-r', 'requirements.txt'];
  
   const installProcess = spawn(pythonCmd, pipArgs, {
     cwd: dir,
     stdio: 'inherit',
     shell: true
   });
  
   installProcess.on('error', (error) => {
     console.error(`❌ Error running pip: ${error.message}`);
     // Final fallback - try without virtual environment
     console.log(`🔄 Trying system Python fallback...`);
     const fallbackProcess = spawn(getPythonCommand(), ['-m', 'pip', 'install', '-r', 'requirements.txt', '--user'], {
       cwd: dir,
       stdio: 'inherit',
       shell: true
     });
    
     fallbackProcess.on('close', (code) => {
       if (code === 0) {
         console.log(`✅ Python requirements installed in ${dir} (using system Python)`);
         resolve();
       } else {
         reject(new Error(`Failed to install Python requirements in ${dir}. Please ensure Python and pip are properly installed and accessible.`));
       }
     });
   });
  
   installProcess.on('close', (code) => {
     if (code === 0) {
       console.log(`✅ Python requirements installed in ${dir}`);
       resolve();
     } else {
       reject(new Error(`Failed to install Python requirements in ${dir}. Exit code: ${code}`));
     }
   });
 });
}

// Setup function
async function setupDependencies() {
 try {
   // Check and install web3-crowdfunding dependencies
   const crowdfundingDir = path.join(__dirname, '..', 'web3-crowdfunding');
   if (!hasNodeModules(crowdfundingDir)) {
     await installNpmDependencies(crowdfundingDir);
   } else {
     console.log('✅ Web3-crowdfunding dependencies already installed');
   }

   // Check and setup Flask dependencies with virtual environment
   const flaskDir = path.join(__dirname, '..', 'public', 'Ocean_details');
   if (checkPythonRequirements(flaskDir)) {
     if (!hasVirtualEnv(flaskDir)) {
       await createVirtualEnv(flaskDir);
     } else {
       console.log('✅ Virtual environment already exists');
     }
     await installPythonRequirements(flaskDir);
   } else {
     console.log('⚠️ No requirements.txt found in Flask directory');
   }

   console.log('🚀 All dependencies ready! Starting servers...');
   startServers();
 } catch (error) {
   console.error('❌ Error setting up dependencies:', error);
   process.exit(1);
 }
}

// Function to start all servers
function startServers() {
 // Start the main Aquanautical server
 const oceanovaProcess = spawn('npx', ['next', 'dev', '--port', '3000'], {
   stdio: 'inherit',
   shell: true,
   cwd: process.cwd()
 });

 // Start the    server
 const crowdfundingDir = path.join(__dirname, '..', 'web3-crowdfunding');
 const crowdfundingProcess = spawn('npm', ['run', 'dev:fast'], {
   cwd: crowdfundingDir,
   stdio: 'inherit',
   shell: true
 });

 // Start the Flask API server using virtual environment
 const flaskDir = path.join(__dirname, '..', 'public', 'Ocean_details');
 const venvPaths = getVenvPaths(flaskDir);
  // Check if virtual environment Python exists, fallback to system Python
 let pythonCmd = venvPaths.python;
 if (!fs.existsSync(pythonCmd)) {
   console.log(`⚠️ Virtual environment Python not found at ${pythonCmd}, using system Python...`);
   pythonCmd = getPythonCommand();
 }
  console.log(`🐍 Starting Flask server with Python: ${pythonCmd}`);
  const flaskProcess = spawn(pythonCmd, ['app.py'], {
   cwd: flaskDir,
   stdio: 'inherit',
   shell: true,
   env: {
     ...process.env,
     FLASK_PORT: '5000',
     // Add Python path for virtual environment packages
     PYTHONPATH: isWindows ?
       path.join(flaskDir, 'venv', 'Lib', 'site-packages') :
       path.join(flaskDir, 'venv', 'lib', 'python3.*/site-packages')
   }
 });

 // Handle Aquanautical process
 oceanovaProcess.on('error', (error) => {
   console.error('❌ Error starting Aquanautical server:', error);
 });

 oceanovaProcess.on('close', (code) => {
   console.log(`🛑 Aquanautical server exited with code ${code}`);
 });

 // Handle Crowdfunding process
 crowdfundingProcess.on('error', (error) => {
   console.error('❌ Error starting crowdfunding server:', error);
 });

 crowdfundingProcess.on('close', (code) => {
   console.log(`🛑 Crowdfunding server exited with code ${code}`);
 });

 // Handle Flask process
 flaskProcess.on('error', (error) => {
   console.error('❌ Error starting Flask API server:', error);
   console.error('💡 Troubleshooting tips:');
   console.error('   - Ensure Python is installed and accessible');
   console.error('   - Check if Flask dependencies are installed');
   console.error('   - Verify the virtual environment is set up correctly');
 });

 flaskProcess.on('close', (code) => {
   if (code !== 0) {
     console.log(`🛑 Flask API server exited with error code ${code}`);
     console.log('💡 Try running: python app.py manually in the Ocean_details directory');
   } else {
     console.log(`🛑 Flask API server exited gracefully`);
   }
 });

 // Handle process termination
 process.on('SIGINT', () => {
   console.log('\n🛑 Shutting down all servers...');
   oceanovaProcess.kill('SIGINT');
   crowdfundingProcess.kill('SIGINT');
   flaskProcess.kill('SIGINT');
   process.exit(0);
 });

 process.on('SIGTERM', () => {
   console.log('\n🛑 Shutting down all servers...');
   oceanovaProcess.kill('SIGTERM');
   crowdfundingProcess.kill('SIGTERM');
   flaskProcess.kill('SIGTERM');
   process.exit(0);
 });

 console.log('✅ Aquanautical server started on http://localhost:3000');
 console.log('✅ Crowdfunding server started on http://localhost:3002');
 console.log('✅ Flask API server started on http://localhost:5000');
 console.log('📝 Press Ctrl+C to stop all servers');
}

// Start the setup process
setupDependencies();

