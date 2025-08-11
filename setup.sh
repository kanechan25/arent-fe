#!/bin/bash

echo "🏥 Setting up Arent Health App..."

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "❌ nvm is not installed. Please install nvm first:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install
echo "📦 Installing Node.js version from .nvmrc..."
nvm install
nvm use

# Verify versions
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)

echo "✅ Node.js version: $NODE_VERSION"
echo "✅ npm version: $NPM_VERSION"

# Check versions
if [[ "$NODE_VERSION" < "v20.18.0" ]]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please consider using v20.18.0 or higher."
    exit 1
fi

if [[ "$NPM_VERSION" < "10.0.0" ]]; then
    echo "⚠️  npm version $NPM_VERSION is older than recommended. Consider updating to 10.0.0 or higher."
fi

echo "📦 Installing dependencies..."
npm install

# Verify installation
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 You're ready to start developing!"
    echo "   Run 'npm run dev' to start the development server"
    echo "   Run 'npm test' to run tests"
    echo "   Run 'npm run build' to build for production"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi
