# 🌊 Aquanautical Cross-Platform Setup Guide

This guide helps you run the complete Aquanautical project (Main App + Web3 Crowdfunding + Flask API) on both Linux and Windows with a single command.

## 🚀 Quick Start

### For Linux/macOS:
```bash
npm run dev:all
```
or
```bash
./start-all.sh
```

### For Windows:
```cmd
npm run dev:all
```
or
```cmd
start-all.bat
```

## 📋 Prerequisites

### Linux/macOS:
- **Node.js** (v16 or higher)
- **Python 3.8+** (install with `sudo apt install python3 python3-venv python3-pip`)
- **npm** or **yarn**

### Windows:
- **Node.js** (v16 or higher) - Download from [nodejs.org](https://nodejs.org)
- **Python 3.8+** - Download from [python.org](https://python.org) (Make sure to check "Add Python to PATH")
- **npm** (comes with Node.js)

## 🔧 What the Script Does

The `start-all.js` script automatically:

1. **🔍 Detects your platform** (Windows/Linux/macOS)
2. **📦 Installs web3-crowdfunding dependencies** if missing
3. **🐍 Creates Python virtual environment** if needed
4. **📚 Installs Flask requirements** in virtual environment
5. **🚀 Starts all three servers:**
   - **Aquanautical Main App**: http://localhost:3000
   - **Web3 Crowdfunding**: http://localhost:3002
   - **Flask API**: http://localhost:5000

## 🖥️ Platform-Specific Details

### Linux/macOS:
- Uses `python3` command
- Virtual environment: `venv/bin/python` and `venv/bin/pip`
- Path separators: `/`

### Windows:
- Uses `python` command
- Virtual environment: `venv\Scripts\python.exe` and `venv\Scripts\pip.exe`
- Path separators: `\`

## 🛠️ Troubleshooting

### Python Issues:
- **Linux**: If `python3` not found, install with `sudo apt install python3`
- **Windows**: If `python` not found, reinstall Python and check "Add to PATH"

### Permission Issues (Linux/macOS):
```bash
chmod +x start-all.sh
```

### Port Conflicts:
If ports are already in use, the script will show an error. Stop other services using ports 3000, 3002, or 5000.

### Virtual Environment Issues:
Delete the `public/Ocean_details/venv` folder and run the script again to recreate it.

## 📁 Project Structure

```
Aquanautical/
├── app/                    # Main Aquanautical Next.js app
├── web3-crowdfunding/      # Web3 crowdfunding platform
├── public/Ocean_details/   # Flask API for ocean data
│   ├── app.py
│   ├── requirements.txt
│   └── venv/              # Auto-created virtual environment
├── scripts/
│   └── start-all.js       # Cross-platform startup script
├── start-all.sh           # Linux/macOS helper script
├── start-all.bat          # Windows helper script
└── package.json
```

## 🎯 Development Workflow

1. **Start everything**: `npm run dev:all`
2. **Access applications**:
   - Main app: http://localhost:3000
   - Crowdfunding: http://localhost:3002
   - API docs: http://localhost:5000
3. **Stop everything**: `Ctrl+C`

## 🔄 Updates & Maintenance

- **Update dependencies**: Delete `node_modules` and `venv` folders, then run `npm run dev:all`
- **Add new Python packages**: Add to `public/Ocean_details/requirements.txt`
- **Add new npm packages**: Use `npm install` in respective directories

## 💡 Tips

- The script creates virtual environments automatically - no manual setup needed!
- All dependencies are installed locally - no system-wide changes
- Each platform uses its native Python and path conventions
- The script is idempotent - safe to run multiple times

---

**Need help?** Check the console output for detailed error messages and platform-specific instructions.
