const http = require('http');

console.log('🧪 Testing Web3 Crowdfunding Integration...\n');

// Test function to check if a server is running
function testServer(port, name) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      console.log(`✅ ${name} server is running on port ${port}`);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${name} server is not running on port ${port}`);
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      console.log(`⏰ ${name} server timeout on port ${port}`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('Testing servers...\n');
  
  const AquanauticalRunning = await testServer(3000, 'Aquanautical');
  const crowdfundingRunning = await testServer(3002, 'Web3 Crowdfunding');
  
  console.log('\n📊 Test Results:');
  console.log(`Aquanautical: ${AquanauticalRunning ? '✅ Running' : '❌ Not Running'}`);
  console.log(`Crowdfunding: ${crowdfundingRunning ? '✅ Running' : '❌ Not Running'}`);
  
  if (AquanauticalRunning && crowdfundingRunning) {
    console.log('\n🎉 Integration test passed! Both servers are running.');
    console.log('🌊 Aquanautical: http://localhost:3000');
    console.log('💰 Crowdfunding: http://localhost:3002');
    console.log('\n📝 To test the integration:');
    console.log('1. Go to http://localhost:3000/solutions/conservation-insights');
    console.log('2. Click "Start Conservation Project" button');
    console.log('3. Should redirect to http://localhost:3002');
  } else {
    console.log('\n⚠️  Some servers are not running. Please start them:');
    console.log('npm run dev:all');
  }
}

runTests();
